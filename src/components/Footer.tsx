import React from 'react';
import { Utensils, Music, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (target: 'recipes' | 'radio' | 'ai-chef' | 'pantun') => void;
  onSpatulaKnock: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onSpatulaKnock }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & About */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif-display font-bold text-base">
                MS
              </div>
              <span className="font-serif-display text-xl font-bold tracking-tight text-white">
                Ketuk-Ketuk Spatular Mama Siti
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Meraikan keindahan masakan Melayu asli dan khazanah dapur nusantara. Setiap gulai dikacau dengan irama, setiap sambal digesek dengan pantun dan kasih sayang.
            </p>

            <div className="pt-1">
              <button
                onClick={onSpatulaKnock}
                className="px-3 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700 flex items-center gap-2 transition-colors"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Ketuk Spatula Sekali Lagi!</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Koleksi Dapur
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('recipes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Lauk Kenduri & Warisan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('recipes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Santan & Masakan Berkuah
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('recipes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sambal Tumis & Gorengan Berapi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('recipes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Kuih Muih Tradisional & Air Balang
                </button>
              </li>
            </ul>
          </div>

          {/* Cooking Philosophy / Quote */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Pesanan Bonda Mama Siti
            </h4>
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-2 text-xs">
              <p className="font-serif-display italic text-stone-300 leading-relaxed">
                &ldquo;Dapur yang riuh dengan gelak tawa dan lagu ialah rahsia makanan yang sentiasa bertambah sedap. Jangan takut mencuba, ketuk spatula dan teruskan memasak!&rdquo;
              </p>
              <span className="text-[11px] text-amber-400 block font-sans">
                — Mama Siti
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Ketuk-Ketuk Spatular Mama Siti. Hak cipta terpelihara.</p>
          <p className="flex items-center gap-1">
            <span>Dihasilkan dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>untuk peminat resepi & masakan Malaysia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
