"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "../../../routers/routers";
import ThemeToggle from "../ThemeToggle";

export default function NavigationBarLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const title = "RentalHouse";

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-black/10 dark:border-white/10 light:bg-slate-100/60 dark:bg-slate-950/60 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href={routes.home.path}
          className="text-xl font-semibold hover:scale-105 transition-all ease-in-out duration-300 text-white dark:text-white"
        >
          <span className="gradient-text">{title}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium dark:text-slate-100 text-slate-900 transition duration-300 hover:scale-105 light:hover:text-black dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href={routes.login.path}
            className="rounded-full px-4 py-2 text-sm font-medium dark:text-slate-200 text-slate-700 transition hover:scale-110 hover:bg-white/10 dark:hover:bg-white/10"
          >
            {routes.login.name}
          </Link>
          <Link
            href={routes.signup.path}
            className="rounded-full bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
          >
            {routes.signup.name}
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Toggle mobile menu"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-6 dark:bg-slate-200 bg-slate-800"></span>
            <span className="block h-0.5 w-6 dark:bg-slate-200 bg-slate-800"></span>
            <span className="block h-0.5 w-6 dark:bg-slate-200 bg-slate-800"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-4 border-t border-white/10 dark:border-white/10 bg-slate-950 dark:bg-slate-950 px-6 py-6 md:hidden">
          <Link
            href="#features"
            className="block dark:text-slate-200 text-slate-700"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="block dark:text-slate-200 text-slate-700"
          >
            Pricing
          </Link>
          <hr />

          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>

          <Link
            href={routes.login.path}
            className="block text-left text-slate-200 dark:text-slate-200"
          >
            {routes.login.name}
          </Link>
          <Link
            href={routes.signup.path}
            className="block rounded-full bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 py-3 text-center text-sm font-semibold text-slate-900"
          >
            {routes.signup.name}
          </Link>
        </div>
      )}
    </nav>
  );
}
