import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServiceGroupsService } from '../services/service-group.service';
import { ServiceGroupDto } from '../dto/service-group.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('service-groups')
export class ServiceGroupController {
  constructor(private readonly serviceGroupsService: ServiceGroupsService) {}

  @Post()
  create(@Body() createServiceDto: ServiceGroupDto) {
    return this.serviceGroupsService.create(createServiceDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.serviceGroupsService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceGroupsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: ServiceGroupDto) {
    return this.serviceGroupsService.update(id, updateServiceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceGroupsService.delete(id);
  }
}
