import { IsMongoId, IsNumber, IsString, Min } from 'class-validator';

export class OrderItemDto {
  @IsMongoId()
  serviceSubCategoryId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
