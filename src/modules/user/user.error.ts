import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handleUserPrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = Array.isArray(error.meta?.target)
        ? error.meta?.target.join(', ')
        : String(error.meta?.target ?? 'field');

      throw new ConflictException(
        `User with the same ${target} already exists.`,
      );
    }

    if (error.code === 'P2021') {
      throw new InternalServerErrorException(
        'User table is missing in database.',
      );
    }

    if (error.code === 'P2022') {
      throw new InternalServerErrorException(
        'A user column is missing in database.',
      );
    }

    if (error.code === 'P2003') {
      throw new BadRequestException('Invalid relation data for user request.');
    }
  }

  throw new InternalServerErrorException('Failed to process user request.');
}
