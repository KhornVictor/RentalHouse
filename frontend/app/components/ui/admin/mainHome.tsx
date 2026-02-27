"use client";

import { useEffect, useState } from "react";
import MainContent from "./content";
import SideBar from "./sideBar";
import User from "@/app/types/user";

type MainHomeProps = {
  user?: User | null;
};

export default function MainHome({ user }: MainHomeProps) {
  const [authUser, setAuthUser] = useState<User | null>(user ?? null);
  const [selected, setSelected] = useState<string>("Dashboard");
  const [avatarDisplay, setAvatarDisplay] = useState<boolean>(false);

  const handleAvatarOpen = () => {
    setAvatarDisplay(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try { setAuthUser(JSON.parse(stored)); } 
      catch { setAuthUser(null); }
    }
  }, []);

  return (
    <div className="w-full h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <div className="hidden w-64 h-screen flex-col gap-6 bg-slate-900 text-slate-100 shadow-2xl lg:flex fixed">
          <SideBar
            user={authUser}
            selected={selected}
            onSelect={(selected) => setSelected(selected)}
          />
        </div>
        <div className="w-full h-screen ml-64 flex-1 p-1 bg-linear-to-br from-slate-600 via-slate-700 to-slate-800 overflow-hidden">
          <MainContent
            auth={authUser}
            selected={selected}
            onAvatarClick={handleAvatarOpen}
          />
        </div>
      </div>
      <div  
        onClick={() => {
          setAvatarDisplay(false);
        }}
        className={`w-full h-screen absolute z-50 flex items-center justify-center top-0 left-0 bg-linear-to-br from-slate-600/50 via-slate-900/50 to-slate-600/50 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          avatarDisplay ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <img
          src={`${authUser?.avatar || "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-617.jpg?semt=ais_user_personalization&w=740&q=80"}`}
          className={`w-150 h-150 rounded-3xl bg-red-400 object-cover shadow-2xl shadow-gray-500/50 transition-transform duration-200 ease-out ${
            avatarDisplay ? "scale-100" : "scale-95"
          }`}
          alt="Background"
        />
      </div>
    </div>
  );
}
