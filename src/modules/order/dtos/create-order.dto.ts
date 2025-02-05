import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../../shared/enum/order.enum';
import { Slot } from './slot.dto';

export class CreateOrderDto {
  @IsMongoId()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  slot: Slot;

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsOptional()
  @IsEnum(ORDER_STATUS)
  status?: ORDER_STATUS;

  @IsOptional()
  @IsEnum(PAYMENT_STATUS)
  paymentStatus?: PAYMENT_STATUS;
}
