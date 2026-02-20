"use client";

import { useRouter } from "next/navigation";
import { listItems } from "./router";

export default function SideBar(
  { user, selected, onSelect }: { user: any, selected: string, onSelect: (selected: string) => void }
) {
  const router = useRouter();
  const title = "RentalHouse";
  return (
    <aside className="w-full h-full flex-col gap-6 bg-slate-900 text-slate-100 shadow-2xl lg:flex">
      <div className="flex items-left gap-1 px-6 pt-6 flex-col">
          <span className="gradient-text text-2xl font-black">{title}</span>
          <p className="text-sm font-extralight text-gray-500">{user?.firstname} {user?.lastname}</p>
      </div><hr className="text-slate-700"/>

      <nav className="flex flex-1 flex-col gap-4 px-4">
        {listItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition-all ease-in-out duration-100 ${
              selected === item.name
                ? "bg-white text-slate-900 pt-4 pb-4"
                : "text-slate-300 hover:bg-white/10"
            }`}
            onClick={() => onSelect(item.name)}
          >
            <span className="h-6 w-6 rounded-full flex justify-center items-center"> 
                {item.icon}
            </span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="px-6 pb-6">
        <button
          onClick={() => {
            router.push("/page/login");
          }}
          className="flex w-full bg-gray-200/10 hover:bg-linear-to-r border hover:border-0  hover:from-cyan-400 hover:via-purple-400 hover:to-orange-400 items-center justify-center gap-2 rounded-xl font-bold px-4 py-2 text-sm text-slate-200 transition druration-300"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
