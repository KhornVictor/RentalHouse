import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set. Make sure backend/.env is loaded.',
      );
    }

    const isAccelerateUrl =
      connectionString.startsWith('prisma://') ||
      connectionString.startsWith('prisma+postgres://');

    if (isAccelerateUrl) {
      super({ accelerateUrl: connectionString });
      return;
    }

    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async $connect(): Promise<void> {
    return super.$connect();
  }

  async $disconnect(): Promise<void> {
    return super.$disconnect();
  }
}
