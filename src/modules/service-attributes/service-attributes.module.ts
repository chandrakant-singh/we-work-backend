import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceAttribute,
  ServiceAttributeSchema,
} from './schemas/service-attributes.schema';
import { ServiceAttributesController } from './controllers/service-attributes.controller';
import { ServiceAttributesService } from './services/service-attributes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceAttribute.name, schema: ServiceAttributeSchema },
    ]),
  ],
  controllers: [ServiceAttributesController],
  providers: [ServiceAttributesService],
  exports: [ServiceAttributesService],
})
export class ServiceAttributesModule {}
