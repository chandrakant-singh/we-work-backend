import mongoose, { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'service_attributes', timestamps: true })
export class ServiceAttribute extends Document {
  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop({ default: 60 })
  duration: number;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'service_sub_categories',
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for profile',
    },
  })
  serviceSubCategoryId: Types.ObjectId;
}

export const ServiceAttributeSchema =
  SchemaFactory.createForClass(ServiceAttribute);
