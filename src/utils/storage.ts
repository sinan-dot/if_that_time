/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const STORAGE_KEY = 'life-path-game-progress';

interface GameProgress {
  ordinaryCompleted: boolean;  // 平凡之路是否通关
  legendUnlocked: boolean;     // 传奇人生是否解锁
}

const defaultProgress: GameProgress = {
  ordinaryCompleted: false,
  legendUnlocked: false,
};

export function getProgress(): GameProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('读取存档失败:', e);
  }
  return defaultProgress;
}

export function saveProgress(progress: GameProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('保存存档失败:', e);
  }
}

export function markOrdinaryCompleted(): void {
  const progress = getProgress();
  progress.ordinaryCompleted = true;
  progress.legendUnlocked = true;
  saveProgress(progress);
}

export function isLegendUnlocked(): boolean {
  return getProgress().legendUnlocked;
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}