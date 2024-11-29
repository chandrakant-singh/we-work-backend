import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceGroupController } from './controllers/service-group.controller';
import { ServiceGroupsService } from './services/service-group.service';
import {
  ServiceGroup,
  ServiceGroupsSchema,
} from './schemas/service-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceGroup.name, schema: ServiceGroupsSchema },
    ]),
  ],
  controllers: [ServiceGroupController],
  providers: [ServiceGroupsService],
  exports: [ServiceGroupsService],
})
export class ServiceGroupModule {}
