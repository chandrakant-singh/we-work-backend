import mongoose, { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Status } from 'src/shared/enum/service.enum';

@Schema({ collection: 'service_categories', timestamps: true })
export class ServiceCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: false, enum: Status, default: 'ACTIVE' })
  status: Status;

  @Prop({
    type: Types.ObjectId,
    ref: 'services',
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId of service',
    },
  })
  serviceId: Types.ObjectId;
}

export const ServiceCategorySchema =
  SchemaFactory.createForClass(ServiceCategory);
