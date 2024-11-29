import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceGroup } from '../schemas/service-group.schema';
import { ServiceGroupDto } from '../dto/service-group.dto';

@Injectable()
export class ServiceGroupsService {
  constructor(
    @InjectModel(ServiceGroup.name)
    private serviceGroupModel: Model<ServiceGroup>,
  ) {}

  async create(serviceGroupDto: ServiceGroupDto): Promise<ServiceGroup> {
    const createServiceModel = new this.serviceGroupModel(serviceGroupDto);
    return createServiceModel.save();
  }

  async findAll(): Promise<ServiceGroup[]> {
    return this.serviceGroupModel.find().exec();
  }

  async findById(id: string): Promise<ServiceGroup> {
    const service = await this.serviceGroupModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateDto: ServiceGroupDto): Promise<ServiceGroup> {
    const updatedService = await this.serviceGroupModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: string): Promise<ServiceGroup> {
    return this.serviceGroupModel.findByIdAndDelete(id).exec();
  }
}
