import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  addresses: Types.ObjectId[];

  @IsOptional()
  @IsString()
  profileImageUrl: string;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsArray()
  preferences: string[];
}
