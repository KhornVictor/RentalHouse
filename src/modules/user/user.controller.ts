import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('id') id?: string) {
    if (id !== undefined) {
      return this.usersService.findOne(Number(id));
    }

    return {
      status: '400',
      message: 'Users retrieved successfully',
      data: await this.usersService.findAll(),
    };
  }

  @Get('tenent')
  async findTenent() {
    const tenent = await this.usersService.findTenent();

    return {
      status: '400',
      message: 'Tenent retrieved successfully',
      data: tenent,
    };
  }

  @Get('admin')
  async findAdmin() {
    const admin = await this.usersService.findAdmin();
    return {
      status: '400',
      message: 'Admin retrieved successfully',
      data: admin,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }

  @Put()
  async updateByQuery(
    @Query('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete()
  async deleteByQuery(@Query('id', ParseIntPipe) id: number) {
    return this.usersService.deleteOne(id);
  }
}
