import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceCategory } from '../schemas/service-category.schema';
import { ServiceCategoryDto } from '../dto/service-category.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectModel(ServiceCategory.name)
    private readonly serviceCategoryModel: Model<ServiceCategory>,
  ) {}

  async create(createDto: ServiceCategoryDto): Promise<ServiceCategory> {
    const serviceCreateData = {
      ...createDto,
      serviceId: new Types.ObjectId(createDto.serviceId),
    };

    const createServiceModel = new this.serviceCategoryModel(serviceCreateData);
    return createServiceModel.save();
  }

  async findAll(): Promise<ServiceCategory[]> {
    return this.serviceCategoryModel.find().exec();
  }

  async findById(id: string): Promise<ServiceCategory> {
    const serviceCategory = await this.serviceCategoryModel.findById(id).exec();
    if (!serviceCategory) {
      throw new NotFoundException(`serviceCategory with ID ${id} not found`);
    }
    return serviceCategory;
  }

  async findByServiceId(serviceId: string): Promise<ServiceCategory[]> {
    const serviceCategory = await this.serviceCategoryModel
      .find({ serviceId: new Types.ObjectId(serviceId) })
      .exec();
    if (!serviceCategory) {
      throw new NotFoundException(
        `serviceCategory with ServiceId ${serviceId} not found`,
      );
    }
    return serviceCategory;
  }

  async update(
    id: string,
    updateDto: ServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const updatedService = await this.serviceCategoryModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: string): Promise<ServiceCategory> {
    return this.serviceCategoryModel.findByIdAndDelete(id).exec();
  }
}
