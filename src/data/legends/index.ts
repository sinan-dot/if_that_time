/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegendChapter } from '../../types/legend';
import { leiJunLegend } from './leiJun';
import { muskLegend } from './musk';
import { jobsLegend } from './jobs';

export const LEGENDS: LegendChapter[] = [
  leiJunLegend,
  muskLegend,
  jobsLegend,
];

export function getLegendById(id: string): LegendChapter | undefined {
  return LEGENDS.find(l => l.id === id);
}