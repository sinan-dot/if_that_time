/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chapter {
  id: string;
  title: string;
  description: string;
  choices: {
    good: {
      text: string;
      memory: string;
      nextId?: string; // ID of the next chapter if this is selected
    };
    bad: {
      text: string;
      memory: string;
      nextId?: string; // ID of the next chapter if this is selected
    };
  };
  age: 'CHILDHOOD' | 'YOUTH' | 'ADULT' | 'ELDER';
}

export type GameState = 'START' | 'PLAYING' | 'ENDING';

export type RouteType = 'ordinary' | 'legend';

export interface NodeData {
  id: string;
  x: number;
  y: number;
  type: 'good' | 'bad';
  text: string;
  hit: boolean;
}
