# MY PLANT CARE – GLOBAL AI PLANT IDENTIFICATION SYSTEM (V4.0)
### *Identify Plants. Discover Nature. Explore the World.*

Welcome to the **Global AI Plant Identification System** for **MY PLANT CARE**. This platform delivers world-wide plant recognition for Indian, Tamil Nadu, Asian, African, European, American, Australian, tropical, desert, alpine, medicinal, agricultural, and ornamental flora.

---

## Key Features

1. **Dual AI Identification Pipeline:**
   - **Pl@ntNet Global API** (`https://my-api.plantnet.org/v2/identify/all`): The primary global identification engine with project `all`.
   - **Secondary Vision AI Verification**: Uses Google Gemini Vision (`gemini-4-argon` / `gemini-3.8-flash`) to examine visible morphological traits (leaf venation, petal arrangement, fruit anatomy, stem bark) and calculate genuine visual feature similarity.
   - **Seamless Fallback**: If a Pl@ntNet API key is not supplied, the platform automatically utilizes Gemini Vision AI as the primary global botanical taxonomist.

2. **Advanced Multi-Photo Organ Recognition:**
   - Upload up to **5 photographs** of the same plant specimen.
   - Tag per-image organs: `leaf` (இலை), `flower` (மலர் / பூ), `fruit` (பழம் / காய்), `bark` (மரப்பட்டை), or `auto` (தானியங்கி).
   - Live camera capture with front/back camera toggling.
   - Client-side safe canvas compression (max 1200px, under 20MB).

3. **Global & Region-Aware Modes:**
   - **Global Mode**: Identifies species across all biomes globally.
   - **Region-Aware Mode**: Prioritizes local context (Tamil Nadu native flora, Western Ghats, South Asia, Mediterranean, etc.).

4. **28-Point Comprehensive Botanical Dossier:**
   Every recognized species provides:
   - Scientific name, accepted botanical name, synonyms.
   - Multilingual common names & authentic Tamil name (தமிழ் பெயர்).
   - Plant family, genus, and species.
   - Plant type, native distribution, growing regions, habitat.
   - Indoor/outdoor suitability, sunlight, watering, soil preference.
   - Temperature range, humidity requirements, propagation methods.
   - Flowering and fruiting seasons, growth rate, mature size.
   - Common diseases and common pests.
   - Verified human and pet toxicity status.
   - Practical gardening guidance.

5. **15 Specialized AI Botanical Tools:**
   - AI Leaf Identifier, AI Flower Identifier, AI Fruit Identifier, AI Tree Identifier
   - AI Medicinal Herb Finder (Siddha & Ayurveda), AI Crop Identifier, AI Weed Identifier
   - AI Indoor Plant Specialist, AI Succulent Identifier, AI Cactus Identifier
   - AI Plant Family Classifier, AI Similar Plant Finder, AI 2-Plant Side-by-Side Comparison
   - AI Plant Name Translator (Latin, English, Tamil, Hindi, Spanish, French)
   - AI Botanical Information Assistant

6. **Identification History & Garden Integration:**
   - Persistent history logged in SQLite & browser local storage.
   - "Confirm & Save to My Plants" button for one-click addition to personal garden.
   - Honest "PLANT NOT CONFIDENTLY IDENTIFIED" system when photos are blurry or ambiguous.

---

## Windows Setup & Execution Guide

### Prerequisites
- Python 3.9, 3.10, 3.11, or 3.12 installed.
- (Optional) Node.js 18+ for running the Vite React SPA frontend.

### Step 1: Clone or Open Workspace
Open Command Prompt (`cmd.exe`) or Windows PowerShell in the project directory:
```bash
cd "C:\path\to\my-plant-care"
```

### Step 2: Create a Python Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```
Open `.env` in Notepad or VS Code and configure:
```env
# Pl@ntNet API Key (Get a free key from https://my.plantnet.org/)
PLANTNET_API_KEY="your_plantnet_api_key_here"

# Gemini AI API Key (from Google AI Studio)
GEMINI_API_KEY="your_gemini_api_key_here"

# Flask Server Port
PORT=5000
```
> *Note:* If you do not have a Pl@ntNet API key yet, the application will automatically fall back to Gemini Vision AI with zero interruption.

### Step 5: Start the Python Flask Server
```bash
python app.py
```
The server will initialize `plant_care.db` SQLite database and start on:
```
http://localhost:5000
```

### Step 6: Start the React Frontend (Node.js)
In a second terminal window:
```bash
npm install
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the full web experience.

---

## Testing Guide

1. **Leaf Recognition Test:**
   - Upload a clear top-down photo of a Monstera or Tulsi leaf.
   - Tag organ as `leaf`.
   - Verify that leaf margin and venation are analyzed.

2. **Multi-Organ Recognition Test:**
   - Upload Photo 1: Rose or Hibiscus flower (tag as `flower`).
   - Upload Photo 2: Stem or branch with thorns (tag as `bark` / `stem`).
   - Run identification and observe higher composite confidence.

3. **Tamil Nadu Native Flora Test:**
   - Select "Tamil Nadu, India" region.
   - Upload a photo of Neem (*Azadirachta indica*) or Palmyra (*Borassus flabellifer*).
   - Check that Tamil name (வேம்பு / பனை மரம்) is correctly populated.

4. **Ambiguous / Blurry Photo Test:**
   - Upload an intentionally blurry or dark photo.
   - Observe the "PLANT NOT CONFIDENTLY IDENTIFIED" screen with constructive diagnostic advice.

---

## Troubleshooting Guide

| Issue | Cause | Solution |
|---|---|---|
| `401 Unauthorized` on Pl@ntNet | Incorrect or expired API key | Check `PLANTNET_API_KEY` in `.env` or leave blank for Vision AI engine. |
| `File size exceeds 20MB` | Original raw photo too large | Automatic canvas compression downscales images on upload; verify file is under 20MB. |
| `Camera permission denied` | Browser blocked webcam/camera | Allow camera access in browser URL permissions bar. |
| `Port 5000 in use` | Another service is using port 5000 | Set `PORT=5001` in `.env` or terminate conflicting process. |

---

## Attribution & Legal
- Plant identification data powered by **Pl@ntNet** (`https://my-api.plantnet.org/`) under Pl@ntNet API terms of use.
- Taxonomical validation cross-referenced with IPNI, World Flora Online (WFO), and Tamil Nadu Agricultural University (TNAU) botanical classifications.
- Built with Google AI Studio and React SPA.
