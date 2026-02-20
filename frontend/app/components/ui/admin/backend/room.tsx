"use client";

type Room = {
  roomid: number;
  roomnumber: string;
  capacity: number;
  rentamount: number;
  status: string;
};

const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch("/data/rooms.json");
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    return (await response.json()) as Room[];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export { getRooms };
