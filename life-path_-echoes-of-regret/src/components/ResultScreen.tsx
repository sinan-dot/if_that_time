// // /**
// //  * @license
// //  * SPDX-License-Identifier: Apache-2.0
// //  */

// // import React from 'react';
// // import { motion, AnimatePresence } from 'motion/react';
// // import { Trophy, RotateCcw, Heart, Share2 } from 'lucide-react';

// // interface ResultScreenProps {
// //   repair: number;
// //   miss: number;
// //   onRestart: () => void;
// // }

// // export const ResultScreen: React.FC<ResultScreenProps> = ({ repair, miss, onRestart }) => {
// //   const isGoodEnd = repair >= 75;
// //   const isNormalEnd = repair >= 40 && repair < 75;

// //   return (
// //     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-xl">
// //       <motion.div
// //         initial={{ scale: 0.9, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8"
// //       >
// //         <div className="space-y-2">
// //           <motion.div
// //             initial={{ y: -20 }}
// //             animate={{ y: 0 }}
// //             className="text-5xl font-black font-display text-blue-300"
// //           >
// //             {isGoodEnd ? "那条路，亮了 🌤️" : isNormalEnd ? "未完的诗 📄" : "遗憾依旧 🌧️"}
// //           </motion.div>
// //           <p className="text-blue-200/60">
// //             {isGoodEnd 
// //               ? "你没有抹掉过去，只是终于替当时的自己，走出了另一种可能。" 
// //               : isNormalEnd 
// //                 ? "生活中总有妥协，虽然不完美，但你已经尽力去修补了。"
// //                 : "有些路不是一次就能走通。再来一次，也许你会在转折点抓住它。"}
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-2 gap-4">
// //           <div className="p-4 rounded-2xl bg-white/5">
// //             <div className="text-sm text-blue-200/40 uppercase tracking-widest">遗憾修复</div>
// //             <div className="text-3xl font-black text-blue-300">{repair}%</div>
// //           </div>
// //           <div className="p-4 rounded-2xl bg-white/5">
// //             <div className="text-sm text-blue-200/40 uppercase tracking-widest">错过瞬间</div>
// //             <div className="text-3xl font-black text-pink-400">{miss}</div>
// //           </div>
// //         </div>

// //         <div className="space-y-3">
// //           <motion.button
// //             whileHover={{ scale: 1.02 }}
// //             whileTap={{ scale: 0.98 }}
// //             onClick={onRestart}
// //             className="w-full py-4 flex items-center justify-center gap-2 font-black text-blue-900 bg-white rounded-2xl shadow-lg"
// //           >
// //             <RotateCcw className="w-5 h-5" />
// //             生命轮回
// //           </motion.button>
          
// //           <div className="flex gap-3">
// //              <button className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-white bg-blue-600/30 rounded-2xl hover:bg-blue-600/40 transition-colors">
// //               <Share2 className="w-5 h-5" />
// //               分享轨迹
// //             </button>
// //             <button className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-white bg-pink-600/30 rounded-2xl hover:bg-pink-600/40 transition-colors">
// //               <Heart className="w-5 h-5" />
// //               珍藏记忆
// //             </button>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };


// import React from 'react';
// import { motion } from 'motion/react';

// interface ResultScreenProps {
//   stats: { car: number; fam: number; hea: number; hap: number };
//   onRestart: () => void;
// }

// export const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onRestart }) => {
//   // 计算总分 (假设基础分为50，加上你在剧本里的增减)
//   const totalScore = stats.car + stats.fam + stats.hea + stats.hap;

//   let summaryTitle = "";
//   let summaryText = "";

//   // 动态判词系统
//   if (totalScore >= 200) {
//     summaryTitle = "璀璨人生";
//     summaryText = "你走过了一段极尽绚烂的旅程。有些遗憾，但更多的是无悔。你的名字，成为了别人仰望的星空。";
//   } else if (totalScore >= 160) {
//     summaryTitle = "平凡可贵";
//     summaryText = "没有惊天动地，但也避开了大风大浪。你守护住了属于自己的小确幸，这已经是最大的成功。";
//   } else if (totalScore >= 120) {
//     summaryTitle = "跌宕起伏";
//     summaryText = "命运对你并不温柔，你吃过苦，流过泪。但那些杀不死你的，最终让你拥有了最厚重的灵魂。";
//   } else {
//     summaryTitle = "意难平";
//     summaryText = "如果能重来一次，一定要对自己好一点。这辈子太辛苦了，下辈子，记得多看看沿途的风景。";
//   }

//   // 属性条组件
//   const StatBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
//     <div className="flex flex-col gap-1 mb-4">
//       <div className="flex justify-between text-xs font-display tracking-widest">
//         <span className="text-white/80">{label}</span>
//         <span className={color}>{value}</span>
//       </div>
//       <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           className={`h-full ${color.replace('text-', 'bg-')}`}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-8"
//     >
//       <div className="w-full max-w-sm">
//         <motion.h2
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-4xl font-display text-white text-center mb-2 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
//         >
//           {summaryTitle}
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1 }}
//           className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 mt-8 shadow-2xl"
//         >
//           <StatBar label="事业与财富" value={stats.car} color="text-blue-400" />
//           <StatBar label="家庭与羁绊" value={stats.fam} color="text-pink-400" />
//           <StatBar label="健康与体魄" value={stats.hea} color="text-green-400" />
//           <StatBar label="内心幸福感" value={stats.hap} color="text-yellow-400" />
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 2 }}
//           className="text-white/70 text-sm leading-relaxed text-center mb-12 font-display tracking-widest"
//         >
//           {summaryText}
//         </motion.p>

//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 3 }}
//           onClick={onRestart}
//           className="w-full py-4 rounded-full bg-white text-black font-bold tracking-widest hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
//         >
//           重溯时光
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

import React from 'react';

interface ResultScreenProps {
  stats: { car: number; fam: number; hea: number; hap: number };
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onRestart }) => {
  // 综合评分计算
  const totalScore = stats.car + stats.fam + stats.hea + stats.hap;

  let summaryTitle = "";
  let summaryText = "";

  // 简单的结局判词系统
  if (totalScore >= 210) {
    summaryTitle = "璀璨人生";
    summaryText = "你走过了一段极尽绚烂的旅程。有些遗憾，但更多的是无悔。你的名字，成为了别人仰望的星空。";
  } else if (totalScore >= 180) {
    summaryTitle = "平凡可贵";
    summaryText = "没有惊天动地，但也避开了大风大浪。你守护住了属于自己的小确幸，这已经是最大的成功。";
  } else if (totalScore >= 160) {
    summaryTitle = "跌宕起伏";
    summaryText = "命运对你并不温柔，你吃过苦，流过泪。但那些杀不死你的，最终让你拥有了最厚重的灵魂。";
  } else {
    summaryTitle = "意难平";
    summaryText = "如果能重来一次，一定要对自己好一点。这辈子太辛苦了，下辈子，记得多看看沿途的风景。";
  }

  // 属性条组件 (使用安全的 Tailwind 类名传递方式)
  const StatBar = ({ label, value, textColor, bgColor }: { label: string, value: number, textColor: string, bgColor: string }) => {
    // 确保进度条在 0-100 之间，不会爆表
    const widthPercent = Math.min(100, Math.max(0, value));
    return (
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex justify-between text-xs font-display tracking-widest">
          <span className="text-white/80">{label}</span>
          <span className={textColor}>{value}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${bgColor} transition-all duration-1000 ease-out`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-8 animate-[fadeIn_1s_ease-in-out]">
      <div className="w-full max-w-sm">
        <h2 className="text-4xl font-display text-white text-center mb-2 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          {summaryTitle}
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 mt-8 shadow-2xl">
          <StatBar label="事业与财富" value={stats.car} textColor="text-blue-400" bgColor="bg-blue-400" />
          <StatBar label="家庭与羁绊" value={stats.fam} textColor="text-pink-400" bgColor="bg-pink-400" />
          <StatBar label="健康与体魄" value={stats.hea} textColor="text-green-400" bgColor="bg-green-400" />
          <StatBar label="内心幸福感" value={stats.hap} textColor="text-yellow-400" bgColor="bg-yellow-400" />
        </div>

        <p className="text-white/70 text-sm leading-relaxed text-center mb-12 font-display tracking-widest px-2">
          {summaryText}
        </p>

        <button
          onClick={onRestart}
          className="w-full py-4 rounded-full bg-white text-black font-bold tracking-widest hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          重溯时光
        </button>
      </div>
    </div>
  );
};