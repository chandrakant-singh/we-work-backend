import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ServiceSubCategoryDto } from 'src/modules/service-sub-category/dto/service-sub-category.dto';
import { CartItemDto } from './cart-item.dto';

export class CartDto {
  @IsString()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}

export class CartWithSubCategoryDto {
  @IsString()
  userId: string;

  items: {
    serviceSubCategoryId: ServiceSubCategoryDto;
    quantity: number;
    price: number;
  }[];
}
