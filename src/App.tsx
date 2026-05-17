/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GameCore } from "./components/GameCore";
import { StartScreen } from "./components/StartScreen";
import { RouteType } from './types';

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);

  const handleStart = (route: RouteType) => {
    setSelectedRoute(route);
  };

  const handleRestart = () => {
    setSelectedRoute(null);
  };

  return (
    <div className="w-full h-screen bg-[#05060a] selection:bg-blue-500/30">
      {selectedRoute === null ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameCore route={selectedRoute} onRestart={handleRestart} />
      )}
    </div>
  );
}
