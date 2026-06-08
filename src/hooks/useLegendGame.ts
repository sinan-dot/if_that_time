/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { LegendChapter, LegendGameState, LegendItem, MiniGameConfig } from '../types/legend';
import { LEGENDS } from '../data/legends';

const initialState: LegendGameState = {
  currentLegendId: null,
  completedItems: [],
  choices: {},
  stats: { courage: 0, wisdom: 0, persistence: 0 },
  phase: 'selecting',
  activeItemId: null,
};

export function useLegendGame() {
  const [state, setState] = useState<LegendGameState>(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const selectLegend = useCallback((legendId: string) => {
    setState(prev => ({
      ...prev,
      currentLegendId: legendId,
      completedItems: [],
      choices: {},
      stats: { courage: 0, wisdom: 0, persistence: 0 },
      phase: 'exploring',
      activeItemId: null,
    }));
  }, []);

  const activateItem = useCallback((itemId: string) => {
    const legend = LEGENDS.find(l => l.id === stateRef.current.currentLegendId);
    if (!legend) return;

    const item = legend.items.find(i => i.id === itemId);
    if (!item) return;

    setState(prev => ({
      ...prev,
      phase: 'story',
      activeItemId: itemId,
    }));
  }, []);

  const showChoices = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'choice',
    }));
  }, []);

  const makeChoice = useCallback((itemId: string, choiceId: string) => {
    const legend = LEGENDS.find(l => l.id === stateRef.current.currentLegendId);
    if (!legend) return;

    const item = legend.items.find(i => i.id === itemId);
    if (!item) return;

    const choice = item.story.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setState(prev => {
      const newStats = { ...prev.stats };
      if (choice.consequence.statChange) {
        Object.entries(choice.consequence.statChange).forEach(([key, value]) => {
          newStats[key as keyof typeof newStats] += value as number;
        });
      }

      // 如果没有小游戏，直接完成该物品
      if (!item.minigame) {
        const newCompletedItems = prev.completedItems.includes(itemId)
          ? prev.completedItems
          : [...prev.completedItems, itemId];
        const allCompleted = legend && newCompletedItems.length >= legend.items.length;

        return {
          ...prev,
          choices: { ...prev.choices, [itemId]: choiceId },
          stats: newStats,
          completedItems: newCompletedItems,
          phase: allCompleted ? 'ending' : 'exploring',
          activeItemId: null,
        };
      }

      // 有小游戏，进入小游戏阶段
      return {
        ...prev,
        choices: { ...prev.choices, [itemId]: choiceId },
        stats: newStats,
        phase: 'minigame',
      };
    });
  }, []);

  const completeMinigame = useCallback((success: boolean) => {
    if (!success) {
      setState(prev => ({ ...prev, phase: 'minigame' }));
      return;
    }

    setState(prev => {
      // 确保 activeItemId 存在
      if (!prev.activeItemId) {
        console.error('completeMinigame: activeItemId is null');
        return { ...prev, phase: 'exploring', activeItemId: null };
      }

      // 检查是否已经完成过该物品，避免重复添加
      if (prev.completedItems.includes(prev.activeItemId)) {
        console.warn('completeMinigame: item already completed', prev.activeItemId);
        const legend = LEGENDS.find(l => l.id === prev.currentLegendId);
        const allCompleted = legend && prev.completedItems.length >= legend.items.length;
        return {
          ...prev,
          phase: allCompleted ? 'ending' : 'exploring',
          activeItemId: null,
        };
      }

      const newCompletedItems = prev.completedItems.includes(prev.activeItemId)
        ? prev.completedItems
        : [...prev.completedItems, prev.activeItemId];
      const legend = LEGENDS.find(l => l.id === prev.currentLegendId);
      const allCompleted = legend && newCompletedItems.length >= legend.items.length;

      console.log('completeMinigame:', {
        activeItemId: prev.activeItemId,
        completedItems: newCompletedItems,
        totalItems: legend?.items.length,
        allCompleted,
      });

      return {
        ...prev,
        completedItems: newCompletedItems,
        phase: allCompleted ? 'ending' : 'exploring',
        activeItemId: null,
      };
    });
  }, []);

  const skipMinigame = useCallback(() => {
    setState(prev => {
      if (!prev.activeItemId) {
        return { ...prev, phase: 'exploring', activeItemId: null };
      }

      const newCompletedItems = prev.completedItems.includes(prev.activeItemId)
        ? prev.completedItems
        : [...prev.completedItems, prev.activeItemId];
      const legend = LEGENDS.find(l => l.id === prev.currentLegendId);
      const allCompleted = legend && newCompletedItems.length >= legend.items.length;

      return {
        ...prev,
        completedItems: newCompletedItems,
        phase: allCompleted ? 'ending' : 'exploring',
        activeItemId: null,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  const getCurrentLegend = useCallback((): LegendChapter | undefined => {
    return LEGENDS.find(l => l.id === stateRef.current.currentLegendId);
  }, []);

  const getCurrentItem = useCallback((): LegendItem | undefined => {
    const legend = getCurrentLegend();
    if (!legend || !stateRef.current.activeItemId) return undefined;
    return legend.items.find(i => i.id === stateRef.current.activeItemId);
  }, []);

  const getCurrentMinigame = useCallback((): MiniGameConfig | undefined => {
    const item = getCurrentItem();
    return item?.minigame;
  }, []);

  const getChoiceConsequence = useCallback((itemId: string, choiceId: string) => {
    const legend = getCurrentLegend();
    if (!legend) return null;
    const item = legend.items.find(i => i.id === itemId);
    if (!item) return null;
    const choice = item.story.choices.find(c => c.id === choiceId);
    return choice?.consequence;
  }, [getCurrentLegend]);

  return {
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
    getChoiceConsequence,
  };
}
