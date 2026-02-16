import { routes } from "@/app/routers/routers";
import Link from "next/link";

export default function Greeting() {

  const elements = [
    {
      name: "12k+",
      description: "Active listings"
    },
    {
      name: "98%",
      description: "Tenant satisfaction"
    },
    {
      name: "24/7",
      description: "Smart support"
    }
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[url('https://wallpapers.com/images/featured/apartment-bbiy2mat3yd31d3t.jpg')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-950/70 to-slate-900/40" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
          Rental Platform
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
          Discover a <span className="gradient-text">smarter</span> way to rent,
          manage, and grow.
        </h1>
        <p className="max-w-2xl text-lg text-slate-200">
          Find your perfect rental home with ease and manage listings from one
          beautiful dashboard. Built for renters, landlords, and agencies.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={routes.signup.path}>
            <button className="rounded-full bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110">
              Get Started
            </button>
          </Link>
          <Link href={routes.login.path}>
            <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
              Login
            </button>
          </Link>
        </div>
          <div className="grid w-full max-w-3xl grid-cols-3 gap-6 text-sm text-slate-300">
            {elements.map((element) => (
              <div key={element.name} className="glass-surface rounded-2xl px-4 py-3">
                <p className="text-lg font-semibold text-white">{element.name}</p>
                <p>{element.description}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
