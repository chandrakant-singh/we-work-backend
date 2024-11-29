import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceSubCategory } from '../schemas/service-sub-category.schema';
import { ServiceSubCategoryDto } from '../dto/service-sub-category.dto';

@Injectable()
export class ServiceSubCategoryService {
  constructor(
    @InjectModel(ServiceSubCategory.name)
    private readonly serviceSubCategoryModel: Model<ServiceSubCategory>,
  ) {}

  async create(createDto: ServiceSubCategoryDto): Promise<ServiceSubCategory> {
    const serviceSubCategoryData = {
      ...createDto,
      serviceCategoryId: new Types.ObjectId(createDto.serviceCategoryId),
    };

    const createServiceModel = new this.serviceSubCategoryModel(
      serviceSubCategoryData,
    );
    return createServiceModel.save();
  }

  async findAll(): Promise<ServiceSubCategory[]> {
    return this.serviceSubCategoryModel.find().exec();
  }

  async findById(id: string): Promise<ServiceSubCategory> {
    const service = await this.serviceSubCategoryModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(
    id: string,
    updateDto: ServiceSubCategoryDto,
  ): Promise<ServiceSubCategory> {
    const updatedService = await this.serviceSubCategoryModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async delete(id: string): Promise<ServiceSubCategory> {
    return this.serviceSubCategoryModel.findByIdAndDelete(id).exec();
  }
}
