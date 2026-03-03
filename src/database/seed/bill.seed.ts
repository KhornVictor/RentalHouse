/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { ConsoleMessageSuccess } from '../../common/messages/consoleMessage';
import { Bill } from 'src/interfaces/bill.type';

async function loadBillsFromJson(): Promise<Bill[]> {
  const baseDir = process.cwd();
  const candidates = [
    path.resolve(baseDir, 'src', 'database', 'json', 'bills.json'),
    path.resolve(baseDir, 'prisma', 'json', 'bills.json'),
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
    throw new Error(`bills.json not found. Checked: ${candidates.join(', ')}`);
  }

  return JSON.parse(fileContent) as Bill[];
}

export async function seedBills(prisma: PrismaClient): Promise<void> {
  const bills = await loadBillsFromJson();

  for (const bill of bills) {
    const billingMonth = new Date(bill.billingmonth);

    if (typeof bill.billid === 'number') {
      await prisma.bill.upsert({
        where: { billid: bill.billid },
        update: {
          leaseid: bill.leaseid,
          billingmonth: billingMonth,
          electricityunits: bill.electricityunits,
          electricityrate: bill.electricityrate,
          waterunits: bill.waterunits,
          waterrate: bill.waterrate,
          paymentstatus: bill.paymentstatus,
        },
        create: {
          billid: bill.billid,
          leaseid: bill.leaseid,
          billingmonth: billingMonth,
          electricityunits: bill.electricityunits,
          electricityrate: bill.electricityrate,
          waterunits: bill.waterunits,
          waterrate: bill.waterrate,
          paymentstatus: bill.paymentstatus,
        },
      });
      continue;
    }

    await prisma.bill.create({
      data: {
        leaseid: bill.leaseid,
        billingmonth: billingMonth,
        electricityunits: bill.electricityunits,
        electricityrate: bill.electricityrate,
        waterunits: bill.waterunits,
        waterrate: bill.waterrate,
        paymentstatus: bill.paymentstatus,
      },
    });
  }

  ConsoleMessageSuccess(`Successfully Seeded ${bills.length} bills.`);
}
