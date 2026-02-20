"use client";

type Lease = {
  leaseid: number;
  roomid: number;
  tenantid: number;
  moveindate: string;
  moveoutdate: string;
  depositamount: number;
};

const getLeases = async (): Promise<Lease[]> => {
  try {
    const response = await fetch("/data/leases.json");
    if (!response.ok) {
      throw new Error("Failed to fetch leases");
    }
    return (await response.json()) as Lease[];
  } catch (error) {
    console.error("Error fetching leases:", error);
    return [];
  }
};

export { getLeases };
