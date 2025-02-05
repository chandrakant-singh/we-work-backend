import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  /**
   * addressLine1: Flat, House no., Building, Company, Apartment
   */
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  /**
   * addressLine2: Area, Street, Sector, Village
   */
  @IsOptional()
  @IsString()
  addressLine2: string;

  @IsOptional()
  @IsString()
  landmark: string;

  @IsEnum(['home', 'work', 'other'])
  @IsOptional()
  @IsString()
  addressType: string;

  @IsNotEmpty()
  @IsMongoId()
  profileId: string;
}
