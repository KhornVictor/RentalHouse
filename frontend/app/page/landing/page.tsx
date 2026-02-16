"use client";

import { useEffect, useState } from "react";
import Greeting from "../../components/ui/landing/greeting";
import Feature from "../../components/ui/landing/feature";
import Pricing from "../../components/ui/landing/priscing";
import Fqa from "../../components/ui/landing/fqa";
import Footer from "../../components/ui/landing/footer";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`w-300 h-300 absolute top-100 -left-150 opacity-100 cloud-motion ${
          isScrolled ? "cloud-out" : ""
        }`}
      >
        <img
          src="https://www.freeiconspng.com/uploads/cloud-transparent-png-0.png"
          alt=""
        />
      </div>
      <div
        className={`w-300 h-300 absolute top-100 -right-150 opacity-100 cloud-motion ${
          isScrolled ? "cloud-out" : ""
        }`}
      >
        <img
          src="https://www.freeiconspng.com/uploads/cloud-transparent-png-0.png"
          alt=""
        />
      </div>
      <Greeting />
      <Feature />
      <Pricing />
      <Fqa />
      <Footer />
    </div>
  );
}
