import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2021')
        throw new InternalServerErrorException(
          'Bill table is missing in database.',
        );
      if (error.code === 'P2022')
        throw new InternalServerErrorException(
          'A bill column is missing in database.',
        );
      if (error.code === 'P2003')
        throw new BadRequestException(
          'Invalid relation data for bill request.',
        );
    }
    throw new InternalServerErrorException('Failed to process bill request.');
  }

  async findAll() {
    try {
      const bills = await this.prisma.bill.findMany();

      return {
        status: '200',
        message: 'Bills retrieved successfully',
        data: bills,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    if (!Number.isInteger(id) || id <= 0)
      throw new BadRequestException('Bill id must be a positive integer.');

    try {
      const bill = await this.prisma.bill.findUnique({
        where: { billid: id },
      });

      if (!bill) throw new NotFoundException(`Bill with id ${id} not found.`);

      return {
        status: '200',
        message: 'Bill retrieved successfully',
        data: bill,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      this.handlePrismaError(error);
    }
  }
}
