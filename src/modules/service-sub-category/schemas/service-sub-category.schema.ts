import mongoose, { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Status } from 'src/shared/service/service.enum';

@Schema({ collection: 'service_sub_categories', timestamps: true })
export class ServiceSubCategory extends Document {
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
    ref: 'service_categories',
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for service_categories',
    },
  })
  serviceCategoryId: Types.ObjectId;
}

export const ServiceSubCategorySchema =
  SchemaFactory.createForClass(ServiceSubCategory);
