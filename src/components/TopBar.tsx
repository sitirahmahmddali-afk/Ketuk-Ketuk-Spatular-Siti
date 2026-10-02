import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Utensils, Music, Bell } from 'lucide-react';
import { kitchenAudio } from '../utils/audioEngine';

interface TopBarProps {
  onNavClick: (target: 'recipes' | 'radio' | 'ai-chef' | 'pantun') => void;
  activeSection: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  spatulaCount: number;
  onSpatulaKnock: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNavClick,
  activeSection,
  isMusicPlaying,
  onToggleMusic,
  spatulaCount,
  onSpatulaKnock,
}) => {
  const [knockEffect, setKnockEffect] = useState(false);

  const handleKnock = () => {
    setKnockEffect(true);
    kitchenAudio.playSpatulaClack(1.0 + (Math.random() * 0.2 - 0.1));
    onSpatulaKnock();
    setTimeout(() => setKnockEffect(false), 300);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavClick('recipes')}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-800 text-amber-50 flex items-center justify-center font-serif-display font-bold text-lg shadow-sm group-hover:bg-amber-900 transition-colors">
            MS
          </div>
          <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap">
            Ketuk-Ketuk Spatular Mama Siti
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavClick('recipes')}
            className={`transition-colors hover:text-amber-900 pb-0.5 border-b-2 ${
              activeSection === 'recipes'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Koleksi Resepi
          </button>
          <button
            onClick={() => onNavClick('radio')}
            className={`transition-colors hover:text-amber-900 pb-0.5 border-b-2 ${
              activeSection === 'radio'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Irama & Lagu
          </button>
          <button
            onClick={() => onNavClick('ai-chef')}
            className={`flex items-center gap-1.5 transition-colors hover:text-amber-900 pb-0.5 border-b-2 ${
              activeSection === 'ai-chef'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Tanya Mama Siti
          </button>
          <button
            onClick={() => onNavClick('pantun')}
            className={`transition-colors hover:text-amber-900 pb-0.5 border-b-2 ${
              activeSection === 'pantun'
                ? 'border-amber-800 text-amber-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Petua & Rentak
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Music Radio Quick Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Hentikan Lagu Dapur' : 'Pasang Irama Dapur'}
            className={`px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              isMusicPlaying
                ? 'bg-amber-100/90 text-amber-900 border border-amber-300'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="hidden sm:inline">Irama Aktif</span>
              </>
            ) : (
              <>
                <Music className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline">Pasang Lagu</span>
              </>
            )}
          </button>

          {/* Interactive Spatula Knock Button */}
          <button
            onClick={handleKnock}
            className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-800 text-amber-50 hover:bg-amber-900 active:scale-95 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap ${
              knockEffect ? 'scale-105 ring-2 ring-amber-400' : ''
            }`}
            title="Klik untuk mengetuk spatula pada kuali!"
          >
            <Utensils className={`w-3.5 h-3.5 ${knockEffect ? '-rotate-45 transition-transform' : ''}`} />
            <span>Ketuk Spatula!</span>
            <span className="font-mono text-[11px] bg-amber-950/40 text-amber-200 px-1.5 py-0.5 rounded">
              {spatulaCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
