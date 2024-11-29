import mongoose, { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Status } from 'src/shared/service/service.enum';

@Schema({ collection: 'services', timestamps: true })
export class Service extends Document {
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
    ref: 'service_groups',
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId of service_groups',
    },
  })
  serviceGroupId: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
