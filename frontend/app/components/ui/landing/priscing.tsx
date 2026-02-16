export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/mo",
      summary: "For solo renters and first-time landlords.",
      features: [
        "Up to 2 listings",
        "Basic screening tools",
        "Email support",
        "Standard analytics",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      summary: "Best for growing portfolios and teams.",
      features: [
        "Up to 15 listings",
        "Priority screening",
        "Automated reminders",
        "Advanced analytics",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/mo",
      summary: "Built for agencies managing multiple buildings.",
      features: [
        "Unlimited listings",
        "Custom workflows",
        "Dedicated manager",
        "SLA support",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.2),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,116,144,0.25),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
            Pricing
          </span>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Flexible plans for every rental journey
          </h2>
          <p className="max-w-2xl text-lg text-slate-300">
            Choose a plan that fits your portfolio size. Upgrade any time as
            your rentals grow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex h-full flex-col justify-between rounded-3xl border px-6 py-8 backdrop-blur ${
                plan.highlight
                  ? "border-emerald-400/70 bg-white/10 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.8)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 right-6 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-900">
                  Most Popular
                </span>
              )}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="text-slate-300">{plan.summary}</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>
                <div className="h-px w-full bg-white/10" />
                <ul className="space-y-2 text-sm text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-8 w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                    : "border border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                }`}
                type="button"
              >
                Choose plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
