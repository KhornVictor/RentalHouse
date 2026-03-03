import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt({ message: 'userid must be a number' })
  userid?: number;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'firstname must be a string' })
  @IsNotEmpty({ message: 'firstname is required' })
  firstname: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'lastname must be a string' })
  @IsNotEmpty({ message: 'lastname is required' })
  lastname: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;

  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsString({ message: 'role must be a string' })
  @IsNotEmpty({ message: 'role is required' })
  @IsIn(['admin', 'tenant'], {
    message: 'role must be either admin or tenant',
  })
  role: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'phonenumber must be a string' })
  @IsNotEmpty({ message: 'phonenumber is required' })
  phonenumber: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'avatar must be a string' })
  @IsNotEmpty({ message: 'avatar is required' })
  avatar: string;

  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail({}, { message: 'email format is invalid' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'status must be a string' })
  @IsNotEmpty({ message: 'status is required' })
  status: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsInt({ message: 'userid must be a number' })
  userid?: number;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'firstname must be a string' })
  firstname?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'lastname must be a string' })
  lastname?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'username must be a string' })
  username?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsString({ message: 'role must be a string' })
  @IsIn(['admin', 'tenant'], {
    message: 'role must be either admin or tenant',
  })
  role?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'phonenumber must be a string' })
  phonenumber?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'avatar must be a string' })
  avatar?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail({}, { message: 'email format is invalid' })
  email?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'status must be a string' })
  status?: string;

  @IsOptional()
  @Transform(({ value }) => String(value).trim())
  @IsString({ message: 'newPassword must be a string' })
  @MinLength(6, { message: 'newPassword must be at least 6 characters' })
  newPassword?: string;
}
