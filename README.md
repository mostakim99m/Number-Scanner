# 📱 Number Scanner
> **Made by Mostakim Alam**

A web-based OCR app that scans Bangladeshi mobile numbers from paper, screens or photos, using your phone's camera or an image from the gallery, and copies them in one tap.

### 🔑 Key Features
* **Auto-scan:** Watches the live camera feed and captures automatically as soon as the image is sharp (built-in blur detection). Manual mode with a shutter button is also available.
* **Better focus:** Picks the phone's main camera lens, uses continuous autofocus and a ~2x zoom so you can hold the phone farther away. **Tap to focus** is supported.
* **Lens switch (🔄):** If the picture looks blurry on your phone, tap to switch to another camera lens. Your choice is remembered.
* **Offline OCR:** Tesseract.js reads numbers right in the browser, with no API key needed. Images are cleaned up (grayscale, contrast, upscaling) before reading for better accuracy.
* **AI Vision fallback:** Works with any OpenAI-compatible API (Groq, OpenAI, local Ollama). If offline OCR finds nothing, AI reads the image, which helps with handwriting and blurry photos.
* **Smart number detection:** Recognises `01712345678`, `01712-345678`, `017 1234 5678` and `+880…` formats.
* **Gallery upload:** Scan any saved photo. Large images are resized automatically before processing.
* **Auto-copy:** In auto mode, the first number found is copied to the clipboard.
* **Battery-friendly:** The camera stops while showing results and when the tab is in the background.

### 🚀 Usage
1. Open the web app over **HTTPS** (e.g. GitHub Pages) and allow camera access.
2. Hold the phone **20–30 cm** from the number and keep it steady. Auto mode scans by itself.
3. If the preview is blurry, tap **🔄 Lens** to try another camera, or tap the screen to focus.
4. Or tap **🖼️ Gallery** to scan a saved image.
5. *(Optional)* Open ⚙️ Settings and enter an **API endpoint, key and model** for AI-powered reading.

### ⚙️ AI Settings
| Field | Example |
|---|---|
| Endpoint | `https://api.groq.com/openai/v1/chat/completions` |
| API Key | `gsk_…` (from console.groq.com/keys) |
| Model | Any **vision-capable** model |

Without an API key the app still works fully offline with Tesseract.js.

### 📝 Notes
* Camera access only works on **HTTPS** or `localhost`. Opening the file directly may block the camera on some browsers.
* Some browsers (especially iOS Safari) may block **auto-copy** without a tap. The app tells you when this happens, and you can use the **Copy** button instead.
* Handwritten numbers are read much more accurately with AI enabled.

### 🔒 Privacy
* Images are never stored.
* With AI enabled, only the scan area is sent to **your own** API provider.
* The API key is saved only in your browser (localStorage).
