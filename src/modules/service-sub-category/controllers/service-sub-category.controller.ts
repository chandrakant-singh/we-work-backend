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

@Controller('service-sub-categories')
export class ServiceSubCategoryController {
  constructor(
    private readonly serviceSubCategoryService: ServiceSubCategoryService,
  ) {}

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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: ServiceSubCategoryDto) {
    return this.serviceSubCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceSubCategoryService.delete(id);
  }
}
