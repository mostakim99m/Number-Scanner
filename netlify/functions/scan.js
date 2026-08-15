exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { image } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: image
                }
              },
              {
                text: `Extract ALL phone numbers from this image — printed, screen display, or handwritten.
Return ONLY a JSON array of digit strings. No explanation. No markdown. No extra text.
Example: ["01712345678","01987654321"]
Rules:
- Include Bangladeshi numbers (11 digits starting with 013-019)
- Include any other phone numbers
- Digits only — remove spaces, dashes, brackets
- For handwritten: watch 1 vs 7, 0 vs 6 vs 8, 3 vs 8
- If none found, return []`
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API error');
    }

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '[]';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numbers: JSON.parse(cleaned) })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
