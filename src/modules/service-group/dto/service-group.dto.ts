import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/shared/service/service.enum';

export class ServiceGroupDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsEnum(Status)
  @IsOptional()
  readonly status?: Status;
}
