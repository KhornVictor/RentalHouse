/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { ConsoleMessageSuccess } from '../../common/messages/consoleMessage';
import { Lease } from 'src/interfaces/lease.type';

async function loadLeasesFromJson(): Promise<Lease[]> {
  const baseDir = process.cwd();
  const candidates = [
    path.resolve(baseDir, 'src', 'database', 'json', 'leases.json'),
    path.resolve(baseDir, 'prisma', 'json', 'leases.json'),
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
    throw new Error(`leases.json not found. Checked: ${candidates.join(', ')}`);
  }

  return JSON.parse(fileContent) as Lease[];
}

function oneYearAfter(date: Date): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + 1);
  return result;
}

export async function seedLeases(prisma: PrismaClient): Promise<void> {
  const leases = await loadLeasesFromJson();

  for (const lease of leases) {
    const moveInDate = new Date(lease.moveindate);
    const moveOutDate = lease.moveoutdate
      ? new Date(lease.moveoutdate)
      : oneYearAfter(moveInDate);

    const room = await prisma.room.findUnique({
      where: { roomid: lease.roomid },
      select: { rentamount: true },
    });

    await prisma.lease.create({
      data: {
        roomid: lease.roomid,
        tenantid: lease.tenantid,
        moveindate: moveInDate,
        moveoutdate: moveOutDate,
        depositamount: lease.depositamount,
      },
    });
  }

  ConsoleMessageSuccess(`Successfully Seeded ${leases.length} leases.`);
}
