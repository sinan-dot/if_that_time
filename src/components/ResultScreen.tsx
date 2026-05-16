/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Heart, Share2 } from 'lucide-react';

interface ResultScreenProps {
  repair: number;
  miss: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ repair, miss, onRestart }) => {
  const isGoodEnd = repair >= 75;
  const isNormalEnd = repair >= 40 && repair < 75;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-black font-display text-blue-300"
          >
            {isGoodEnd ? "那条路，亮了 🌤️" : isNormalEnd ? "未完的诗 📄" : "遗憾依旧 🌧️"}
          </motion.div>
          <p className="text-blue-200/60">
            {isGoodEnd 
              ? "你没有抹掉过去，只是终于替当时的自己，走出了另一种可能。" 
              : isNormalEnd 
                ? "生活中总有妥协，虽然不完美，但你已经尽力去修补了。"
                : "有些路不是一次就能走通。再来一次，也许你会在转折点抓住它。"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="text-sm text-blue-200/40 uppercase tracking-widest">遗憾修复</div>
            <div className="text-3xl font-black text-blue-300">{repair}%</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5">
            <div className="text-sm text-blue-200/40 uppercase tracking-widest">错过瞬间</div>
            <div className="text-3xl font-black text-pink-400">{miss}</div>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full py-4 flex items-center justify-center gap-2 font-black text-blue-900 bg-white rounded-2xl shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            生命轮回
          </motion.button>
          
          <div className="flex gap-3">
             <button className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-white bg-blue-600/30 rounded-2xl hover:bg-blue-600/40 transition-colors">
              <Share2 className="w-5 h-5" />
              分享轨迹
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-white bg-pink-600/30 rounded-2xl hover:bg-pink-600/40 transition-colors">
              <Heart className="w-5 h-5" />
              珍藏记忆
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
