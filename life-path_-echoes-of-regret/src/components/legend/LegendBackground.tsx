/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LegendChapter, LegendItem } from '../../types/legend';
import { LegendHotzone } from './LegendHotzone';

interface LegendBackgroundProps {
  legend: LegendChapter;
  completedItems: string[];
  onItemClick: (itemId: string) => void;
}

export const LegendBackground: React.FC<LegendBackgroundProps> = ({
  legend,
  completedItems,
  onItemClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      {/* 主背景图 */}
      <img
        src={legend.backgroundImage}
        alt={legend.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 文本叠加层 */}
      {legend.textOverlayImage && (
        <img
          src={legend.textOverlayImage}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-90"
        />
      )}

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* 热区层 */}
      <div className="absolute inset-0">
        {legend.items.map((item, index) => (
          <LegendHotzone
            key={item.id}
            item={item}
            index={index}
            isCompleted={completedItems.includes(item.id)}
            isLocked={
              item.unlockRequirement
                ? !completedItems.includes(item.unlockRequirement)
                : false
            }
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>

      {/* 伟人名称悬浮 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-0 right-0 text-center pointer-events-none"
      >
        <h2 className="text-2xl font-black text-white font-display tracking-wider drop-shadow-lg">
          {legend.name}
        </h2>
        <p className="text-sm text-white/70 mt-1">{legend.title}</p>
      </motion.div>
    </motion.div>
  );
};