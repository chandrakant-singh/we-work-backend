import { Prop } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // NOTE: TODO : Password hash from frontend will do in future
  // @IsNotEmpty()
  // @IsString()
  // passwordHash: string;

  @IsOptional()
  @IsString()
  salt: string;

  @IsOptional()
  @IsObject()
  profileId: string;

  @IsNotEmpty()
  @IsNumber()
  role: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  lastLogin: string;

  // email and contactNumber we are taking to create profile
  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @Prop()
  _id: string;
}
