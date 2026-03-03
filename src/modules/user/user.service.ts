import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleUserPrismaError } from './user.error';
import { User } from 'src/interfaces/user.type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return (await this.prisma.user.findMany()) as User[];
    } catch (error) {
      handleUserPrismaError(error);
    }
  }

  async findOne(id: number) {
    if (!Number.isInteger(id) || id <= 0)
      throw new BadRequestException('User id must be a positive integer.');

    try {
      const user = (await this.prisma.user.findUnique({
        where: { userid: id },
      })) as User;

      if (!user) throw new NotFoundException(`User with id ${id} not found.`);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleUserPrismaError(error);
    }
  }

  async findTenent() {
    try {
      return (await this.prisma.user.findMany({
        where: { role: 'tenant' },
      })) as User[];
    } catch (error) {
      handleUserPrismaError(error);
    }
  }

  async findAdmin() {
    try {
      return (await this.prisma.user.findMany({
        where: { role: 'admin' },
      })) as User[];
    }
    catch (error) {
      handleUserPrismaError(error);
    }
  }

  async createOne(createUserDto: CreateUserDto) {
    const firstname = createUserDto.firstname?.trim();
    const lastname = createUserDto.lastname?.trim();
    const username = createUserDto.username?.trim();
    const role = createUserDto.role?.trim();
    const phonenumber = createUserDto.phonenumber?.trim();
    const avatar = createUserDto.avatar?.trim();
    const status = createUserDto.status?.trim();
    const email = createUserDto.email?.trim().toLowerCase();
    const password = createUserDto.password?.trim();

    try {
      return (await this.prisma.user.create({
        data: {
          firstname,
          lastname,
          username,
          password,
          role,
          phonenumber,
          avatar,
          email,
          status,
        },
      })) as User;
    } catch (error) {
      handleUserPrismaError(error);
    }
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const firstname = updateUserDto.firstname?.trim();
    const lastname = updateUserDto.lastname?.trim();
    const username = updateUserDto.username?.trim();
    const role = updateUserDto.role?.trim();
    const phonenumber = updateUserDto.phonenumber?.trim();
    const avatar = updateUserDto.avatar?.trim();
    const status = updateUserDto.status?.trim();
    const email = updateUserDto.email?.trim().toLowerCase();
    const password = updateUserDto.password?.trim();

    try {
      const user = await this.prisma.user.findUnique({
        where: { userid: id },
      });
      
      if (!user) throw new NotFoundException(`User with id ${id} not found.`);
      

      return (await this.prisma.user.update({
        where: { userid: id },
        data: {
          firstname,
          lastname,
          username,
          password,
          role,
          phonenumber,
          avatar,
          email,
          status,
        },
      })) as User;
    } catch (error) {
      handleUserPrismaError(error);
    }
  }

  async deleteOne(id: number) {
    if (!Number.isInteger(id) || id <= 0)
      throw new BadRequestException('User id must be a positive integer.');
    try {
      const user = await this.prisma.user.findUnique({
        where: { userid: id },
      });

      if (!user) throw new NotFoundException(`User with id ${id} not found.`);

      await this.prisma.user.delete({
        where: { userid: id },
      });
      return { message: `User with id ${id} deleted successfully.` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleUserPrismaError(error);
    }
  }
}