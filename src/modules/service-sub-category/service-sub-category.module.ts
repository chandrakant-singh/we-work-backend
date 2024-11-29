import { Module } from '@nestjs/common';
import { ServiceSubCategoryController } from './controllers/service-sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceSubCategory,
  ServiceSubCategorySchema,
} from './schemas/service-sub-category.schema';
import { ServiceSubCategoryService } from './services/service-sub-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceSubCategory.name, schema: ServiceSubCategorySchema },
    ]),
  ],
  controllers: [ServiceSubCategoryController],
  providers: [ServiceSubCategoryService],
  exports: [ServiceSubCategoryService],
})
export class ServiceSubCategoryModule {}
