/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** 伟人章节 */
export interface LegendChapter {
  id: string;
  name: string;
  title: string;
  description: string;
  backgroundImage: string;
  textOverlayImage?: string;
  items: LegendItem[];
  ending: LegendEnding;
}

/** 可点击物品（使用热区方式） */
export interface LegendItem {
  id: string;
  name: string;
  description: string;
  /** 点击热区位置（百分比，0-100） */
  hotzone: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  story: LegendStory;
  minigame?: MiniGameConfig;
  unlockRequirement?: string;
}

/** 剧情内容 */
export interface LegendStory {
  title: string;
  narrative: string;
  choices: LegendChoice[];
}

/** 选择分支 */
export interface LegendChoice {
  id: string;
  text: string;
  consequence: LegendConsequence;
}

/** 选择后果 */
export interface LegendConsequence {
  narrative: string;
  statChange?: {
    courage?: number;
    wisdom?: number;
    persistence?: number;
  };
}

/** 小游戏配置 */
export interface MiniGameConfig {
  type: 'drag' | 'click' | 'sequence' | 'timing' | 'puzzle' | 'screw';
  title: string;
  instruction: string;
  duration?: number;
  data: MiniGameData;
}

/** 小游戏数据 */
export type MiniGameData = DragGameData | ClickGameData | SequenceGameData | TimingGameData | ScrewGameData;

export interface DragGameData {
  targets: Array<{
    id: string;
    name: string;
    targetPosition: { x: number; y: number };
    startPosition: { x: number; y: number };
  }>;
}

export interface ClickGameData {
  targetCount: number;
  timeLimit?: number;
}

export interface SequenceGameData {
  sequence: string[];
}

export interface TimingGameData {
  targetZones: Array<{ x: number; y: number; radius: number }>;
}

export interface ScrewGameData {
  screwCount: number;
}

/** 结局配置 */
export interface LegendEnding {
  title: string;
  summary: string;
  quotes: string[];
}

/** 游戏状态 */
export interface LegendGameState {
  currentLegendId: string | null;
  completedItems: string[];
  choices: Record<string, string>;
  stats: {
    courage: number;
    wisdom: number;
    persistence: number;
  };
  phase: 'selecting' | 'exploring' | 'story' | 'choice' | 'minigame' | 'ending';
  activeItemId: string | null;
}