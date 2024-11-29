import { IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  readonly quantity: number;
}
