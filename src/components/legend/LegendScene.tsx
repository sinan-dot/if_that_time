/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLegendGame } from '../../hooks/useLegendGame';
import { LegendSelector } from './LegendSelector';
import { LegendBackground } from './LegendBackground';
import { LegendStoryModal } from './LegendStoryModal';
import { LegendChoiceModal } from './LegendChoiceModal';
import { LegendMiniGame } from './LegendMiniGame';
import { LegendEnding } from './LegendEnding';
import { LegendProgress } from './LegendProgress';
import { ArrowLeft, CheckCircle2, Home, MapPin } from 'lucide-react';

interface LegendSceneProps {
  onRestart: () => void;
  onExit?: () => void;
}

export const LegendScene: React.FC<LegendSceneProps> = ({ onRestart, onExit }) => {
  const {
    state,
    selectLegend,
    activateItem,
    showChoices,
    makeChoice,
    completeMinigame,
    skipMinigame,
    resetGame,
    getCurrentLegend,
    getCurrentItem,
    getCurrentMinigame,
  } = useLegendGame();

  const legend = getCurrentLegend();
  const item = getCurrentItem();
  const minigame = getCurrentMinigame();
  const [isPortraitPhone, setIsPortraitPhone] = useState(false);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  useEffect(() => {
    const updateLayoutMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsPortraitPhone(width < 768 && height > width);
    };

    updateLayoutMode();
    window.addEventListener('resize', updateLayoutMode);
    return () => window.removeEventListener('resize', updateLayoutMode);
  }, []);

  useEffect(() => {
    if (!legend || state.phase !== 'exploring') return;

    if (focusedItemId && legend.items.some(legendItem => legendItem.id === focusedItemId)) {
      return;
    }

    const nextFocus = legend.items.find(legendItem => !state.completedItems.includes(legendItem.id))?.id ?? legend.items[0]?.id ?? null;
    setFocusedItemId(nextFocus);
  }, [focusedItemId, legend, state.completedItems, state.phase]);

  const focusedItem = useMemo(
    () => legend?.items.find(legendItem => legendItem.id === focusedItemId) ?? legend?.items[0] ?? null,
    [focusedItemId, legend],
  );

  const handleBackToSelect = () => {
    setFocusedItemId(null);
    resetGame();
  };

  const handleFinalRestart = () => {
    setFocusedItemId(null);
    resetGame();
    onRestart();
  };

  const handleExit = () => {
    setFocusedItemId(null);
    resetGame();
    if (onExit) {
      onExit();
    } else {
      onRestart();
    }
  };

  const handleItemFocus = (itemId: string) => {
    setFocusedItemId(itemId);
  };

  const renderExplorationWide = () => {
    if (!legend) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 right-4 z-30"
      >
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-black/45 p-2 shadow-2xl backdrop-blur-md">
          {legend.items.map((legendItem, index) => {
            const completed = state.completedItems.includes(legendItem.id);

            return (
              <motion.button
                key={legendItem.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => activateItem(legendItem.id)}
                className={`min-h-[72px] rounded-xl border px-2 py-3 text-left transition-all ${
                  completed
                    ? 'border-emerald-300/45 bg-emerald-400/18 text-emerald-50'
                    : 'border-blue-300/35 bg-blue-500/18 text-blue-50 hover:bg-blue-500/28'
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-[11px] font-black">
                    {index + 1}
                  </span>
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <MapPin className="h-4 w-4 text-blue-200" />
                  )}
                </div>
                <div className="text-xs font-black leading-tight">{legendItem.story.title}</div>
                <div className="mt-1 truncate text-[10px] text-white/55">{legendItem.name}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderExplorationPortrait = () => {
    if (!legend || !focusedItem) return null;

    const completed = state.completedItems.includes(focusedItem.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-0 bottom-0 z-30 px-3 pb-4"
      >
        <div className="rounded-[26px] border border-white/12 bg-black/55 px-3 py-3 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 grid grid-cols-3 gap-2">
            {legend.items.map((legendItem, index) => {
              const isCompleted = state.completedItems.includes(legendItem.id);
              const isFocused = legendItem.id === focusedItem.id;

              return (
                <button
                  key={legendItem.id}
                  onClick={() => handleItemFocus(legendItem.id)}
                  className={`rounded-2xl border px-2 py-2 text-center transition-all ${
                    isFocused
                      ? 'border-cyan-200/60 bg-cyan-400/18 text-cyan-50'
                      : isCompleted
                        ? 'border-emerald-300/45 bg-emerald-400/15 text-emerald-50'
                        : 'border-white/12 bg-white/6 text-white/70'
                  }`}
                >
                  <div className="text-[11px] font-black">{index + 1}</div>
                  <div className="mt-1 truncate text-[10px]">{legendItem.name}</div>
                </button>
              );
            })}
          </div>

          <div className={`rounded-2xl border px-4 py-4 text-left ${
            completed
              ? 'border-emerald-300/45 bg-emerald-400/14 text-emerald-50'
              : 'border-white/12 bg-white/6 text-white'
          }`}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-black leading-tight text-white/92">{focusedItem.story.title}</div>
                <div className="mt-1 text-xs text-white/58">{focusedItem.name}</div>
              </div>
              {completed ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
              ) : (
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-200" />
              )}
            </div>

            <p className="mb-4 line-clamp-2 text-[11px] leading-relaxed text-white/62">
              {focusedItem.description}
            </p>

            <button
              onClick={() => activateItem(focusedItem.id)}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                completed
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-white text-slate-900 hover:bg-cyan-50'
              }`}
            >
              {completed ? '重温片段' : '开始探索'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#05060a]">
      <AnimatePresence mode="wait">
        {state.phase !== 'selecting' && legend && (
          <LegendBackground
            key={legend.id}
            legend={legend}
            completedItems={state.completedItems}
            onItemClick={activateItem}
            compact={isPortraitPhone}
            focusedItemId={focusedItemId}
          />
        )}
      </AnimatePresence>

      {(state.phase === 'exploring' || state.phase === 'selecting') && (
        <div
          className={`absolute z-30 flex gap-2 ${isPortraitPhone ? 'left-3' : 'left-4 top-4'}`}
          style={isPortraitPhone ? { top: 'max(0.75rem, env(safe-area-inset-top))' } : undefined}
        >
          {state.phase === 'exploring' && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBackToSelect}
              className="rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleExit}
            className="rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-white/20"
          >
            <Home className="h-5 w-5 text-white" />
          </motion.button>
        </div>
      )}

      {state.phase !== 'selecting' && state.phase !== 'ending' && legend && (
        isPortraitPhone ? (
          <div
            className="absolute right-3 z-30 max-w-[16rem] min-w-0"
            style={{ top: 'max(0.75rem, env(safe-area-inset-top))', width: 'calc(100% - 5.5rem)' }}
          >
            <LegendProgress
              total={legend.items.length}
              completed={state.completedItems.length}
              stats={state.stats}
              compact
            />
          </div>
        ) : (
          <LegendProgress
            total={legend.items.length}
            completed={state.completedItems.length}
            stats={state.stats}
          />
        )
      )}

      {state.phase === 'exploring' && legend && (isPortraitPhone ? renderExplorationPortrait() : renderExplorationWide())}

      <AnimatePresence>
        {state.phase === 'selecting' && (
          <LegendSelector onSelect={selectLegend} onExit={handleExit} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.phase === 'story' && item && (
          <LegendStoryModal item={item} onNext={showChoices} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.phase === 'choice' && item && (
          <LegendChoiceModal item={item} onChoose={(choiceId) => makeChoice(item.id, choiceId)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.phase === 'minigame' && minigame && (
          <LegendMiniGame
            config={minigame}
            onComplete={completeMinigame}
            onSkip={skipMinigame}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.phase === 'ending' && legend && (
          <LegendEnding legend={legend} stats={state.stats} onRestart={handleFinalRestart} />
        )}
      </AnimatePresence>
    </div>
  );
};
