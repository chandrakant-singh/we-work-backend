import { Module, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceAttribute } from '../schemas/service-attributes.schema';
import { Model, Types } from 'mongoose';
import { ServiceAttributeDto } from '../dto/service-attributes.dto';

@Module({})
export class ServiceAttributesService {
  constructor(
    @InjectModel(ServiceAttribute.name)
    private readonly serviceAttributeModel: Model<ServiceAttribute>,
  ) {}

  async create(createDto: ServiceAttributeDto): Promise<ServiceAttribute> {
    const serviceAttributesCreateData = {
      ...createDto,
      serviceSubCategoryId: new Types.ObjectId(createDto.serviceSubCategoryId),
    };
    const createServiceModel = new this.serviceAttributeModel(
      serviceAttributesCreateData,
    );
    return createServiceModel.save();
  }

  async findAll(): Promise<ServiceAttribute[]> {
    return this.serviceAttributeModel.find().exec();
  }

  async findById(id: string): Promise<ServiceAttribute> {
    const service = await this.serviceAttributeModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`ServiceAttributes with ID ${id} not found`);
    }
    return service;
  }

  async findByServiceSubCategoryId(
    serviceSubCategoryId: string,
  ): Promise<ServiceAttribute> {
    const service = await this.serviceAttributeModel
      .find({ serviceSubCategoryId: new Types.ObjectId(serviceSubCategoryId) })
      .exec();
    if (!service) {
      throw new NotFoundException(
        `ServiceAttributes with ID ${serviceSubCategoryId} not found`,
      );
    }
    return service[0];
  }

  async update(
    id: string,
    updateDto: ServiceAttributeDto,
  ): Promise<ServiceAttribute> {
    const updatedService = await this.serviceAttributeModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: string): Promise<ServiceAttribute> {
    return this.serviceAttributeModel.findByIdAndDelete(id).exec();
  }
}
