import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { ServiceDto } from '../dto/service.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createDto: ServiceDto) {
    return this.serviceService.create(createDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @Public()
  @Get('service-group/:serviceGroupId')
  findByServiceGroupId(@Param('serviceGroupId') serviceGroupId: string) {
    return this.serviceService.findByServiceGroupId(serviceGroupId);
  }

  @Public()
  @Get('service-group/name/:name')
  findByName(@Param('name') name: string) {
    return this.serviceService.findByName(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: ServiceDto) {
    return this.serviceService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
