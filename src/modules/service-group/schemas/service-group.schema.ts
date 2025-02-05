import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Status } from 'src/shared/enum/service.enum';

@Schema({ collection: 'service_groups', timestamps: true })
export class ServiceGroup extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  description: string;

  @Prop({ required: false, enum: Status, default: 'ACTIVE' })
  status: Status;
}

export const ServiceGroupsSchema = SchemaFactory.createForClass(ServiceGroup);
