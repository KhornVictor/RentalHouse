/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { Room } from 'src/interfaces/room.type';
import { console } from 'node:inspector';
import { ConsoleMessageSuccess } from '../../common/messages/consoleMessage';

async function loadRoomsFromJson(): Promise<Room[]> {
  const baseDir = process.cwd();
  const candidates = [
    path.resolve(baseDir, 'src', 'database', 'json', 'rooms.json'),
    path.resolve(baseDir, 'prisma', 'json', 'rooms.json'),
  ];

  let fileContent: string | undefined;

  for (const filePath of candidates) {
    try {
      fileContent = await readFile(filePath, 'utf-8');
      break;
    } catch {
      // try next candidate
    }
  }

  if (!fileContent) {
    throw new Error(`rooms.json not found. Checked: ${candidates.join(', ')}`);
  }

  return JSON.parse(fileContent) as Room[];
}

export async function seedRooms(prisma: PrismaClient): Promise<void> {
  const rooms = await loadRoomsFromJson();

  for (const room of rooms) {
    if (typeof room.roomid === 'number') {
      await prisma.room.upsert({
        where: { roomid: room.roomid },
        update: {
          roomnumber: room.roomnumber,
          capacity: room.capacity,
          rentamount: room.rentamount,
          status: room.status,
        },
        create: {
          roomid: room.roomid,
          roomnumber: room.roomnumber,
          capacity: room.capacity,
          rentamount: room.rentamount,
          status: room.status,
        },
      });
      continue;
    }

    const existingRoom = await prisma.room.findFirst({
      where: { roomnumber: room.roomnumber },
      select: { roomid: true },
    });

    if (existingRoom) {
      await prisma.room.update({
        where: { roomid: existingRoom.roomid },
        data: {
          capacity: room.capacity,
          rentamount: room.rentamount,
          status: room.status,
        },
      });
      continue;
    }

    await prisma.room.create({
      data: {
        roomnumber: room.roomnumber,
        capacity: room.capacity,
        rentamount: room.rentamount,
        status: room.status,
      },
    });
  }

  ConsoleMessageSuccess(`Successfully Seeded ${rooms.length} rooms.`);
}
