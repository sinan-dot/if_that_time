import React, { useEffect, useMemo, useState } from 'react';

interface ResultScreenProps {
  stats: { car: number; fam: number; hea: number; hap: number };
  choiceHistory?: string[];
  onRestart: () => void;
}

type StatKey = keyof ResultScreenProps['stats'];

const STAT_THEMES: Record<StatKey, { high: string; low: string }> = {
  car: {
    high: '你把许多个清晨献给了远方，也把野心磨成了手心里的光。',
    low: '财富始终只是途经你的一阵风，没有真正停靠太久。',
  },
  fam: {
    high: '人海散去之后，仍有人把你的名字轻轻放在灯火里。',
    low: '有些黄昏没能等到你回头，门前的灯也暗过几次。',
  },
  hea: {
    high: '你的身体替你记住了风雨，也陪你穿过很长很长的路。',
    low: '只是这一路太用力，体魄在无声处替你偿还了代价。',
  },
  hap: {
    high: '你仍然保住了一小块柔软的内心，像黑夜里没有熄灭的火。',
    low: '快乐曾被你轻轻搁置，久到几乎忘了它最初的模样。',
  },
};

function normalizeStats(stats: ResultScreenProps['stats']) {
  return {
    car: Number.isFinite(stats?.car) ? stats.car : 0,
    fam: Number.isFinite(stats?.fam) ? stats.fam : 0,
    hea: Number.isFinite(stats?.hea) ? stats.hea : 0,
    hap: Number.isFinite(stats?.hap) ? stats.hap : 0,
  };
}

function buildClosingLine(stats: ResultScreenProps['stats'], choiceHistory: string[] = []) {
  const safeStats = normalizeStats(stats);
  const statEntries = Object.entries(safeStats) as Array<[StatKey, number]>;
  const [highestKey] = statEntries.reduce((best, item) => (item[1] > best[1] ? item : best), statEntries[0]);
  const [lowestKey] = statEntries.reduce((worst, item) => (item[1] < worst[1] ? item : worst), statEntries[0]);
  const rememberedChoice = choiceHistory[Math.max(0, Math.floor(choiceHistory.length * 0.68) - 1)] || choiceHistory[0];
  const highestLine = STAT_THEMES[highestKey].high;
  const lowestLine = STAT_THEMES[lowestKey].low;

  if (rememberedChoice && safeStats.hap + safeStats.fam >= safeStats.car + safeStats.hea) {
    return `你仍记得「${rememberedChoice}」那一刻。${highestLine}`;
  }

  if (rememberedChoice) {
    return `「${rememberedChoice}」最终留在了你心里。${lowestLine}`;
  }

  return safeStats.hap + safeStats.fam >= safeStats.car + safeStats.hea
    ? `你把温柔留给了回望。${highestLine}`
    : `你把沉默留给了岁月。${lowestLine}`;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  stats,
  choiceHistory = [],
  onRestart,
}) => {
  const safeStats = normalizeStats(stats);
  const replayLines = useMemo(() => {
    const lines = choiceHistory.filter(Boolean);
    return lines.length ? lines : ['有些抉择没有留下名字，却依旧悄悄改变了你的一生。'];
  }, [choiceHistory]);
  const closingLine = useMemo(() => buildClosingLine(safeStats, replayLines), [replayLines, safeStats]);

  const [visibleCount, setVisibleCount] = useState(1);
  const [showClosing, setShowClosing] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    setVisibleCount(Math.max(1, Math.min(1, replayLines.length)));
    setShowClosing(false);
    setShowSignature(false);
    setShowRestart(false);

    const timers: number[] = [];
    const introDelay = 640;
    const stepDelay = replayLines.length > 10 ? 620 : 760;

    replayLines.slice(1).forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleCount(index + 2), introDelay + index * stepDelay));
    });

    const closingDelay = introDelay + Math.max(0, replayLines.length - 1) * stepDelay + 1100;
    timers.push(window.setTimeout(() => setShowClosing(true), closingDelay));
    timers.push(window.setTimeout(() => setShowSignature(true), closingDelay + 1200));
    timers.push(window.setTimeout(() => setShowRestart(true), closingDelay + 1950));

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [replayLines]);

  const visibleWindowStart = Math.max(0, visibleCount - 5);
  const visibleLines = replayLines.slice(visibleWindowStart, visibleCount);
  const liftOffset = Math.min(Math.max(0, visibleCount - 1) * 10, 44);
  const statText = `财富 ${safeStats.car}·羁绊 ${safeStats.fam}·体魄 ${safeStats.hea}·内心 ${safeStats.hap}`;

  return (
    <div className="absolute inset-0 z-[100] overflow-hidden bg-[#010101] text-white">
      <style>{`
        @keyframes endingLineFade {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes endingReveal {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.055),rgba(255,255,255,0)_30%)]" />
      <div className="absolute left-1/2 top-[15%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />
      <div className="absolute bottom-[-9rem] left-1/2 h-[22rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-100/[0.02] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.02)_34%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.6)_0.65px,transparent_0.7px)] [background-size:18px_18px]" />

      <div className="relative z-10 flex h-full flex-col px-7 pb-10 pt-12 text-center md:px-10 md:pt-16">
        <div className="pointer-events-none mb-6 flex flex-col items-center gap-3">
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <p className="font-serif text-[11px] tracking-[0.45em] text-white/28 md:text-xs">
            回望此生
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-hidden">
          <div className="w-full max-w-[92%] overflow-hidden md:max-w-[84%]">
            <div
              className="mx-auto flex min-h-[22rem] max-w-[16.75rem] flex-col justify-center gap-6 transition-transform duration-[1800ms] ease-out md:min-h-[24rem] md:max-w-[28rem] md:gap-7"
              style={{ transform: `translateY(-${liftOffset}px)` }}
            >
              {visibleLines.map((line, index) => {
                const age = visibleLines.length - index - 1;
                const opacity = age === 0
                  ? 0.98
                  : age === 1
                    ? 0.78
                    : age === 2
                      ? 0.58
                      : age === 3
                        ? 0.4
                        : 0.24;
                const blur = Math.min(age * 0.7, 2.2);
                const drift = -Math.min(age * 8, 28);

                return (
                  <p
                    key={`${line}-${visibleWindowStart + index}`}
                    className="mx-auto max-w-full break-words text-center font-serif text-[16px] leading-[2.15] tracking-[0.1em] text-white/82 md:text-[23px] md:leading-[2.22]"
                    style={{
                      opacity,
                      filter: `blur(${blur}px)`,
                      transform: `translateY(${drift}px)`,
                      textShadow: '0 0 18px rgba(255,255,255,0.06)',
                      animation: 'endingLineFade 1500ms ease both',
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[92%] flex-col items-center gap-7 pb-2 pt-6 md:max-w-[84%]">
          <p
            className={`max-w-[16.75rem] text-center font-serif text-[12px] leading-[2.1] tracking-[0.1em] text-white/54 md:max-w-[28rem] md:text-[15px] md:leading-[2.12] ${
              showClosing ? 'opacity-100' : 'opacity-0'
            }`}
            style={showClosing ? { animation: 'endingReveal 1600ms ease both' } : undefined}
          >
            {closingLine}
          </p>

          <div
            className={`whitespace-nowrap text-center font-serif text-[10px] tracking-[0.18em] text-white/33 md:text-xs md:tracking-[0.24em] ${
              showSignature ? 'opacity-100' : 'opacity-0'
            }`}
            style={showSignature ? { animation: 'endingReveal 1400ms ease both' } : undefined}
          >
            {statText}
          </div>

          <button
            onClick={onRestart}
            className={`rounded-full border border-white/16 bg-white/[0.025] px-8 py-3 font-serif text-sm tracking-[0.38em] text-white/74 backdrop-blur-xl transition-all duration-700 hover:border-white/36 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_28px_rgba(255,255,255,0.12)] active:scale-95 ${
              showRestart ? 'opacity-100' : 'opacity-0'
            }`}
            style={showRestart ? { animation: 'endingReveal 1400ms ease both' } : undefined}
          >
            重溯时光
          </button>
        </div>
      </div>
    </div>
  );
};
