export default function Feature() {
  const features = [
    {
      title: "Wide Range of Rental Properties",
      description:
        "Our platform offers a wide range of rental properties to suit your needs. Whether you're looking for a cozy apartment or a spacious house, we have it all. With our user-friendly interface, you can easily search, filter, and find the perfect rental home that fits your lifestyle and budget.",
    },
    {
      title: "Effortless Rental Management",
      description:
        "Say goodbye to the hassle of managing your rentals. Our platform provides powerful tools to help you keep track of your rental properties, manage your leases, and stay organized. With our intuitive dashboard, you can easily access all the information you need to manage your rentals efficiently.",
    },
    {
      title: "Join Our Community",
      description:
        "Join our community of satisfied renters and landlords today. Experience the convenience and simplicity of our rental platform and find your perfect rental home with ease.",
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(249,115,22,0.15),transparent_40%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-purple-200">
            Features
          </span>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            A modern platform built for confident rental decisions
          </h2>
          <p className="text-lg text-slate-300">
            Everything you need to discover, manage, and optimize your rental
            portfolio in one place.
          </p>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass-surface rounded-2xl p-6 transition hover:-translate-y-1 hover:border-white/30"
              >
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-8 top-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-10 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
            <img
              className="h-105 w-full rounded-2xl object-cover"
              src="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
