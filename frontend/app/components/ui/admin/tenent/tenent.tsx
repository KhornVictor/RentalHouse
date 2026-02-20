"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/components/ui/admin/backend/user";
import { getBills, getBillsByMonth } from "@/app/components/ui/admin/backend/bill";
import { getRooms } from "@/app/components/ui/admin/backend/room";
import { getLeases } from "@/app/components/ui/admin/backend/lease";
import NavigationBarHome from "@/app/components/ui/admin/navigationBarHome";
import TableData from "@/app/components/ui/admin/tenent/tableData";
import SideBarData from "@/app/components/ui/admin/tenent/sideBarData";
import User from "@/app/types/user";
import Bill from "@/app/types/bill";
import Lease from "@/app/types/lease";
import Room from "@/app/types/room";
import { get } from "http";

export default function Tenent({
  user,
  onAvatarClick,
}: {
  user: any;
  onAvatarClick?: () => void;
}) {
  const formatted = new Date().toISOString().slice(0, 7);
  const [tenents, setTenents] = useState<User[]>([]);
  const [leases, setLeases] = useState<Lease[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const [tenentData, leaseData, roomData, billData] = await Promise.all([
          getUsers(),
          getLeases(),
          getRooms(),
          getBillsByMonth(formatted),
        ]);
        setTenents(
          tenentData.filter(
            (user) => user.role.toLowerCase() === "tenant",
          ) as User[],
        );
        setLeases(leaseData as Lease[]);
        setRooms(roomData as Room[]);
        setBills(billData as Bill[]);
        setSelectedUserId((prev) => prev ?? tenentData[0]?.userid ?? null);
        setError(null);
      } catch (err) {
        setError("Failed to load Tenents. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // console.log("Bills", bills);

    fetchUsers();
  }, []);

  console.log("Tenents:",  bills);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading Tenents...</p>
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

  const selectedTenent = tenents.find(
    (tenent) => tenent.userid === selectedUserId,
  );
  const selectedLease = leases.find(
    (lease) => lease.tenantid === selectedTenent?.userid,
  );
  const selectedRoom = rooms.find(
    (room) => room.roomid === selectedLease?.roomid,
  );
  const latestBill = bills.find(
    (bill) => bill.leaseid === selectedTenent?.userid,
  );

  return (
    <div className="w-full h-screen flex flex-col lg:px-10 px-6 py-6 overflow-hidden scrollbar-slate">
      <div className="w-full mb-6">
        <NavigationBarHome user={user} onAvatarClick={onAvatarClick} />
      </div>

      <div className="w-full h-full flex overflow-hidden shadow-2xl shadow-slate-600/80 flex-row rounded-lg bg-slate-900/80 border border-slate-400/50">
        <div className="h-full rounded-lg w-2/3">
          {tenents.length === 0 ? (
            <div className="w-full bg-gray-50 overflow-y-auto rounded-lg text-center">
              <p className="text-gray-600 text-lg">No Tenents found</p>
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto scrollbar-slate">
              <TableData
                tenants={tenents}
                selectedTenantId={selectedUserId ?? undefined}
                onSelectTenant={(tenant) =>
                  setSelectedUserId(tenant.userid ?? null)
                }
              />
            </div>
          )}
        </div>

        <div className="h-full bg-slate-900/90 overflow-y-auto rounded-lg w-1/3 shadow-lg shadow-slate-800/90">
          <SideBarData
            tenant={selectedTenent}
            lease={selectedLease}
            room={selectedRoom}
            latestBill={latestBill}
          />
        </div>
      </div>
    </div>
  );
}
