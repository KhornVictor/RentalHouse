"use client";

import { useEffect, useMemo, useState } from "react";
import NavigationBarHome from "../navigationBarHome";
import Room from "@/app/types/room";
import Lease from "@/app/types/lease";
import User from "@/app/types/user";
import { getRooms } from "../backend/room";
import { getLeases } from "../backend/lease";
import { getUsers } from "../backend/user";

type RoomWithDetails = Room & {
  tenantName: string;
  activeLease: boolean;
};

export default function Rooms({
  user,
  onAvatarClick,
}: {
  user: User | null;
  onAvatarClick?: () => void;
}) {
  const [rooms, setRooms] = useState<RoomWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "occupied" | "vacant"
  >("all");

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const [roomData, leaseData, userData] = await Promise.all([
          getRooms(),
          getLeases(),
          getUsers(),
        ]);

        const now = new Date();

        const enrichedRooms = (roomData as Room[]).map((room) => {
          const activeLease = (leaseData as Lease[]).find((lease) => {
            if (lease.roomid !== room.roomid) return false;
            if (!lease.moveoutdate) return true;
            return new Date(lease.moveoutdate) >= now;
          });

          const tenant = (userData as User[]).find(
            (item) => item.userid === activeLease?.tenantid,
          );

          return {
            ...room,
            activeLease: Boolean(activeLease),
            tenantName: tenant
              ? `${tenant.firstname} ${tenant.lastname}`
              : "No current tenant",
          };
        });

        setRooms(enrichedRooms);
        setError(null);
      } catch (err) {
        setError("Failed to load room data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  const filteredRooms = useMemo(() => {
    let result = rooms;

    if (searchTerm) {
      const normalized = searchTerm.toLowerCase();
      result = result.filter(
        (room) =>
          room.roomnumber.toLowerCase().includes(normalized) ||
          room.tenantName.toLowerCase().includes(normalized),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (room) => room.status.toLowerCase() === statusFilter,
      );
    }

    return result;
  }, [rooms, searchTerm, statusFilter]);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(
    (room) => room.status.toLowerCase() === "occupied",
  ).length;
  const vacantRooms = rooms.filter(
    (room) => room.status.toLowerCase() === "vacant",
  ).length;
  const totalMonthlyRent = filteredRooms.reduce(
    (sum, room) => sum + room.rentamount,
    0,
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading Rooms...</p>
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

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Total Rooms
          </p>
          <p className="text-3xl font-bold text-white">{totalRooms}</p>
        </div>

        <div className="bg-linear-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">Occupied</p>
          <p className="text-3xl font-bold text-green-200">{occupiedRooms}</p>
        </div>

        <div className="bg-linear-to-br from-cyan-900 to-cyan-800 rounded-lg p-6 border border-cyan-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">Vacant</p>
          <p className="text-3xl font-bold text-cyan-200">{vacantRooms}</p>
        </div>

        <div className="bg-linear-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-500/30 shadow-lg">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Filtered Rent
          </p>
          <p className="text-3xl font-bold text-purple-200">
            ${totalMonthlyRent.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="w-full mb-6 flex flex-col sm:flex-row gap-4">
        <label htmlFor="roomSearch" className="sr-only">
          Search Room
        </label>
        <input
          id="roomSearch"
          type="text"
          placeholder="Search by room or tenant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        <label htmlFor="roomStatusFilter" className="sr-only">
          Filter by Status
        </label>
        <select
          id="roomStatusFilter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "occupied" | "vacant")
          }
          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          title="Filter by room status"
        >
          <option value="all">All Status</option>
          <option value="occupied">Occupied</option>
          <option value="vacant">Vacant</option>
        </select>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg shadow-2xl shadow-slate-600/80 border border-slate-400/50 flex flex-col bg-slate-900">
        <div className="overflow-y-auto scrollbar-slate flex-1">
          {filteredRooms.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-lg">No rooms found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-950 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Room
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Capacity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Tenant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Rent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms
                  .slice()
                  .sort((a, b) => a.roomnumber.localeCompare(b.roomnumber))
                  .map((room, index) => (
                    <tr
                      key={room.roomid}
                      className={`border-b border-slate-800 transition-all duration-300 ease-in-out ${
                        index % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"
                      } hover:bg-slate-800/60`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                        {room.roomnumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.capacity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.tenantName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        ${room.rentamount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            room.status.toLowerCase() === "occupied"
                              ? "bg-green-800 text-green-100"
                              : "bg-cyan-800 text-cyan-100"
                          }`}
                        >
                          {room.status.charAt(0).toUpperCase() +
                            room.status.slice(1)}
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
