"use client";

import { useEffect, useState } from "react";
import NavigationBarHome from "../navigationBarHome";
import User from "@/app/types/user";
import Bill from "@/app/types/bill";
import Lease from "@/app/types/lease";
import Room from "@/app/types/room";
import { getBills } from "../backend/bill";
import { getLeases } from "../backend/lease";
import { getRooms } from "../backend/room";
import { getUsers } from "../backend/user";

type BillingWithDetails = Bill & {
  tenantName: string;
  roomNumber: string;
  rentAmount: number;
};

export default function Billing({
  user,
  onAvatarClick,
}: {
  user: any;
  onAvatarClick?: () => void;
}) {
  const [bills, setBills] = useState<BillingWithDetails[]>([]);
  const [filteredBills, setFilteredBills] = useState<BillingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">(
    "all",
  );
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true);
        const [billData, leaseData, roomData, userData] = await Promise.all([
          getBills(),
          getLeases(),
          getRooms(),
          getUsers(),
        ]);

        const enrichedBills = (billData as Bill[]).map((bill) => {
          const lease = (leaseData as Lease[]).find(
            (l) => l.leaseid === bill.leaseid,
          );
          const room = (roomData as Room[]).find(
            (r) => r.roomid === lease?.roomid,
          );
          const tenant = (userData as User[]).find(
            (u) => u.userid === lease?.tenantid,
          );

          return {
            ...bill,
            tenantName: tenant
              ? `${tenant.firstname} ${tenant.lastname}`
              : "Unknown",
            roomNumber: room?.roomnumber || "N/A",
            rentAmount: room?.rentamount || 0,
          };
        });

        setBills(enrichedBills);
        setFilteredBills(enrichedBills);
        setError(null);
      } catch (err) {
        setError("Failed to load billing data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  // Filter bills based on search term, payment status, and month
  useEffect(() => {
    let result = bills;

    if (searchTerm) {
      result = result.filter(
        (bill) =>
          bill.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (paymentFilter !== "all") {
      result = result.filter((bill) => bill.paymentstatus === paymentFilter);
    }

    if (monthFilter) {
      result = result.filter((bill) =>
        bill.billingmonth.startsWith(monthFilter),
      );
    }

    setFilteredBills(result);
  }, [searchTerm, paymentFilter, monthFilter, bills]);

  const calculateTotal = (bill: BillingWithDetails) => {
    const electricityCharge = bill.electricityunits * 0.25;
    const waterCharge = bill.waterunits * 0.15;
    return bill.rentAmount + electricityCharge + waterCharge;
  };

  const totalRevenue = filteredBills.reduce(
    (sum, bill) => sum + calculateTotal(bill),
    0,
  );
  const paidAmount = filteredBills
    .filter((bill) => bill.paymentstatus === "paid")
    .reduce((sum, bill) => sum + calculateTotal(bill), 0);
  const unpaidAmount = filteredBills
    .filter((bill) => bill.paymentstatus === "unpaid")
    .reduce((sum, bill) => sum + calculateTotal(bill), 0);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading Billing Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col lg:px-10 px-6 py-6 overflow-hidden scrollbar-slate">
      <div className="w-full mb-6">
        <NavigationBarHome user={user} onAvatarClick={onAvatarClick} />
      </div>

      {/* Summary Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-white">
            ${totalRevenue.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {filteredBills.length} bills
          </p>
        </div>

        <div className="bg-linear-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Paid Amount
          </p>
          <p className="text-3xl font-bold text-green-200">
            ${paidAmount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {filteredBills.filter((b) => b.paymentstatus === "paid").length}{" "}
            paid
          </p>
        </div>

        <div className="bg-linear-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Unpaid Amount
          </p>
          <p className="text-3xl font-bold text-red-200">
            ${unpaidAmount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {filteredBills.filter((b) => b.paymentstatus === "unpaid").length}{" "}
            unpaid
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full mb-6 flex flex-col sm:flex-row gap-4">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by tenant name or room..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        <label htmlFor="monthFilter" className="sr-only">
          Filter by Month
        </label>
        <input
          id="monthFilter"
          type="text"
          placeholder="YYYY-MM"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          title="Filter by billing month in YYYY-MM format"
        />

        <label htmlFor="statusFilter" className="sr-only">
          Payment Status
        </label>
        <select
          id="statusFilter"
          value={paymentFilter}
          onChange={(e) =>
            setPaymentFilter(e.target.value as "all" | "paid" | "unpaid")
          }
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          title="Filter by payment status"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Bills Table */}
      <div className="flex-1 overflow-hidden rounded-lg shadow-2xl shadow-slate-600/80 border border-slate-400/50 flex flex-col bg-slate-900">
        <div className="overflow-y-auto scrollbar-slate flex-1">
          {filteredBills.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-lg">No bills found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-950 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Tenant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Room
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Billing Month
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Rent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Electricity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Water
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBills
                  .sort((a, b) => {
                    const dateA = new Date(a.billingmonth);
                    const dateB = new Date(b.billingmonth);
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((bill, index) => (
                    <tr
                      key={bill.billid}
                      className={`border-b border-slate-800 transition-all duration-300 ease-in-out ${
                        index % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"
                      } hover:bg-slate-800/60`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                        {bill.tenantName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {bill.roomNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(bill.billingmonth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        ${bill.rentAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {bill.electricityunits} units
                        <br />
                        <span className="text-xs text-gray-400">
                          (${(bill.electricityunits * 0.25).toFixed(2)})
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {bill.waterunits} units
                        <br />
                        <span className="text-xs text-gray-400">
                          (${(bill.waterunits * 0.15).toFixed(2)})
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ${calculateTotal(bill).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            bill.paymentstatus === "paid"
                              ? "bg-green-800 text-green-100"
                              : "bg-red-800 text-red-100"
                          }`}
                        >
                          {bill.paymentstatus.charAt(0).toUpperCase() +
                            bill.paymentstatus.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
