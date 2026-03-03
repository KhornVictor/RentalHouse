import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { seedBills } from './bill.seed';
import { seedLeases } from './lease.seed';
import { seedRooms } from './room.seed';
import { seedUsers } from './user.seeder';
import { ConsoleMessageSuccess, ConsoleMessageError } from '../../common/messages/consoleMessage';

async function runSeed(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set.');
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    await seedRooms(prisma);
    await seedUsers(prisma);
    await seedLeases(prisma);
    await seedBills(prisma);
    ConsoleMessageSuccess('Room, user, lease, and bill seeding completed successfully.');
  } finally {
    await prisma.$disconnect();
  }
}

runSeed().catch((error: unknown) => {
  ConsoleMessageError(`User seeding failed: ${error}`);
  process.exit(1);
});
