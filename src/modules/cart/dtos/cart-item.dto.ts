// create-cart.dto.ts
import { IsMongoId, IsNumber, IsNotEmpty } from 'class-validator';

export class CartItemDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly serviceSubCategoryId: string;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly price: number;

  // Constructor to initialize properties
  constructor(serviceSubCategoryId: string, quantity: number, price: number) {
    this.serviceSubCategoryId = serviceSubCategoryId;
    this.quantity = quantity;
    this.price = price;
  }
}
