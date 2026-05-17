/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, RouteType } from "./types";
import { ORDINARY_CHAPTERS } from "./data/ordinaryChapters";
import { LEGEND_CHAPTERS } from "./data/legendChapters";

export const GAME_CONSTANTS = {
  SPEED: 4,
  TURN_SPEED_PERFECT: Math.PI / 2,
  TURN_SPEED_GREAT: Math.PI / 3,
  TURN_SPEED_OK: Math.PI / 6,
  REPAIR_INC: 20,
  MISS_DEC: 10,
};

export const BEAT_MS = 500;

// 根据路线类型获取对应的关卡数据
export function getChaptersByRoute(route: RouteType): Chapter[] {
  return route === 'ordinary' ? ORDINARY_CHAPTERS : LEGEND_CHAPTERS;
}

// 获取路线的起始章节ID
export function getStartChapterId(route: RouteType): string {
  const chapters = getChaptersByRoute(route);
  return chapters.length > 0 ? chapters[0].id : 'childhood_start';
}

// 导出各路线关卡（供外部直接访问）
export { ORDINARY_CHAPTERS, LEGEND_CHAPTERS };

// 向后兼容：CHAPTERS 指向平凡之路
export const CHAPTERS = ORDINARY_CHAPTERS;