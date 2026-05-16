/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameCore } from "./components/GameCore";

export default function App() {
  return (
    <div className="w-full h-screen bg-[#05060a] selection:bg-blue-500/30">
      <GameCore />
    </div>
  );
}
