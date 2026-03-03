import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billService.findOne(id);
  }
}
