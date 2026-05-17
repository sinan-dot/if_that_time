// // // /**
// // //  * @license
// // //  * SPDX-License-Identifier: Apache-2.0
// // //  */

// // // import React from 'react';
// // // import { motion } from 'motion/react';

// // // interface HUDProps {
// // //   repair: number;
// // //   combo: number;
// // //   miss: number;
// // //   currentChapterTitle: string;
// // // }

// // // export const HUD: React.FC<HUDProps> = ({ repair, combo, miss, currentChapterTitle }) => {
// // //   return (
// // //     <div className="fixed inset-x-0 top-0 z-40 p-6 flex justify-between items-start pointer-events-none">
// // //       <div className="space-y-1">
// // //         <div className="flex items-center gap-3">
// // //           <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
// // //             <motion.div 
// // //               className="h-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
// // //               initial={{ width: 0 }}
// // //               animate={{ width: `${repair}%` }}
// // //               transition={{ type: 'spring', damping: 20 }}
// // //             />
// // //           </div>
// // //           <span className="text-xs font-black text-blue-300 uppercase tracking-tighter">
// // //             修复率 {repair}%
// // //           </span>
// // //         </div>
// // //         <div className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Soul Repair Integrity</div>
// // //       </div>

// // //       <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center space-y-1">
// // //         <h2 className="text-2xl font-black tracking-[0.3em] text-white font-display uppercase">
// // //           {currentChapterTitle}
// // //         </h2>
// // //         <div className="w-12 h-[1px] bg-white/20 mx-auto" />
// // //       </div>

// // //       <div className="flex gap-8 text-right">
// // //         <div className="space-y-0">
// // //           <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Combo</div>
// // //           <motion.div 
// // //             key={combo}
// // //             initial={{ scale: 1.5, color: '#fff' }}
// // //             animate={{ scale: 1, color: '#93c5fd' }}
// // //             className="text-3xl font-black italic leading-none"
// // //           >
// // //             {combo}
// // //           </motion.div>
// // //         </div>
// // //         <div className="space-y-0">
// // //           <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Misses</div>
// // //           <div className="text-3xl font-black text-pink-500/80 leading-none">
// // //             {miss}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // import React from 'react';

// // interface HUDProps {
// //   currentStep: number;
// //   totalSteps: number;
// //   age: string;
// // }

// // const AGE_MAP: Record<string, string> = {
// //   'CHILDHOOD': '童年期',
// //   'YOUTH': '青春期',
// //   'ADULT': '成年期',
// //   'ELDER': '暮年期'
// // };

// // export const HUD: React.FC<HUDProps> = ({ currentStep, totalSteps, age }) => {
// //   // 计算进度百分比
// //   const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));

// //   return (
// //     <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none">
// //       {/* 左侧：当前阶段与进度条 */}
// //       <div className="flex flex-col gap-2">
// //         <div className="text-white/90 text-sm font-display tracking-widest drop-shadow-md">
// //           {AGE_MAP[age] || '未知阶段'}
// //         </div>
// //         <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden shadow-inner">
// //           <div 
// //             className="h-full bg-gradient-to-r from-blue-300 to-blue-100 transition-all duration-500 ease-out"
// //             style={{ width: `${progress}%` }}
// //           />
// //         </div>
// //       </div>
      
// //       {/* 右侧：具体年轮/关卡数 */}
// //       <div className="flex flex-col items-end">
// //         <div className="text-white/60 text-[10px] tracking-widest uppercase mb-1 drop-shadow-sm">人生进度</div>
// //         <div className="text-blue-50 font-display text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
// //           {currentStep}<span className="text-sm text-white/50">/{totalSteps}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// import React from 'react';

// interface HUDProps {
//   currentStep: number;
//   totalSteps: number;
//   age: string;
// }

// const AGE_MAP: Record<string, string> = {
//   'CHILDHOOD': '童年期',
//   'YOUTH': '青春期',
//   'ADULT': '成年期',
//   'ELDER': '暮年期'
// };

// export const HUD: React.FC<HUDProps> = ({ currentStep, totalSteps, age }) => {
//   // 精确计算百分比，确保跑到最后能达到 100%
//   const progress = totalSteps > 0 ? Math.min(100, Math.max(0, (currentStep / totalSteps) * 100)) : 0;

//   return (
//     <div className="absolute top-0 left-0 w-full p-6 z-40 flex justify-between items-start pointer-events-none">
      
//       {/* 左侧：当前阶段与进度条 */}
//       <div className="flex flex-col gap-2 w-1/3">
//         <div className="text-white/90 text-sm font-display tracking-widest drop-shadow-md">
//           {AGE_MAP[age] || '未知阶段'}
//         </div>
//         {/* 给进度条外框一个固定宽度和深色底，效果更明显 */}
//         <div className="w-full max-w-[150px] h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
//           <div 
//             className="h-full bg-gradient-to-r from-blue-400 to-blue-200 transition-all duration-300 ease-out"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
      
//       {/* 右侧：关卡数 */}
//       <div className="flex flex-col items-end">
//         <div className="text-white/60 text-[10px] tracking-widest uppercase mb-1 drop-shadow-sm">人生进度</div>
//         <div className="text-blue-50 font-display text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
//           {currentStep}<span className="text-sm text-white/50">/{totalSteps}</span>
//         </div>
//       </div>

//     </div>
//   );
// };

import React from 'react';

interface HUDProps {
  currentStep: number;
  totalSteps: number;
  age: string;
}

const AGE_MAP: Record<string, string> = {
  'CHILDHOOD': '童年阶段',
  'YOUTH': '青春岁月',
  'ADULT': '成年现实',
  'ELDER': '暮年回望'
};

export const HUD: React.FC<HUDProps> = ({ currentStep, totalSteps, age }) => {
  const progress = totalSteps > 0 ? Math.min(100, Math.max(0, (currentStep / totalSteps) * 100)) : 0;

  return (
    <div className="absolute top-0 left-0 w-full p-6 z-40 flex justify-between items-start pointer-events-none">
      
      {/* 左侧：当前阶段与进度条 */}
      <div className="flex flex-col gap-2 w-1/3 mt-2">
        <div className="text-white/90 text-sm md:text-base font-display tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-bold">
          {AGE_MAP[age] || '未知阶段'}
        </div>
        <div className="w-full max-w-[150px] h-2 bg-black/40 rounded-full overflow-hidden shadow-inner border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* 右侧：关卡数 */}
      <div className="flex flex-col items-end mt-2">
        <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase mb-1 drop-shadow-sm">人生进度</div>
        <div className="text-white font-display text-2xl md:text-3xl font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
          {currentStep}<span className="text-sm text-white/40 ml-1">/ {totalSteps}</span>
        </div>
      </div>

    </div>
  );
};