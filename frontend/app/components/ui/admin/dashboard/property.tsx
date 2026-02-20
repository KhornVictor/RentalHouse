"use client";

import { useMemo } from "react";
import { PropertyCard } from "./dashboard.types";

type PropertyProps = {
  propertyCards: PropertyCard[];
};

export default function Property({ propertyCards }: PropertyProps) {
  const keyed = useMemo(
    () =>
      propertyCards.map((card, index) => ({ ...card, _key: `prop-${index}` })),
    [propertyCards],
  );

  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {keyed.map((card) => (
        <div
          key={card._key}
          className="rounded-2xl bg-white px-4 py-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
        >
          <div className="mb-4 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {card.title}
          </h3>
          <p className="mt-3 text-xs text-emerald-600">{card.value}</p>
          <p className="mt-1 text-xs text-slate-400">{card.subtitle}</p>
        </div>
      ))}
    </section>
  );
}
