import React, { useState } from 'react';
import { Music, Play, Pause, Sparkles, Utensils, Flame, Bell, Drum, Wand2 } from 'lucide-react';
import { COOKING_SONGS_COLLECTION } from '../data/recipes';
import { kitchenAudio } from '../utils/audioEngine';

interface IramaLaguSectionProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onSpatulaKnock: () => void;
}

export const IramaLaguSection: React.FC<IramaLaguSectionProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onSpatulaKnock,
}) => {
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [customDish, setCustomDish] = useState('');
  const [generatedPantun, setGeneratedPantun] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeSong = COOKING_SONGS_COLLECTION[selectedSongIndex];

  const handlePlayPad = (sfx: 'spatula' | 'mortar' | 'sizzle' | 'bell') => {
    if (sfx === 'spatula') {
      kitchenAudio.playSpatulaClack(1.0 + Math.random() * 0.2);
      onSpatulaKnock();
    } else if (sfx === 'mortar') {
      kitchenAudio.playMortarThud();
    } else if (sfx === 'sizzle') {
      kitchenAudio.playQuickSizzle(0.4, 0.4);
    } else if (sfx === 'bell') {
      kitchenAudio.playTimerChime();
    }
  };

  const handleGeneratePantun = async () => {
    if (!customDish.trim() || isGenerating) return;
    setIsGenerating(true);
    const dish = customDish.trim();

    try {
      const res = await fetch('/api/gemini/pantun-irama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName: dish }),
      });

      if (!res.ok) {
        throw new Error(`API status ${res.status}`);
      }

      const data = await res.json();
      setGeneratedPantun(data.content || `"Ketuk kuali berbunyi nyaring,\nMasak ${dish} wangi bersemi;\nRempah ratus santan digaring,\nHidangan enak pengikat famili."`);
      kitchenAudio.playSpatulaClack(1.2);
    } catch {
      // Graceful offline fallback
      setGeneratedPantun(
        `"Ketuk kuali berbunyi nyaring,\nMasak ${dish} wangi bersemi;\nRempah ratus santan digaring,\nHidangan enak pengikat famili.\n\nSpatula digoyang lauk pun masak,\nIrama berdendang sekeluarga gembira!"\n\n(Pantun warisan khas Mama Siti · Mod santai luar talian)`
      );
      kitchenAudio.playSpatulaClack(1.2);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="radio" className="py-12 bg-[#f6f2ea] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/70 border border-amber-300 text-amber-950 rounded-md text-xs font-semibold">
            <Music className="w-3.5 h-3.5 text-amber-800" />
            <span>Irama & Lagu Masakan Mama Siti</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            Dendang Dapur & Pantun Berlagu
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Memasak bukan sekadar mengisi perut, tetapi menyulam kegembiraan di hati. Hayati lirik lagu, alunan pantun dan rentak kuali yang mengiringi setiap hidangan sedap!
          </p>
        </div>

        {/* 2-Column Grid: Beat Pad on Left, Songs Collection on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Beat Pad & Custom Pantun Generator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Papan Rentak Dapur (Kitchen Beat Pad) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-display text-base font-bold text-stone-900">
                    Papan Rentak Dapur
                  </h3>
                  <p className="text-xs text-stone-500">
                    Ketik alat dapur untuk cipta irama sendiri
                  </p>
                </div>
                <div className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                  Audio Langsung
                </div>
              </div>

              {/* 4 Interactive Instrument Tiles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handlePlayPad('spatula')}
                  className="p-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-stone-800 flex flex-col items-center gap-2 transition-all active:scale-95 group text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Utensils className="w-5 h-5 text-amber-200" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Spatula Kuali</span>
                  <span className="text-[10px] text-amber-700 font-mono">Ketukan &ldquo;Tang!&rdquo;</span>
                </button>

                <button
                  onClick={() => handlePlayPad('sizzle')}
                  className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-stone-800 flex flex-col items-center gap-2 transition-all active:scale-95 group text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5 text-orange-200" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Desir Minyak</span>
                  <span className="text-[10px] text-orange-700 font-mono">Tumisan &ldquo;Ssssh!&rdquo;</span>
                </button>

                <button
                  onClick={() => handlePlayPad('mortar')}
                  className="p-4 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-300 text-stone-800 flex flex-col items-center gap-2 transition-all active:scale-95 group text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Drum className="w-5 h-5 text-stone-200" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Lesung Batu</span>
                  <span className="text-[10px] text-stone-600 font-mono">Tumbuk &ldquo;Duk-duk!&rdquo;</span>
                </button>

                <button
                  onClick={() => handlePlayPad('bell')}
                  className="p-4 rounded-xl bg-yellow-50 hover:bg-yellow-100/80 border border-yellow-200 text-stone-800 flex flex-col items-center gap-2 transition-all active:scale-95 group text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bell className="w-5 h-5 text-amber-100" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Loceng Hidangan</span>
                  <span className="text-[10px] text-amber-700 font-mono">Lauk Siap &ldquo;Ting!&rdquo;</span>
                </button>
              </div>
            </div>

            {/* Custom Pantun Generator */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif-display font-bold text-sm">
                <Wand2 className="w-4 h-4 text-amber-700" />
                <span>Cetus Pantun Masakan Pilihan Anda</span>
              </div>
              <p className="text-xs text-stone-500">
                Tulis nama lauk (cth: Gulai Ikan Masin, Mee Rebus, Rendang Tok) dan Mama Siti akan ciptakan pantun berlagu!
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDish}
                  onChange={(e) => setCustomDish(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGeneratePantun()}
                  placeholder="Nama masakan..."
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
                <button
                  onClick={handleGeneratePantun}
                  disabled={!customDish.trim() || isGenerating}
                  className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-medium disabled:opacity-40 transition-colors shrink-0"
                >
                  {isGenerating ? 'Mencipta...' : 'Cipta Pantun'}
                </button>
              </div>

              {generatedPantun && (
                <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 font-serif-display italic leading-relaxed whitespace-pre-line">
                  {generatedPantun}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Song Lyrics & Melodic Sing-Along Player */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            
            {/* Song Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100">
              {COOKING_SONGS_COLLECTION.map((song, idx) => (
                <button
                  key={song.title}
                  onClick={() => {
                    setSelectedSongIndex(idx);
                    kitchenAudio.setTrack(idx);
                  }}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    idx === selectedSongIndex
                      ? 'bg-amber-800 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {song.title}
                </button>
              ))}
            </div>

            {/* Song Card Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-900 text-white p-5 rounded-xl shadow-xs">
              <div>
                <div className="text-xs text-amber-300 font-mono">
                  {activeSong.rentak} · {activeSong.tempo}
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold mt-1">
                  {activeSong.title}
                </h3>
              </div>

              <button
                onClick={() => {
                  kitchenAudio.setTrack(selectedSongIndex);
                  onToggleMusic();
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs rounded-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0 shadow-xs"
              >
                {isMusicPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isMusicPlaying ? 'Jeda Muzik' : 'Mainkan Alunan Lagu'}</span>
              </button>
            </div>

            {/* Lyrics Card */}
            <div className="space-y-4">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Lirik & Korus Nyanyian Di Dapur
              </span>

              <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
                <pre className="font-serif-display text-sm sm:text-base text-stone-800 leading-loose whitespace-pre-line tracking-wide">
                  {activeSong.lirik}
                </pre>
              </div>

              {/* Pantun Pairing */}
              <div className="p-4 bg-amber-50 border-l-3 border-amber-600 rounded-r-xl">
                <div className="text-xs font-semibold text-amber-900 mb-1">
                  Pantun Penyedap Rasa:
                </div>
                <p className="font-serif-display italic text-xs sm:text-sm text-amber-950 leading-relaxed">
                  &ldquo;{activeSong.pantun}&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
