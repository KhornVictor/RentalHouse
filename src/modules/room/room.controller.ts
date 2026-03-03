import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll() {
    return {
      status: '200',
      message: 'Rooms retrieved successfully',
      data: await this.roomService.findAll(),
    };
  }
}
