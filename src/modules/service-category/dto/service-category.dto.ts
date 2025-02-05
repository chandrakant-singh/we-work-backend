import { IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { Status } from 'src/shared/enum/service.enum';

export class ServiceCategoryDto {
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @IsEnum(Status)
  @IsOptional()
  readonly status?: Status;

  @IsMongoId()
  @IsOptional()
  readonly serviceId?: string;
}
