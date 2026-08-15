exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { image } = JSON.parse(event.body);
    const apiKey = process.env.ANTHROPIC_API_KEY;

    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: 'image/jpeg',
                    data: image
                  }
                },
                {
                  type: 'text',
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
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Claude API error');
    }

    const raw = data.content?.[0]?.text?.trim() || '[]';
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
