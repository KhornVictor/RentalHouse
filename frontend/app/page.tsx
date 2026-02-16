import NavigationBarLanding from "./components/ui/landing/navigationBarLanding";
import LandingPage from "./page/landing/page";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-950">
      <nav className="w-full h-16 border-0 fixed top-0 z-50">
        <NavigationBarLanding />
      </nav>
      <main className="w-full h-full pt-16">
        <LandingPage />
      </main>
    </div>
  );
}
