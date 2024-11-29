import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ServiceAttributeDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsNotEmpty({ message: 'Duration is required, and it should be in minutes' })
  @IsNumber()
  duration: number;

  @IsMongoId()
  @IsNotEmpty()
  readonly serviceSubCategoryId?: string;
}
