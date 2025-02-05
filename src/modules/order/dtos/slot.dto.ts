import { IsNotEmpty, IsString } from 'class-validator';

export class DateSlot {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  day: string;
}

export class Slot {
  @IsNotEmpty()
  dateSlot: DateSlot;

  @IsNotEmpty()
  @IsString()
  timeSlot: string;
}
