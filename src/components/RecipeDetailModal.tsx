import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Users,
  Flame,
  Music,
  Check,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Copy,
  Printer,
  Sparkles,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { Recipe, RecipeIngredient, RecipeStep } from '../data/recipes';
import { kitchenAudio } from '../utils/audioEngine';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Portion scaling state
  const baseServings = recipe.servings;
  const [servings, setServings] = useState<number>(baseServings);
  const scale = servings / baseServings;

  // Checked ingredients
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // Active cooking step
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Step Timer
  const activeStep: RecipeStep = recipe.steps[activeStepIndex] || recipe.steps[0];
  const [timerSeconds, setTimerSeconds] = useState<number>((activeStep.timerMinutes || 5) * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Update timer when active step changes
  useEffect(() => {
    setIsTimerRunning(false);
    setTimerSeconds((activeStep.timerMinutes || 5) * 60);
  }, [activeStepIndex, activeStep]);

  // Countdown effect
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            kitchenAudio.playTimerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Toggle ingredient checkbox
  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Copy shopping list
  const handleCopyIngredients = () => {
    const lines = recipe.ingredients.map((ing) => {
      const scaledAmount = Number((ing.amount * scale).toFixed(1));
      return `- ${scaledAmount} ${ing.unit} ${ing.name}`;
    });
    const text = `Senarai Bahan: ${recipe.title} (${servings} orang)\nDari Ketuk-Ketuk Spatular Mama Siti:\n\n${lines.join('\n')}\n\nPetua Mama Siti: ${recipe.petuaMamaSiti}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Trigger step SFX
  const handlePlayStepSfx = () => {
    if (activeStep.actionSfx === 'mortar') {
      kitchenAudio.playMortarThud();
    } else if (activeStep.actionSfx === 'sizzle') {
      kitchenAudio.playQuickSizzle(0.5, 0.4);
    } else if (activeStep.actionSfx === 'chime') {
      kitchenAudio.playTimerChime();
    } else {
      kitchenAudio.playSpatulaClack(1.0 + Math.random() * 0.2);
    }
  };

  // Text to speech narration
  const handleSpeakStep = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `Langkah ${activeStep.stepNumber}: ${activeStep.title}. ${activeStep.instruction}. Petua Mama Siti: ${activeStep.petua || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ms-MY';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex justify-center items-start p-2 sm:p-4 md:p-6">
      <div className="bg-[#faf7f2] w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-8 animate-in fade-in duration-200">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-30 bg-[#faf7f2]/95 backdrop-blur-sm border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-300">
              {recipe.category}
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Ketuk-Ketuk Spatular Mama Siti
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(recipe.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
              title={isBookmarked ? 'Padam dari simpanan' : 'Simpan resepi'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors"
              title="Tutup Paparan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner inside Modal */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-3 text-xs text-amber-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.timeMinutes} Minit
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {servings} Porsi
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                {recipe.spiceLevel}
              </span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {recipe.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              {recipe.subtitle}
            </p>
          </div>
        </div>

        {/* Pantun & Lagu Companion Banner */}
        <div className="bg-amber-900 text-amber-50 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-800">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5" />
              <span>Pantun & Irama Masakan Mama Siti</span>
            </div>
            <div className="font-serif-display italic text-sm text-amber-100 leading-relaxed">
              &ldquo;{recipe.pantun.join(' ')}&rdquo;
            </div>
          </div>

          <button
            onClick={() => {
              kitchenAudio.playSpatulaClack(1.1);
              kitchenAudio.playMusic();
            }}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-xs transition-transform active:scale-95 shrink-0 flex items-center gap-2 shadow-xs"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Pasang Irama Mengacau</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Ingredients & Servings Scaler */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Servings Scaler */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-display text-base font-bold text-stone-900">
                    Bahan-Bahan Dapur
                  </h3>
                  <p className="text-xs text-stone-500">
                    Sukatan diubah automatik mengikut bilangan orang
                  </p>
                </div>

                {/* Portions selector */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                  {[2, 4, 6, 8, 12].map((s) => (
                    <button
                      key={s}
                      onClick={() => setServings(s)}
                      className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                        servings === s
                          ? 'bg-amber-800 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons: Copy & Print */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyIngredients}
                  className="flex-1 py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Tersalin!' : 'Salin Senarai Bahan'}</span>
                </button>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-2 pt-2 max-h-96 overflow-y-auto pr-1">
                {recipe.ingredients.map((ing) => {
                  const isChecked = checkedIngredients[ing.name] || false;
                  const scaledAmount = Number((ing.amount * scale).toFixed(1));

                  return (
                    <div
                      key={ing.name}
                      onClick={() => toggleIngredient(ing.name)}
                      className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                        isChecked ? 'bg-stone-100 text-stone-400 line-through' : 'hover:bg-amber-50/60 text-stone-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-amber-700 border-amber-700 text-white' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1 flex justify-between gap-2">
                        <span className="font-medium">{ing.name}</span>
                        <span className="font-mono text-stone-600 shrink-0">
                          {scaledAmount} {ing.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Petua Rahsia Mama Siti Box */}
            <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-serif-display font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Petua Emas Spatular Mama Siti</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed font-sans">
                {recipe.petuaMamaSiti}
              </p>
            </div>
          </div>

          {/* Right Column: Step-by-Step Cooking Mode with Timer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Langkah Memasak
                </h3>
                <p className="text-xs text-stone-500">
                  Langkah {activeStepIndex + 1} daripada {recipe.steps.length}
                </p>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-1.5">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => prev - 1)}
                  className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  title="Langkah Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4 text-stone-700" />
                </button>
                <button
                  disabled={activeStepIndex === recipe.steps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => prev + 1)}
                  className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  title="Langkah Seterusnya"
                >
                  <ChevronRight className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            </div>

            {/* Active Step Card */}
            <div className="bg-white p-6 rounded-xl border-2 border-amber-800/40 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-50 font-bold flex items-center justify-center text-sm font-mono shrink-0">
                    {activeStep.stepNumber}
                  </div>
                  <h4 className="font-serif-display font-bold text-base text-stone-900">
                    {activeStep.title}
                  </h4>
                </div>

                {/* Read aloud & SFX button */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSpeakStep}
                    className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Dengar bacaan langkah suara"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePlayStepSfx}
                    className="px-2.5 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md font-medium flex items-center gap-1 transition-colors"
                    title="Bunyi aksi kuali"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Ketuk!</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {activeStep.instruction}
              </p>

              {activeStep.petua && (
                <div className="p-3 bg-stone-50 rounded-lg border-l-3 border-amber-700 text-xs text-stone-600 italic">
                  💡 <span className="font-medium text-stone-900">Petua:</span> {activeStep.petua}
                </div>
              )}

              {/* Step Countdown Timer */}
              {activeStep.timerMinutes && (
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-amber-950 tracking-wider">
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="text-xs text-stone-500">
                      Pemasa Masak ({activeStep.timerMinutes} min)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isTimerRunning
                          ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          : 'bg-amber-800 text-white hover:bg-amber-900'
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Jeda</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Mula Pemasa</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds((activeStep.timerMinutes || 5) * 60);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                      title="Set semula pemasa"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step Overview List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Semua Langkah ({recipe.steps.length})
              </span>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {recipe.steps.map((st, idx) => (
                  <button
                    key={st.stepNumber}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      idx === activeStepIndex
                        ? 'bg-amber-100/90 text-amber-950 font-semibold border border-amber-300'
                        : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {st.stepNumber}. {st.title}
                    </span>
                    <span className="font-mono text-[11px] text-stone-400 shrink-0">
                      {st.timerMinutes} min
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 px-6 py-3.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>Resepi disahkan oleh Mama Siti · &ldquo;Gerenti Menjilat Jari!&rdquo;</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium transition-colors"
          >
            Selesai Memasak
          </button>
        </div>

      </div>
    </div>
  );
};
