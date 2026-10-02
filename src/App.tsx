import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { RadioBar } from './components/RadioBar';
import { HeroSection } from './components/HeroSection';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { MamaSitiAIChat } from './components/MamaSitiAIChat';
import { IramaLaguSection } from './components/IramaLaguSection';
import { Footer } from './components/Footer';
import { RECIPES_DATA, Recipe } from './data/recipes';
import { kitchenAudio } from './utils/audioEngine';
import { Bookmark, Utensils, Sparkles, Filter, Music } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'recipes' | 'radio' | 'ai-chef' | 'pantun'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedSpice, setSelectedSpice] = useState('Semua Tahap');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Spatula Knock Counter
  const [spatulaCount, setSpatulaCount] = useState<number>(() => {
    const saved = localStorage.getItem('mama_siti_spatula_knocks');
    return saved ? parseInt(saved, 10) : 18;
  });

  // Music Playing State
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Selected Recipe for Modal
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mama_siti_bookmarks');
    return saved ? JSON.parse(saved) : ['rendang-daging-tok-warisan', 'masak-lemak-cili-padi-udang-nenas'];
  });

  // Floating knock animation trigger
  const [floatingKnockAnimate, setFloatingKnockAnimate] = useState(false);

  // Subscribe to audio engine
  useEffect(() => {
    const unsubscribe = kitchenAudio.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
    return unsubscribe;
  }, []);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem('mama_siti_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Handle Spatula Knock
  const handleSpatulaKnock = () => {
    const newCount = spatulaCount + 1;
    setSpatulaCount(newCount);
    localStorage.setItem('mama_siti_spatula_knocks', newCount.toString());
    setFloatingKnockAnimate(true);
    setTimeout(() => setFloatingKnockAnimate(false), 300);
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Background Music
  const handleToggleMusic = () => {
    kitchenAudio.toggleMusic();
  };

  // Navigation click
  const handleNavClick = (target: 'recipes' | 'radio' | 'ai-chef' | 'pantun') => {
    setActiveSection(target);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter((recipe) => {
      // Search
      const matchesSearch =
        !searchQuery ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.ingredients.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'Semua Kategori' || recipe.category === selectedCategory;

      // Spice
      const matchesSpice =
        selectedSpice === 'Semua Tahap' || recipe.spiceLevel === selectedSpice;

      // Bookmark only
      const matchesBookmark = !showOnlyBookmarks || bookmarkedIds.includes(recipe.id);

      return matchesSearch && matchesCategory && matchesSpice && matchesBookmark;
    });
  }, [searchQuery, selectedCategory, selectedSpice, showOnlyBookmarks, bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* 3-Zone Top Navigation Bar */}
      <TopBar
        onNavClick={handleNavClick}
        activeSection={activeSection}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        spatulaCount={spatulaCount}
        onSpatulaKnock={handleSpatulaKnock}
      />

      {/* Synchronized Cooking Radio & Sound Effects Player */}
      <RadioBar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onSpatulaKnock={handleSpatulaKnock}
      />

      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSpice={selectedSpice}
          onSelectSpice={setSelectedSpice}
          spatulaCount={spatulaCount}
          onSpatulaKnock={handleSpatulaKnock}
          onOpenAIChef={() => handleNavClick('ai-chef')}
        />

        {/* Recipes Grid Section */}
        <section id="recipes" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          
          {/* Section Sub-bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                Pilihan Resepi Air Tangan Bonda
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Menampilkan {filteredRecipes.length} masakan Melayu asli berirama
              </p>
            </div>

            {/* Filter Toggle: Bookmarked Only */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  showOnlyBookmarks
                    ? 'bg-amber-800 text-white border-amber-800'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Resepi Disimpan ({bookmarkedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Grid of Recipe Cards */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onOpen={setSelectedRecipe}
                  isBookmarked={bookmarkedIds.includes(recipe.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4 max-w-md mx-auto">
              <Utensils className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif-display text-lg font-bold text-stone-800">
                Tiada Resepi Dijumpai
              </h3>
              <p className="text-xs text-stone-500">
                Cuba cari dengan kata kunci lain atau kosongkan pilihan tapisan anda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua Kategori');
                  setSelectedSpice('Semua Tahap');
                  setShowOnlyBookmarks(false);
                }}
                className="px-4 py-2 bg-amber-800 text-white text-xs font-semibold rounded-lg hover:bg-amber-900 transition-colors"
              >
                Tunjuk Semua Resepi
              </button>
            </div>
          )}

        </section>

        {/* Irama & Lagu Section */}
        <IramaLaguSection
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onSpatulaKnock={handleSpatulaKnock}
        />

        {/* AI Kitchen Assistant: Tanya Mama Siti */}
        <MamaSitiAIChat />

      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} onSpatulaKnock={handleSpatulaKnock} />

      {/* Floating Spatula Knock Shortcut */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            kitchenAudio.playSpatulaClack(1.0 + Math.random() * 0.25);
            handleSpatulaKnock();
          }}
          className={`px-4 py-3 rounded-full bg-amber-800 hover:bg-amber-900 text-amber-50 shadow-xl border-2 border-amber-500 flex items-center gap-2.5 transition-all active:scale-90 group cursor-pointer ${
            floatingKnockAnimate ? 'scale-115 rotate-6' : ''
          }`}
          title="Ketuk Spatula! Bunyi kuali tang-tang!"
        >
          <Utensils className="w-4 h-4 text-amber-300 group-hover:-rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">Ketuk Spatula!</span>
          <span className="font-mono text-[11px] bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded-full">
            {spatulaCount}
          </span>
        </button>
      </div>

      {/* Step-by-Step Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isBookmarked={bookmarkedIds.includes(selectedRecipe.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

    </div>
  );
}
