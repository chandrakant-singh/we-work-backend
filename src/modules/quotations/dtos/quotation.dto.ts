import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationStatus } from '../schemas/quotation.schema';

export class QuotationItemDto {
  @IsMongoId()
  serviceSubCategoryId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateQuotationDto {
  @IsMongoId()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  items: QuotationItemDto[];

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsEnum(QuotationStatus)
  @IsOptional()
  status?: QuotationStatus;
}
