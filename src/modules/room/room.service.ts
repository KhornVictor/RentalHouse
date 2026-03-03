import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        const rooms = this.prisma.room.findMany();
        return rooms;
    }

    findOne(id: number) {
        return this.prisma.room.findUnique({
            where: { roomid: id },
        });
    }

}