import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/user/user.module';
import { BillModule } from './modules/bill/bill.module';
import { RoomModule } from './modules/room/room.module';
import { LeaseModule } from './modules/lease/lease.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RoomModule,
    BillModule,
    LeaseModule
  ],
})
export class AppModule {}
