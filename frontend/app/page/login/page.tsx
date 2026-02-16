"use client";

import Link from "next/link";
import { routes } from "../../routers/routers";
import LoginCard from "../../components/ui/login/loginCard";

export default function LoginPage() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <Link
        href={routes.home.path}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-slate-200 hover:bg-white/10 transition duration-300 hover:scale-105 z-10"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>
      <LoginCard />
    </section>
  );
}
