const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "Integrations"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Guides", "Status"],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.15),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="text-xl font-semibold">
              <span className="gradient-text">RentalHouse</span>
            </div>
            <p className="text-sm text-slate-300">
              A modern rental platform for confident decisions, clear
              operations, and smoother tenant experiences.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Always on
              </span>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-white">
                {group.title}
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-slate-500 md:flex-row md:items-center">
          <p>© 2026 RentalHouse. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-slate-200">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-slate-200">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-slate-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
