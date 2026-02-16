import React from "react";
import NavigationBarHome from "../navigationBarHome";

type AuthUser = {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  email: string;
  avatar: string;
};

type DashboardProps = {
  user: AuthUser | null;
  onAvatarClick?: () => void;
};

const statCards = [
  {
    label: "Active Employees",
    value: "1,081",
    delta: "+5% than last week",
  },
  {
    label: "Total Employees",
    value: "2,300",
    delta: "+3% than last week",
  },
  {
    label: "Total Tasks",
    value: "34",
    delta: "+1% than yesterday",
  },
  {
    label: "Attendance",
    value: "+91",
    delta: "Just updated",
  },
];

const departmentCards = [
  "Engineering and Development",
  "Marketing and Sales",
  "Accounting and Finance",
  "Human Resources",
  "Product and Design",
];

const attendanceRows = [
  {
    name: "Syed Mahmudul Hasan",
    role: "Flutter Developer",
    checkIn: "09:36",
    checkOut: "18:55",
    work: "08hr 02min",
    break: "45min",
    extra: "+10min",
    status: "Late",
  },
  {
    name: "Kamrul Hasan",
    role: "Back-End Developer",
    checkIn: "09:00",
    checkOut: "18:30",
    work: "09hr 30min",
    break: "05min",
    extra: "--",
    status: "In time",
  },
  {
    name: "Afiqa Roky",
    role: "Front-End Developer",
    checkIn: "09:36",
    checkOut: "18:55",
    work: "09hr 02min",
    break: "30min",
    extra: "--",
    status: "In time",
  },
  {
    name: "Afsan Rahmanullah",
    role: "Full-Stack Developer",
    checkIn: "09:10",
    checkOut: "18:55",
    work: "07hr 02min",
    break: "45min",
    extra: "--",
    status: "In time",
  },
];

export default function Dashboard({ user, onAvatarClick }: DashboardProps) {
  return (
    <main className="flex-1 px-6 py-6 lg:px-10">
      <NavigationBarHome user={user} onAvatarClick={onAvatarClick} />

      <section className="mt-6 grid gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="flex items-center justify-between">
              <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold">{card.value}</p>
            <p className="mt-1 text-xs text-emerald-500">{card.delta}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {departmentCards.map((title) => (
          <div
            key={title}
            className="rounded-2xl bg-white px-4 py-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="mb-4 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {title}
            </h3>
            <p className="mt-3 text-xs text-emerald-600">Total Employee: 245</p>
            <p className="mt-1 text-xs text-slate-400">Updated 2 days ago</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Attendance</p>
            <p className="text-xs text-slate-400">15 Dec 2022</p>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Export
          </button>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto overflow-x-auto scrollbar-slate">
          <table className="w-full text-left text-xs text-slate-500 dark:text-slate-300">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800">
              <tr>
                <th className="pb-3">Employee</th>
                <th className="pb-3">Check In</th>
                <th className="pb-3">Check Out</th>
                <th className="pb-3">Working Hrs</th>
                <th className="pb-3">Break Time</th>
                <th className="pb-3">Extra Hrs</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRows.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {row.name}
                        </p>
                        <p className="text-xs text-slate-400">{row.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-200">
                    {row.checkIn}
                  </td>
                  <td className="py-4 text-slate-700 dark:text-slate-200">
                    {row.checkOut}
                  </td>
                  <td className="py-4">{row.work}</td>
                  <td className="py-4">{row.break}</td>
                  <td className="py-4">{row.extra}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                        row.status === "Late"
                          ? "bg-rose-100 text-rose-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
