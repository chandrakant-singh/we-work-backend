import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceCategoryService } from './services/service-category.service';
import {
  ServiceCategory,
  ServiceCategorySchema,
} from './schemas/service-category.schema';
import { ServiceCategoryController } from './controllers/service-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceCategory.name, schema: ServiceCategorySchema },
    ]),
  ],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
  exports: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
