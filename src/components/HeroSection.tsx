import React from 'react';
import { Search, Utensils, Music, Sparkles, Flame, Check } from 'lucide-react';
import { Recipe } from '../data/recipes';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSpice: string;
  onSelectSpice: (spice: string) => void;
  spatulaCount: number;
  onSpatulaKnock: () => void;
  onOpenAIChef: () => void;
}

const CATEGORIES = [
  'Semua Kategori',
  'Lauk Kenduri',
  'Masakan Berkuah',
  'Sambal & Goreng',
  'Kuih Muih',
  'Minuman Segar',
];

const SPICE_LEVELS = [
  'Semua Tahap',
  'Pedas Berapi',
  'Pedas Sedang',
  'Pedas Manja',
  'Tidak Pedas',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedSpice,
  onSelectSpice,
  spatulaCount,
  onSpatulaKnock,
  onOpenAIChef,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5ede2] via-[#faf7f2] to-[#faf7f2] pt-8 pb-12 border-b border-stone-200">
      
      {/* Decorative Traditional Batik / Warm Gradient Aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Interaction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Rancangan Dapur Muzikal Legenda</span>
              <span className="text-amber-500">·</span>
              <span>Ketuk-Ketuk Spatular Mama Siti</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.18] text-balance">
              Ketuk Kuali Berbunyi Nyaring, Resepi Warisan Irama Berdendang
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              Selamat datang ke dapur Mama Siti! Di sini resepi Melayu asli berpadu dengan ketukan spatula, santan berlemak, rempah ditumis wangi, dan alunan lagu tradisi penyeri santapan keluarga.
            </p>

            {/* Quick Action Badges / Interactive Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onSpatulaKnock}
                className="px-5 py-3 rounded-lg bg-amber-800 text-amber-50 hover:bg-amber-900 active:scale-95 transition-all font-medium text-sm flex items-center gap-2.5 shadow-sm"
              >
                <Utensils className="w-4 h-4 text-amber-300" />
                <span>Ketuk Spatula Mama Siti!</span>
                <span className="font-mono bg-amber-950/40 text-amber-200 text-xs px-2 py-0.5 rounded">
                  {spatulaCount} Ketukan
                </span>
              </button>

              <button
                onClick={onOpenAIChef}
                className="px-4 py-3 rounded-lg bg-white border border-stone-300 hover:border-amber-700 hover:text-amber-900 transition-all font-medium text-sm text-stone-700 flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Tanya Resepi & Pantun AI</span>
              </button>
            </div>

            {/* Search Input Box */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari resepi (cth: Rendang Tok, Masak Lemak, Petai, Nasi Lemak)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700 transition-shadow shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-medium"
                  >
                    Kosongkan
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 aspect-[4/3] bg-stone-200 group">
              <img
                src="/src/assets/images/hero_mama_siti_kitchen_1790908309572.jpg"
                alt="Dapur Warisan Tradisional Mama Siti"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay for warm readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              {/* Floating Chef Quote */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
                  <Music className="w-3.5 h-3.5" />
                  <span>Irama Masakan Hari Ini</span>
                </div>
                <p className="font-serif-display text-base sm:text-lg italic text-amber-50 leading-snug">
                  &ldquo;Biar api kecil, biar santan merenih mesra. Sambil menumis, alirkan kasih sayang ke setiap butir rempah.&rdquo;
                </p>
                <div className="text-xs text-amber-200/80 mt-1 font-sans">
                  — Mama Siti, Pengacara & Tukang Masak
                </div>
              </div>
            </div>

            {/* Mini Floater Badge */}
            <div className="absolute -bottom-3 -right-2 bg-amber-900 text-amber-50 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md border border-amber-700/60 hidden sm:flex items-center gap-1.5">
              <span>🍳</span>
              <span>100% Rasa Masakan Kenduri Asli</span>
            </div>
          </div>
        </div>

        {/* Category Filters (Functional segmented controls / tabs) */}
        <div className="mt-10 pt-6 border-t border-stone-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Spice Level Filter */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-xs text-stone-500 font-medium">Tahap Pedas:</span>
            <select
              value={selectedSpice}
              onChange={(e) => onSelectSpice(e.target.value)}
              className="text-xs py-1.5 px-2.5 bg-white border border-stone-300 rounded-md text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
            >
              {SPICE_LEVELS.map((spice) => (
                <option key={spice} value={spice}>
                  {spice}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
