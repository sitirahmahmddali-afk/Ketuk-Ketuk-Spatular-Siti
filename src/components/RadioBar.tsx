import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, Music2, Flame, Bell } from 'lucide-react';
import { kitchenAudio, MusicTrack } from '../utils/audioEngine';

interface RadioBarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onSpatulaKnock: () => void;
}

export const RadioBar: React.FC<RadioBarProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onSpatulaKnock,
}) => {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(kitchenAudio.getCurrentTrack());
  const [noteIndex, setNoteIndex] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [showLyrics, setShowLyrics] = useState(true);

  useEffect(() => {
    const unsubscribe = kitchenAudio.subscribe((_, track, note) => {
      setCurrentTrack(track);
      setNoteIndex(note);
    });
    return unsubscribe;
  }, []);

  const handleNext = () => {
    kitchenAudio.nextTrack();
  };

  const handlePrev = () => {
    kitchenAudio.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    kitchenAudio.setMusicVolume(val);
  };

  const handleClack = () => {
    kitchenAudio.playSpatulaClack();
    onSpatulaKnock();
  };

  const handleSizzle = () => {
    kitchenAudio.playQuickSizzle(0.4, 0.4);
  };

  const handleMortar = () => {
    kitchenAudio.playMortarThud();
  };

  return (
    <div className="bg-amber-900/90 text-amber-50 border-b border-amber-800/80 shadow-inner px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Track Info & Visualizer */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="w-10 h-10 rounded-lg bg-amber-800/90 border border-amber-700/80 flex items-center justify-center shrink-0">
            <Music2 className={`w-5 h-5 text-amber-300 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-amber-300/90 font-medium">
                Radio Dapur Mama Siti
              </span>
              <span className="text-[11px] text-amber-400/80 font-mono">
                {currentTrack.rhythm} ({currentTrack.tempoBpm} BPM)
              </span>
            </div>
            <div className="text-sm font-semibold truncate text-white">
              {currentTrack.title}
            </div>
          </div>

          {/* Mini Beat Visualizer */}
          <div className="flex items-end gap-1 h-5 px-2">
            {[0, 1, 2, 3, 4].map((i) => {
              const active = isMusicPlaying && (noteIndex % 5 === i || (noteIndex + 2) % 5 === i);
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    active ? 'bg-amber-300 h-5' : 'bg-amber-700/60 h-1.5'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 text-amber-200 hover:text-white hover:bg-amber-800/70 rounded-md transition-colors"
            title="Lagu Sebelum"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleMusic}
            className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold flex items-center justify-center transition-transform active:scale-95 shadow-md"
            title={isMusicPlaying ? 'Jeda Lagu' : 'Mainkan Lagu'}
          >
            {isMusicPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 text-amber-200 hover:text-white hover:bg-amber-800/70 rounded-md transition-colors"
            title="Lagu Seterusnya"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-amber-800">
            <Volume2 className="w-3.5 h-3.5 text-amber-300/80" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-18 accent-amber-400 h-1 bg-amber-950/60 rounded cursor-pointer"
              title="Kekuatan Bunyi Muzik"
            />
          </div>
        </div>

        {/* Sound Effects & Pantun preview */}
        <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end w-full lg:w-auto">
          <span className="text-xs text-amber-300/80 hidden xl:inline">Bunyi Dapur:</span>
          
          <button
            onClick={handleClack}
            className="px-2.5 py-1 text-xs bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 rounded-md border border-amber-700/60 transition-colors flex items-center gap-1 active:scale-95"
            title="Ketuk Spatula pada kuali"
          >
            <span>🍳 Tang!</span>
          </button>

          <button
            onClick={handleSizzle}
            className="px-2.5 py-1 text-xs bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 rounded-md border border-amber-700/60 transition-colors flex items-center gap-1 active:scale-95"
            title="Bunyi desir minyak tumis"
          >
            <Flame className="w-3 h-3 text-orange-400" />
            <span>Desir Minyak</span>
          </button>

          <button
            onClick={handleMortar}
            className="px-2.5 py-1 text-xs bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 rounded-md border border-amber-700/60 transition-colors flex items-center gap-1 active:scale-95"
            title="Bunyi lesung batu menumbuk sambal"
          >
            <span>🪨 Lesung</span>
          </button>

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`px-2 py-1 text-xs rounded-md border transition-colors ${
              showLyrics ? 'bg-amber-700 text-white border-amber-500' : 'bg-transparent text-amber-300 border-amber-800'
            }`}
            title="Buka / Tutup Pantun Irama"
          >
            Pantun
          </button>
        </div>
      </div>

      {/* Synchronized Pantun Display */}
      {showLyrics && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-800/60 flex items-center justify-between text-xs text-amber-200/90">
          <div className="italic flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">&ldquo;{currentTrack.pantun}&rdquo;</span>
          </div>
          <span className="text-[11px] text-amber-400/70 shrink-0 ml-3 hidden md:inline">
            Irama khas mengacau masakan Mama Siti
          </span>
        </div>
      )}
    </div>
  );
};
