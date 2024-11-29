import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../schemas/service.schema';
import { Model, Types } from 'mongoose';
import { ServiceDto } from '../dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async create(createDto: ServiceDto): Promise<Service> {
    // Explicitly set serviceGroupId programmatically
    const serviceData = {
      ...createDto,
      serviceGroupId: new Types.ObjectId(createDto.serviceGroupId),
    };

    const createServiceModel = new this.serviceModel(serviceData);
    return createServiceModel.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findById(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateDto: ServiceDto): Promise<Service> {
    const updatedService = await this.serviceModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: string): Promise<Service> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}
