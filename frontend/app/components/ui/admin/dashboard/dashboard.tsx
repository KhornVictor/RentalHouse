"use client";

import React from "react";
import NavigationBarHome from "../navigationBarHome";
import "../../../../../app/globals.css";
import User from "@/app/types/user";
import StatisticCard from "./statisticCard";
import Property from "./property";
import Table from "./table";
import useDashboardData from "./useDashboardData";

type DashboardProps = {
  user: User | null;
  onAvatarClick?: () => void;
};

export default function Dashboard({ user, onAvatarClick }: DashboardProps) {
  const { statCards, propertyCards, billingRows } = useDashboardData();

  return (
    <main className="flex-1 px-6 py-6 lg:px-10 h-screen overflow-y-auto scrollbar-slate">
      <NavigationBarHome user={user} onAvatarClick={onAvatarClick} />
      <StatisticCard statCards={statCards} />
      <Property propertyCards={propertyCards} />
      <Table billingRows={billingRows} />
    </main>
  );
}
