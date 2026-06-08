/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LegendChapter } from '../../types/legend';
import { LegendHotzone } from './LegendHotzone';

interface LegendBackgroundProps {
  legend: LegendChapter;
  completedItems: string[];
  onItemClick: (itemId: string) => void;
  compact?: boolean;
  focusedItemId?: string | null;
}

export const LegendBackground: React.FC<LegendBackgroundProps> = ({
  legend,
  completedItems,
  onItemClick,
  compact = false,
  focusedItemId = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_34%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />

      <div className={`absolute inset-0 flex items-center justify-center ${compact ? 'px-4 py-3' : 'px-10 py-6'}`}>
        <div className={`relative overflow-hidden rounded-[28px] border border-white/12 bg-black/30 shadow-2xl backdrop-blur-sm ${compact ? 'aspect-[3/4] w-full max-w-[19rem]' : 'aspect-[16/9] h-full max-h-[calc(100%-2rem)] w-full max-w-6xl'}`}>
          <img
            src={legend.backgroundImage}
            alt={legend.name}
            className="absolute inset-0 h-full w-full object-contain"
          />

          {!compact && legend.textOverlayImage && (
            <img
              src={legend.textOverlayImage}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-90"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/36 via-transparent to-black/14" />

          <div className="absolute inset-0">
            {legend.items.map((item, index) => (
              <LegendHotzone
                key={item.id}
                item={item}
                index={index}
                isCompleted={completedItems.includes(item.id)}
                isLocked={false}
                isFocused={focusedItemId === item.id}
                compact={compact}
                onClick={() => onItemClick(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {!compact && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-none absolute left-0 right-0 top-4 text-center"
        >
          <h2 className="font-display text-2xl font-black tracking-wider text-white drop-shadow-lg">
            {legend.name}
          </h2>
          <p className="mt-1 text-sm text-white/70">{legend.title}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
