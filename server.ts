import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: AI Mama Siti Kitchen Assistant & Recipe Generator
app.post('/api/gemini/ask-mama-siti', async (req, res) => {
  try {
    const { message, ingredients, dishCategory, history = [] } = req.body;

    const systemInstruction = `Anda adalah "Mama Siti", ikon pengacara dan tukang masak terkenal Malaysia dalam rancangan masakan legendaris "Ketuk-Ketuk Spatular Mama Siti".
Karakteristik Mama Siti:
- Berbudi bahasa, ceria, penuh kasih sayang seorang ibu Melayu ("Anakanda Mama", "Sayang semua", "Haa dengar sini petua Mama").
- Setiap kali bercakap tentang masakan, Mama Siti akan selitkan bunyi ketukan spatula ("*Ketuk kuali tang tang tang!*") dan pantun atau irama lagu masakan yang menghiburkan hati.
- Sangat pakar dalam masakan Melayu tradisional, lauk kenduri, sambal tumis berapi, gulai santan berlemak, kuih muih, serta cara olah bahan-bahan dapur yang ada.
- Jawapan mestilah dalam Bahasa Melayu yang santai, mesra, dan penuh motivasi memasak.
- Jika pengguna meminta resepi, sertakan:
  1. Pantun Pembuka Berirama (2 atau 4 kerat)
  2. Bahan-bahan lengkap (sukatan jelas)
  3. Langkah Memasak Teratur (dengan petua rahsia air tangan Mama Siti)
  4. "Irama & Lagu Semasa Mengacau": cadangan melodi / lirik pendek berirama untuk dinyanyikan semasa memasak agar lauk bertambah sedap!
  5. Petua Dapur Tambahan.`;

    const promptText = `Pengguna bertanya: "${message || 'Beri resepi istimewa'}"
Bahan-bahan yang ada di dapur pengguna: ${ingredients || 'Bahan asas dapur'}
Kategori pilihan: ${dishCategory || 'Masakan Harian Warisan'}

Sila beri panduan atau resepi lengkap gaya santai penuh irama Mama Siti.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || 'Alahai anakanda, kuali Mama tengah panas ni! Cuba tanya sekali lagi ya.',
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Maaf anakanda, talian dapur Mama Siti ada gangguan sedikit. Sila cuba sebentar lagi.',
      details: error?.message,
    });
  }
});

// Endpoint: Generate Custom Pantun & Irama Masakan
app.post('/api/gemini/pantun-irama', async (req, res) => {
  try {
    const { dishName } = req.body;
    const prompt = `Ciptakan 2 rangkap pantun Melayu asli yang sangat sedap didengar tentang masakan "${dishName || 'Masakan Melayu'}" berserta satu rangkap lirik lagu berirama (irama inang atau joget) untuk dinyanyikan sambil mengetuk kuali dengan spatula.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Anda adalah pencipta pantun dan lagu masakan tradisional Melayu untuk rancangan Ketuk-Ketuk Spatular Mama Siti.',
        temperature: 0.8,
      },
    });

    res.json({
      content: response.text || '',
    });
  } catch (error: any) {
    console.error('Error generating pantun:', error);
    res.status(500).json({ error: 'Gagal menjana pantun' });
  }
});

// Vite Middleware for development vs static serve for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Ketuk-Ketuk Spatular Mama Siti running on port ${PORT}`);
  });
}

startServer();
