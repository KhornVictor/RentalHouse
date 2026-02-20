"use client";

import { useState } from "react";
import { BillingRow } from "./dashboard.types";

type TableProps = {
  billingRows: BillingRow[];
};

export default function Table({ billingRows }: TableProps) {
  const [ispaidButton, setIsPaidButton] = useState(false);

  return (
    <section className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-semibold">Recent Billing</p>
          <p className="text-xs text-slate-400">
            Utility bill activity overview
          </p>
        </div>
        <button
          onClick={() => setIsPaidButton(!ispaidButton)}
          className={`rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300 ${ispaidButton ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {ispaidButton ? "Unpaid" : "Paid"}
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="h-full">
          <table className="w-full text-left text-xs text-slate-500 dark:text-slate-300">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 bg-white dark:bg-slate-900">
              <tr>
                <th className="p-4 whitespace-nowrap text-white">Tenant</th>
                <th className="p-4 whitespace-nowrap text-white">Room</th>
                <th className="p-4 whitespace-nowrap text-white">
                  Billing Month
                </th>
                <th className="p-4 whitespace-nowrap text-white">
                  Electricity Units
                </th>
                <th className="p-4 whitespace-nowrap text-white">
                  Water Units
                </th>
                <th className="p-4 whitespace-nowrap text-white">Bill ID</th>
                <th className="p-4 whitespace-nowrap text-white">Amount</th>
                <th className="p-4 whitespace-nowrap text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-6 px-4 text-center text-slate-400 dark:text-slate-500"
                  >
                    No billing records found.
                  </td>
                </tr>
              ) : (
                billingRows.map((row) =>
                  (row.paymentStatus.toLowerCase() === (ispaidButton ? "unpaid" : "paid")) ? ( 
                    ((ispaidButton === false && row.billingMonth.slice(0, 7) === new Date().toISOString().slice(0, 7)) || (ispaidButton === true)) ? (
                    <tr
                      key={row.billId}
                      className={`border-b border-slate-100 dark:border-slate-800 ${row.billingMonth.slice(0, 7) === new Date().toISOString().slice(0, 7) ? "" : "bg-slate-50 dark:bg-slate-950"}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0">
                            <img
                              src={row.tenantAvatar}
                              alt={row.tenantName}
                              className="h-full w-full rounded-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_user_personalization&w=740&q=80";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                              {row.tenantName}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              Bill record
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-200">
                        {row.roomNumber}
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-200">
                        {row.billingMonth}
                      </td>
                      <td className="py-4 px-4">{row.electricityUnits}</td>
                      <td className="py-4 px-4">{row.waterUnits}</td>
                      <td className="py-4 px-4">#{row.billId}</td>
                      <td className="py-4 px-4">
                        {row.totalBills.toFixed(2)} $
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold inline-block ${
                            row.paymentStatus.toLowerCase() === "unpaid"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {row.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ) : null) : null
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
