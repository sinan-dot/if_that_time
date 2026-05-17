/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LegendItem, LegendChoice } from '../../types/legend';

interface LegendChoiceModalProps {
  item: LegendItem;
  onChoose: (choiceId: string) => void;
}

export const LegendChoiceModal: React.FC<LegendChoiceModalProps> = ({
  item,
  onChoose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl"
      >
        {/* 关键抉择标识 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/30">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">
              关键抉择
            </span>
          </div>
        </motion.div>

        {/* 物品名称 */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-black text-white font-display text-center mb-6"
        >
          {item.name}
        </motion.h3>

        {/* 选择按钮 */}
        <div className="space-y-4">
          {item.story.choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChoose(choice.id)}
              className={`w-full py-4 px-5 rounded-2xl font-bold text-left transition-all ${
                index === 0
                  ? 'bg-blue-500/25 hover:bg-blue-500/35 border-2 border-blue-400/40 text-blue-100'
                  : 'bg-pink-500/25 hover:bg-pink-500/35 border-2 border-pink-400/40 text-pink-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm ${
                    index === 0 ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                  }`}
                >
                  {index === 0 ? 'A' : 'B'}
                </span>
                <div className="flex-1 text-sm leading-relaxed whitespace-pre-line">
                  {choice.text}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* 提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-white/40 mt-6"
        >
          你的选择将影响命运的走向
        </motion.p>
      </motion.div>
    </motion.div>
  );
};