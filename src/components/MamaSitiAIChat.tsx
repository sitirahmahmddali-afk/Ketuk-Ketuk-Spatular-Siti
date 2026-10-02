import React, { useState } from 'react';
import { Sparkles, Send, Utensils, Music, Bot, User, RefreshCw, Flame } from 'lucide-react';
import { kitchenAudio } from '../utils/audioEngine';

interface Message {
  role: 'user' | 'mama';
  text: string;
}

export const MamaSitiAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'mama',
      text: 'Assalamualaikum dan salam manis anakanda sayang! Mama Siti di sini bertemankan kuali dan spatula kesayangan. Ada bahan apa dalam peti ais anakanda hari ini? Beritahu Mama, nanti Mama gubah resepi sedap bertemankan irama dan pantun masakan!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'Saya ada ayam, santan dan serai. Nak masak apa Mama?',
    'Macam mana rahsia nak bagi sambal tumis pecah minyak dan tahan lama?',
    'Beri pantun dan irama masakan untuk Rendang Tok.',
    'Apa petua keria gula melaka gebu tak liat?',
  ];

  const getOfflineMamaSitiReply = (query: string): string => {
    const lower = query.toLowerCase();

    if (lower.includes('ayam') && (lower.includes('santan') || lower.includes('serai'))) {
      return `*Ketuk kuali tang tang tang!* 🍳\n\nWah, ada ayam, santan dan serai! Mama cadangkan anakanda cuba resepi **Ayam Masak Merah Kenduri** atau masak lemak cili padi.\n\n**Pantun Pilihan:**\n"Pohon serai daun bersemi,\nSantan diperah santapan ratu;\nAyam dimasak lazat rasmi,\nHidang sepinggan bertambah satu."\n\n**Petua Bonda:** Titik serai biar lebam dan masukkan bersama santan dari mula. Timang kuah sentiasa dengan spatula supaya santan tak pecah minyak ya sayang!\n\n*(Nota: Pelayan AI sedang dalam mod luar talian di GitHub Pages, namun resepi klasik Mama Siti sedia menemani!)*`;
    }

    if (lower.includes('sambal') || lower.includes('pecah minyak') || lower.includes('tahan lama')) {
      return `*Ketuk kuali tang tang tang!* 🍳\n\nHaa, ini rahsia turun-temurun Mama Siti untuk sambal tumis pecah minyak:\n\n1. Gunakan minyak yang cukup sewaktu menumis pes cili.\n2. Masak dengan api perlahan. Bila nampak minyak mula naik, renjiskan 2-3 sudu air dan kacau lagi sampai pecah minyak kali kedua.\n3. Masukkan gula melaka dan air asam jawa untuk seimbangkan rasa dan bagi sambal berkilat cantik gelap!\n\n**Pantun Bonda:**\n"Cili digiling merah menyala,\nTumis berapi di kuali besi;\nSambal sedap pembuka selera,\nHabis seperiuk nasi terisi."\n\n*(Nota: Pelayan AI berada dalam mod luar talian di GitHub Pages)*`;
    }

    if (lower.includes('keria') || lower.includes('keledek')) {
      return `*Ketuk kuali tang tang tang!* 🍳\n\nPetua Kuih Keria Gula Melaka gebu dan tak liat:\n- Rebus keledek dengan sedikit garam sampai empuk, lenyek waktu masih panas.\n- JANGAN letak tepung gandum terlalu banyak! Cukup sekadar doh boleh dibentuk. Kalau banyak tepung, keria akan liat.\n- Waktu sira gula melaka, biar gula berbuih pekat dulu baru gaulkan keria!\n\n*(Nota: Pelayan AI berada dalam mod luar talian di GitHub Pages)*`;
    }

    if (lower.includes('rendang') || lower.includes('pantun')) {
      return `*Ketuk kuali tang tang tang!* 🍳\n\nAmboi, seronoknya anakanda nak dengar pantun rendang!\n\n"Ketuk kuali berbunyi nyaring,\nGulai kawah masak sekata;\nRempah ditumis kelapa digaring,\nRendang Tok siap santapan jelita."\n\n**Irama Mengacau:** Hayati lagu *Dondang Sayang di Dapur* sambil mengacau daging perlahan-lahan. Biar santan merenih pekat hingga menjadi minyak hitam berkilat!\n\n*(Nota: Pelayan AI berada dalam mod luar talian di GitHub Pages)*`;
    }

    return `*Ketuk kuali tang tang tang!* 🍳\n\nAlahai anakanda sayang, terima kasih sudi bertandang ke dapur Mama Siti!\n\n"Ketuk kuali berirama merdu,\nMasak bersama seisi keluarga;\nResepi enak ubat rindu,\nKasih ibu tiada bertara."\n\n**Petua Bonda:** Apa sahaja masakan yang anakanda sediakan hari ini, mulakan dengan bismillah, masak dengan api sederhana, dan ketuk spatula kuali tanda kasih sayang dicurah!\n\n*(Nota: Talian pelayan AI Mama Siti berada dalam mod luar talian di GitHub Pages kerana persekitaran hos statik. Namun semua koleksi resepi warisan, pemasa memasak, dan radio lagu di atas berfungsi sepenuhnya!)*`;
  };

  const handleSend = async (userText: string) => {
    const query = userText.trim();
    if (!query || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ask-mama-siti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error(`API status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || getOfflineMamaSitiReply(query);

      setMessages((prev) => [...prev, { role: 'mama', text: reply }]);
      kitchenAudio.playSpatulaClack(1.15);
    } catch {
      // Graceful offline fallback (for GitHub Pages static hosting)
      const fallbackReply = getOfflineMamaSitiReply(query);
      setMessages((prev) => [...prev, { role: 'mama', text: fallbackReply }]);
      kitchenAudio.playSpatulaClack(1.15);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chef" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/90 text-amber-900 border border-amber-300 rounded-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Kecerdasan Buatan Dapur Warisan</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Tanya Resepi & Pantun Mama Siti
          </h2>

          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            Masukkan apa sahaja bahan dapur yang ada atau tanya apa jua petua masakan. Mama Siti sedia membimbing anakanda dengan penuh kasih sayang dan irama!
          </p>
        </div>

        {/* Chat Window */}
        <div className="bg-[#faf7f2] rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
          
          {/* Top Chat Bar */}
          <div className="px-5 py-3.5 bg-amber-900 text-white flex items-center justify-between border-b border-amber-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-700 border border-amber-500 flex items-center justify-center font-serif-display font-bold text-base text-amber-100">
                MS
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>Mama Siti</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                </div>
                <div className="text-[11px] text-amber-300/80">
                  Bersedia di kuali bersama spatula
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                kitchenAudio.playSpatulaClack();
                kitchenAudio.playMusic();
              }}
              className="px-2.5 py-1 text-xs bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-md border border-amber-600/60 flex items-center gap-1.5 transition-colors"
            >
              <Music className="w-3 h-3" />
              <span>Irama Dapur</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-sm ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'mama' && (
                  <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-serif-display font-bold text-xs shrink-0 mt-0.5">
                    MS
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-amber-800 text-white rounded-tr-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs font-sans'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-sm items-center text-stone-500">
                <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-serif-display font-bold text-xs shrink-0">
                  MS
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-700 animate-spin" />
                  <span className="text-xs italic text-stone-600">
                    Mama Siti sedang mengetuk spatula dan menyusun pantun resepi...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Suggestion Chips */}
          <div className="px-4 py-2 bg-stone-100/80 border-t border-stone-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-stone-400 shrink-0 font-medium">Cadangan:</span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded-md text-stone-700 whitespace-nowrap transition-colors shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Tanya Mama Siti resepi atau petua (cth: Ada sotong & petai nak masak apa?)..."
              className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 bg-amber-800 text-white rounded-lg hover:bg-amber-900 disabled:opacity-40 disabled:pointer-events-none transition-colors font-medium text-sm flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Hantar</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
