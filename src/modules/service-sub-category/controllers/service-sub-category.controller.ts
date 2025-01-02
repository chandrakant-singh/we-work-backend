import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServiceSubCategoryService } from '../services/service-sub-category.service';
import { ServiceSubCategoryDto } from '../dto/service-sub-category.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('service-sub-categories')
export class ServiceSubCategoryController {
  constructor(
    private readonly serviceSubCategoryService: ServiceSubCategoryService,
  ) {}

  @Public()
  @Post()
  create(@Body() createDto: ServiceSubCategoryDto) {
    return this.serviceSubCategoryService.create(createDto);
  }

  @Get()
  findAll() {
    return this.serviceSubCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceSubCategoryService.findById(id);
  }

  @Public()
  @Get('/grouped-by-category/:serviceId')
  getServiceSubCategoriesGroupedByCategory(
    @Param('serviceId') serviceId: string,
  ) {
    return this.serviceSubCategoryService.getGroupedByServiceCategory(
      serviceId,
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: ServiceSubCategoryDto) {
    return this.serviceSubCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceSubCategoryService.delete(id);
  }
}
