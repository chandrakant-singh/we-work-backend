import { IsMongoId, IsNumber, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly serviceSubCategoryId: string;

  @IsNumber()
  readonly quantity: number;
}
