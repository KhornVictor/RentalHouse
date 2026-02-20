"use client";

import { useEffect, useState } from "react";
import { getTotalTenants, getUsers } from "../backend/user";
import { getLeases } from "../backend/lease";
import { getRooms } from "../backend/room";
import { getBills } from "../backend/bill";
import { BillingRow, PropertyCard, StatCard } from "./dashboard.types";
import {
  FaMoneyBillTrendUp,
  FaMoneyBillWave,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa6";

const defaultStatCards: StatCard[] = [
  {
    label: "Total Tenants",
    icon: FaBuilding,
    value: "0",
    progress: 0,
  },
  {
    label: "Paid Bills",
    icon: FaMoneyBillWave,
    value: "0",
    progress: 0,
  },
  {
    label: "Active Leases",
    icon: FaChartLine,
    value: "0",
    progress: 0,
  },
  {
    label: "Room Occupancy",
    icon: FaMoneyBillTrendUp,
    value: "0%",
    progress: 0,
  },
];

const defaultPropertyCards: PropertyCard[] = [
  {
    title: "Occupied Rooms",
    value: "0",
    subtitle: "Current occupancy",
  },
  {
    title: "Vacant Rooms",
    value: "0",
    subtitle: "Ready for new leases",
  },
  {
    title: "Total Rooms",
    value: "0",
    subtitle: "Managed inventory",
  },
  {
    title: "Avg. Room Rent",
    value: "$0",
    subtitle: "Across all rooms",
  },
  {
    title: "Deposit Collected",
    value: "$0",
    subtitle: "From all leases",
  },
];

export default function useDashboardData() {
  const [statCards, setStatCards] = useState<StatCard[]>(defaultStatCards);
  const [propertyCards, setPropertyCards] =
    useState<PropertyCard[]>(defaultPropertyCards);
  const [billingRows, setBillingRows] = useState<BillingRow[]>([]);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const [totalTenants, leases, rooms, bills, users] = await Promise.all([
          getTotalTenants(),
          getLeases(),
          getRooms(),
          getBills(),
          getUsers(),
        ]);

        const occupiedRooms = rooms.filter(
          (room) => room.status.toLowerCase() === "occupied",
        ).length;
        const totalBills = bills.reduce((sum, bill) => {
          const rentPrice =
            rooms.find(
              (room) =>
                room.roomid ===
                leases.find((lease) => lease.leaseid === bill.leaseid)?.roomid,
            )?.rentamount ?? 0;
          const electricityRate =
            (bill as { electricityrate?: number }).electricityrate ?? 0;
          const waterRate = (bill as { waterrate?: number }).waterrate ?? 0;
          return (
            sum +
            (rentPrice +
              bill.electricityunits * electricityRate +
              bill.waterunits * waterRate)
          );
        }, 0);
        const totalpaidBills = bills
          .filter((bill) => bill.paymentstatus.toLowerCase() === "paid")
          .reduce((sum, bill) => {
            const rentPrice =
              rooms.find(
                (room) =>
                  room.roomid ===
                  leases.find((lease) => lease.leaseid === bill.leaseid)
                    ?.roomid,
              )?.rentamount ?? 0;
            const electricityRate =
              (bill as { electricityrate?: number }).electricityrate ?? 0;
            const waterRate = (bill as { waterrate?: number }).waterrate ?? 0;
            return (
              sum +
              (rentPrice +
                bill.electricityunits * electricityRate +
                bill.waterunits * waterRate)
            );
          }, 0);
        const totalunpaidBills = bills
          .filter((bill) => bill.paymentstatus.toLowerCase() === "unpaid")
          .reduce((sum, bill) => {
            const rentPrice =
              rooms.find(
                (room) =>
                  room.roomid ===
                  leases.find((lease) => lease.leaseid === bill.leaseid)
                    ?.roomid,
              )?.rentamount ?? 0;
            const electricityRate =
              (bill as { electricityrate?: number }).electricityrate ?? 0;
            const waterRate = (bill as { waterrate?: number }).waterrate ?? 0;
            return (
              sum +
              (rentPrice +
                bill.electricityunits * electricityRate +
                bill.waterunits * waterRate)
            );
          }, 0);
        const activeLeases = leases.filter(
          (lease) => !lease.moveoutdate,
        ).length;
        const paidBills = bills.filter(
          (bill) => bill.paymentstatus.toLowerCase() === "paid",
        ).length;
        const occupancyRate =
          rooms.length > 0 ? `${occupiedRooms}/${rooms.length}` : "0%";
        const totalRent = rooms.reduce((sum, room) => sum + room.rentamount, 0);
        const averageRent =
          rooms.length > 0 ? Math.round(totalRent / rooms.length) : 0;
        const totalDeposit = leases.reduce(
          (sum, lease) => sum + lease.depositamount,
          0,
        );
        const vacantRooms = rooms.length - occupiedRooms;

        const mappedBillingRows = bills.map((bill) => {
          const lease = leases.find((item) => item.leaseid === bill.leaseid);
          const tenant = users.find((item) => item.userid === lease?.tenantid);
          const room = rooms.find((item) => item.roomid === lease?.roomid);

          const rent = room?.rentamount ?? 0;
          const waterRate = (bill as { waterrate?: number }).waterrate ?? 0;
          const waterCost = bill.waterunits * waterRate;
          const electricityRate =
            (bill as { electricityrate?: number }).electricityrate ?? 0;
          const electricityCost = bill.electricityunits * electricityRate;
          const totalBills = rent + waterCost + electricityCost;

          return {
            billId: bill.billid,
            tenantName: tenant
              ? `${tenant.firstname} ${tenant.lastname}`
              : "Unknown Tenant",
            tenantAvatar: tenant?.avatar ?? "",
            roomNumber: room?.roomnumber ?? "N/A",
            billingMonth: bill.billingmonth,
            electricityUnits: bill.electricityunits,
            waterUnits: bill.waterunits,
            paymentStatus: bill.paymentstatus,
            totalBills,
          };
        });

        setStatCards([
          {
            label: "Paid Bills",
            icon: FaMoneyBillTrendUp,
            value: `${totalpaidBills.toFixed(2)} $`,
            progress: totalBills > 0 ? (totalpaidBills / totalBills) * 100 : 0,
          },
          {
            label: "Unpaid Bills",
            icon: FaMoneyBillWave,
            value: `${totalunpaidBills.toFixed(2)} $`,
            progress:
              totalBills > 0 ? (totalunpaidBills / totalBills) * 100 : 0,
          },
          {
            label: "Paid Bills Ratio",
            icon: FaChartLine,
            value: `${paidBills}/${bills.length}`,
            progress: bills.length > 0 ? (paidBills / bills.length) * 100 : 0,
          },
          {
            label: "Room Occupancy",
            icon: FaBuilding,
            value: occupancyRate,
            progress:
              rooms.length > 0 ? (occupiedRooms / rooms.length) * 100 : 0,
          },
        ]);

        setPropertyCards([
          {
            title: "Occupied Rooms",
            value: occupiedRooms.toString(),
            subtitle: "Current occupancy",
          },
          {
            title: "Vacant Rooms",
            value: vacantRooms.toString(),
            subtitle: "Ready for new leases",
          },
          {
            title: "Total Rooms",
            value: rooms.length.toString(),
            subtitle: "Managed inventory",
          },
          {
            title: "Avg. Room Rent",
            value: `$${averageRent}`,
            subtitle: "Across all rooms",
          },
          {
            title: "Deposit Collected",
            value: `$${totalDeposit}`,
            subtitle: "From all leases",
          },
        ]);

        setBillingRows(mappedBillingRows);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadDashboardStats();
  }, []);

  return {
    statCards,
    propertyCards,
    billingRows,
  };
}
