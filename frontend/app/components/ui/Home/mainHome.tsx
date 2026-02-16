"use client";

import { useEffect, useState } from "react";
import MainContent from "./content";
import SideBar from "./sideBar";

type AuthUser = {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  email: string;
  avatar: string;
};

type MainHomeProps = {
  user?: AuthUser | null;
};

export default function MainHome({ user }: MainHomeProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(user ?? null);
  const [selected, setSelected] = useState<string>("Dashboard");

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setAuthUser(JSON.parse(stored));
      } catch {
        setAuthUser(null);
      }
    }
  }, []);

  return (
    <div className="w-full h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <div className="hidden w-64 h-screen flex-col gap-6 bg-slate-900 text-slate-100 shadow-2xl lg:flex fixed">
          <SideBar user={authUser} selected={selected} onSelect={(selected) => setSelected(selected)} />
        </div>
        <div className="ml-64 flex-1 p-1 overflow-y-scroll scrollbar-slate">
          <MainContent auth={authUser} selected={selected} />
        </div>
      </div>
    </div>
  );
}
