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
  passwordHash: string;

  @IsOptional()
  @IsString()
  salt: string;

  @IsOptional()
  @IsObject()
  profile: string;

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
}
