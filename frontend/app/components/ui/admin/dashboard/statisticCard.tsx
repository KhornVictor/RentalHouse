"use client";

import { useMemo } from "react";
import { StatCard } from "./dashboard.types";

type StatisticCardProps = {
  statCards: StatCard[];
};

export default function StatisticCard({ statCards }: StatisticCardProps) {
  const keyed = useMemo(
    () => statCards.map((card, index) => ({ ...card, _key: `stat-${index}` })),
    [statCards],
  );

  const extractPercentage = (value: string): number => {
    const match = value.match(/(\d+)/);
    return match ? Math.min(parseInt(match[0]), 100) : 0;
  };

  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-4">
      {keyed.map((card) => {
        return (
          <div
            key={card._key}
            className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <card.icon className="text-slate-600 dark:text-slate-400 text-lg" />
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">{card.value}</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-400 rounded-full to-emerald-500 transition-all duration-500"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
