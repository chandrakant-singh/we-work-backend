import { IsEnum, IsMongoId, IsNumber, IsPositive } from 'class-validator';

export enum OfferBy {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export class NegotiationDto {
  @IsMongoId()
  quotationId: string;

  @IsMongoId()
  userId: string;

  @IsNumber()
  @IsPositive()
  offer: number;

  @IsEnum(OfferBy)
  by: OfferBy;
}
