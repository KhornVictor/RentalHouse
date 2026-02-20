import { IconType } from "react-icons";

export type StatCard = {
  label: string;
  icon: IconType;
  value: string;
  progress: number;
};

export type PropertyCard = {
  title: string;
  value: string;
  subtitle: string;
};

export type BillingRow = {
  billId: number;
  tenantName: string;
  tenantAvatar: string;
  roomNumber: string;
  billingMonth: string;
  electricityUnits: number;
  waterUnits: number;
  paymentStatus: string;
  totalBills: number;
};
