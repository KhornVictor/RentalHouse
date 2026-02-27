"use client";

import { useEffect, useState } from "react";
import User from "@/app/types/user";


const greeting = ({ time }: any) => {
  if (time < 12) return "Morning";
  else if (time < 18) return "Afternoon";
  else return "Evening";
};

type NavigationBarHomeProps = {
  user: User | null;
  onAvatarClick?: () => void;
};

export default function NavigationBarHome({
  user,
  onAvatarClick,
}: NavigationBarHomeProps) {
  const [greetingText, setGreetingText] = useState("Welcome");

  useEffect(() => {
    setGreetingText(greeting({ time: new Date().getHours() }));
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/80 px-4 py-4 shadow-lg backdrop-blur-md dark:bg-slate-900/70 shadow-slate-800/90">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <span
            onClick={onAvatarClick}
            className="text-sm font-semibold cursor-pointer"
          >
            <img
              src={
                user?.avatar ||
                "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-617.jpg?semt=ais_user_personalization&w=740&q=80"
              }
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">
            {user?.username?.toUpperCase() || "GUEST"},{" "}
            {greetingText}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user?.role || "Guest"}
          </p>
        </div>
      </div>
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <span className="text-xs text-slate-400">Search here</span>
          <div className="ml-auto h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
