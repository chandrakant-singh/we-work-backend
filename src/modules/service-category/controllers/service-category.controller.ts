import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServiceCategoryService } from '../services/service-category.service';
import { ServiceCategoryDto } from '../dto/service-category.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('service-categories')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Post()
  create(@Body() createDto: ServiceCategoryDto) {
    return this.serviceCategoryService.create(createDto);
  }

  @Get()
  findAll() {
    return this.serviceCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceCategoryService.findById(id);
  }

  @Public()
  @Get('service/:serviceId')
  findByServiceId(@Param('serviceId') serviceId: string) {
    return this.serviceCategoryService.findByServiceId(serviceId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: ServiceCategoryDto,
  ) {
    return this.serviceCategoryService.update(id, updateServiceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceCategoryService.delete(id);
  }
}
