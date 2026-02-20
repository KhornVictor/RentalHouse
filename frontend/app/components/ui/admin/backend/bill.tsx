"use client";

type Bill = {
  billid: number;
  leaseid: number;
  billingmonth: string;
  electricityunits: number;
  waterunits: number;
  paymentstatus: string;
};

const getBills = async (): Promise<Bill[]> => {
  try {
    const response = await fetch("/data/bills.json");
    if (!response.ok) {
      throw new Error("Failed to fetch bills");
    }
    return (await response.json()) as Bill[];
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};

const getTotalElectricityBills = async (): Promise<number> => {
  try {
    const bills = await getBills();
    return bills.reduce((total, bill) => total + bill.electricityunits * 0.25, 0);
  } catch (error) {
    console.error("Error calculating total electricity bills:", error);
    return 0;
  }
};

const getBillsByMonth = async (month: string): Promise<Bill[]> => {
  try {
    const bills = await getBills();
    return bills.filter((bill) => bill.billingmonth.slice(0, 7) === month);
  } catch (error) {
    console.error("Error fetching bills by month:", error);
    return [];
  }
};

const getTotalWaterBills = async (): Promise<number> => {
  try {
    const bills = await getBills();
    return bills.reduce((total, bill) => total + bill.waterunits * 0.15, 0);
  } catch (error) {
    console.error("Error calculating total water bills:", error);
    return 0;
  }
};

export { getBills, getTotalElectricityBills, getTotalWaterBills, getBillsByMonth };
