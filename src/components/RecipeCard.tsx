import React from 'react';
import { Clock, Users, Flame, Music, Bookmark, ChevronRight, Utensils } from 'lucide-react';
import { Recipe } from '../data/recipes';
import { kitchenAudio } from '../utils/audioEngine';

interface RecipeCardProps {
  recipe: Recipe;
  onOpen: (recipe: Recipe) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onOpen,
  isBookmarked,
  onToggleBookmark,
}) => {
  const handlePlayCardMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    kitchenAudio.playSpatulaClack(1.1);
    kitchenAudio.playMusic();
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(recipe.id);
  };

  return (
    <div
      onClick={() => onOpen(recipe)}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-amber-700/60 hover:shadow-md transition-all flex flex-col h-full"
    >
      {/* Media Slot */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-950 bg-amber-100/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-amber-300 shadow-xs">
            {recipe.category}
          </span>

          <button
            onClick={handleBookmarkClick}
            className={`p-1.5 rounded-lg transition-colors shadow-xs ${
              isBookmarked
                ? 'bg-amber-600 text-white'
                : 'bg-white/80 backdrop-blur-xs text-stone-700 hover:bg-white'
            }`}
            title={isBookmarked ? 'Padam dari simpanan' : 'Simpan resepi'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Bottom Banner Over Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-amber-200">
            <Music className="w-3.5 h-3.5" />
            <span className="truncate max-w-[190px]">{recipe.iramaTitle}</span>
          </div>
          <span className="text-[11px] text-stone-200 font-mono">
            {recipe.timeMinutes} min
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Dot Separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 flex-wrap">
            <span>{recipe.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.servings} porsi</span>
            <span aria-hidden="true">·</span>
            <span className={recipe.spiceLevel === 'Pedas Berapi' ? 'text-rose-700 font-medium' : ''}>
              {recipe.spiceLevel}
            </span>
          </div>

          <h3 className="font-serif-display text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
            {recipe.title}
          </h3>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {recipe.subtitle}
          </p>

          {/* Pantun snippet */}
          <div className="mt-3 p-2.5 bg-amber-50/70 border-l-2 border-amber-600 rounded-r-md">
            <p className="text-[11px] italic text-amber-950 font-serif-display line-clamp-2">
              &ldquo;{recipe.pantun[0]} {recipe.pantun[1]}&rdquo;
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
          <button
            onClick={handlePlayCardMusic}
            className="text-stone-600 hover:text-amber-800 flex items-center gap-1 transition-colors"
            title="Dengar alunan muzik sambil memasak"
          >
            <Music className="w-3.5 h-3.5 text-amber-600" />
            <span>Irama Lagu</span>
          </button>

          <span className="text-amber-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-semibold">
            Buka Resepi
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
