import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceSubCategory } from '../schemas/service-sub-category.schema';
import { ServiceSubCategoryDto } from '../dto/service-sub-category.dto';
import { ServiceCategoryService } from 'src/modules/service-category/services/service-category.service';
import { ServiceCategory } from 'src/modules/service-category/schemas/service-category.schema';

@Injectable()
export class ServiceSubCategoryService {
  constructor(
    @InjectModel(ServiceSubCategory.name)
    private readonly serviceSubCategoryModel: Model<ServiceSubCategory>,
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  async create(createDto: ServiceSubCategoryDto): Promise<ServiceSubCategory> {
    const serviceCategory: ServiceCategory =
      await this.serviceCategoryService.findById(createDto.serviceCategoryId);

    if (!serviceCategory) {
      throw new NotFoundException(
        `ServiceCategory with ID ${createDto.serviceCategoryId} not found`,
      );
    }

    const serviceSubCategoryData = {
      ...createDto,
      serviceCategoryId: new Types.ObjectId(createDto.serviceCategoryId),
      serviceId: new Types.ObjectId(serviceCategory.serviceId),
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

  async getGroupedByServiceCategory(serviceId: string): Promise<
    {
      serviceCategoryId: string;
      categoryName: string;
      serviceSubCategories: ServiceSubCategoryDto[];
    }[]
  > {
    const objectIdServiceId = new Types.ObjectId(serviceId);
    return this.serviceSubCategoryModel
      .aggregate([
        {
          $match: {
            serviceId: objectIdServiceId, // Match service sub-categories by serviceId
          },
        },
        {
          $lookup: {
            from: 'service_categories',
            localField: 'serviceCategoryId',
            foreignField: '_id',
            as: 'serviceCategories',
          },
        },
        {
          $lookup: {
            from: 'service_attributes',
            localField: '_id',
            foreignField: 'serviceSubCategoryId',
            as: 'serviceAttributes',
          },
        },
        {
          $lookup: {
            from: 'carts',
            let: { subCategoryId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [
                      '$userId',
                      new Types.ObjectId('673f779d853b8fc53d9b73ce'),
                    ],
                  },
                },
              }, // Match by userId
              { $unwind: '$items' }, // Unwind cart items
              {
                $match: {
                  $expr: {
                    $eq: ['$items.serviceSubCategoryId', '$$subCategoryId'],
                  },
                },
              }, // Match by serviceSubCategoryId
            ],
            as: 'cartData',
          },
        },
        {
          $set: {
            categoryName: {
              $arrayElemAt: ['$serviceCategories.name', 0],
            },
            isAddedToCart: {
              $gt: [{ $size: '$cartData' }, 0],
            },
            cartQuantity: {
              $cond: {
                if: {
                  $gt: [{ $size: '$cartData' }, 0],
                },
                then: {
                  $arrayElemAt: ['$cartData.items.quantity', 0],
                },
                else: 0,
              },
            },
          },
        },
        {
          $group: {
            _id: '$serviceCategoryId',
            categoryName: { $first: '$categoryName' },
            serviceSubCategories: {
              $push: {
                _id: '$_id',
                name: '$name',
                description: '$description',
                imageUrl: '$imageUrl',
                serviceCategoryId: '$serviceCategoryId',
                serviceId: '$serviceId',
                serviceAttributes: {
                  $first: '$serviceAttributes',
                },
                isAddedToCart: '$isAddedToCart',
                cartQuantity: '$cartQuantity',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            serviceCategoryId: '$_id',
            categoryName: 1,
            serviceSubCategories: 1,
          },
        },

        // {
        //   $match: {
        //     serviceId: objectIdServiceId,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: 'service_categories',
        //     localField: 'serviceCategoryId',
        //     foreignField: '_id',
        //     as: 'serviceCategories',
        //   },
        // },
        // {
        //   $lookup: {
        //     from: 'service_attributes',
        //     localField: '_id',
        //     foreignField: 'serviceSubCategoryId',
        //     as: 'serviceAttributes',
        //   },
        // },
        // {
        //   $set: {
        //     categoryName: {
        //       $arrayElemAt: ['$serviceCategories.name', 0],
        //     },
        //   },
        // },
        // {
        //   $group: {
        //     _id: '$serviceCategoryId',
        //     categoryName: { $first: '$categoryName' },
        //     serviceSubCategories: {
        //       $push: {
        //         _id: '$_id',
        //         name: '$name',
        //         description: '$description',
        //         imageUrl: '$imageUrl',
        //         serviceCategoryId: '$serviceCategoryId',
        //         serviceId: '$serviceId',
        //         serviceAttributes: {
        //           $first: '$serviceAttributes',
        //         },
        //       },
        //     },
        //   },
        // },
        // {
        //   $project: {
        //     _id: 0,
        //     serviceCategoryId: '$_id',
        //     categoryName: 1,
        //     serviceSubCategories: 1,
        //   },
        // },
      ])
      .sort({ categoryName: 1 });
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
