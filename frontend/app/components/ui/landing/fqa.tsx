export default function Fqa() {
  const faqs = [
    {
      question: "How do I list my rental property?",
      answer:
        "Create an account, add your property details, upload photos, and publish. You can edit or pause listings anytime.",
    },
    {
      question: "Can I manage multiple listings from one dashboard?",
      answer:
        "Yes. The dashboard lets you manage availability, pricing, and tenant requests across all properties.",
    },
    {
      question: "Do you offer tenant screening tools?",
      answer:
        "We provide screening support on Pro and Enterprise plans, including credit insights and rental history checks.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "You can pay with major cards and bank transfers. Enterprise customers can request invoicing.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.18),transparent_40%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
            FAQ
          </span>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Answers to keep you moving
          </h2>
          <p className="max-w-2xl text-lg text-slate-300">
            Quick guidance for renters, landlords, and teams getting started on
            RentalHouse.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                {faq.question}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-xs text-slate-300 transition group-open:rotate-45 group-open:border-cyan-400/60 group-open:text-cyan-200">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-slate-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
