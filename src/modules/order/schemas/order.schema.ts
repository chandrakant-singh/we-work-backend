import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../../shared/enum/order.enum';

class OrderItem {
  @Prop({
    type: Types.ObjectId,
    ref: 'service_sub_categories',
    required: true,
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId of service_sub_categories',
    },
  })
  serviceSubCategoryId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

class DateSlot {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  day: string;
}

class Slot {
  @Prop({ required: true })
  dateSlot: DateSlot;

  @Prop({ required: true })
  timeSlot: string;
}

@Schema({ timestamps: true, collection: 'orders' })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ type: Slot, required: true })
  slot: Slot;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    required: true,
    default: 'PENDING',
    enum: ORDER_STATUS,
  })
  status: string;

  @Prop({
    required: true,
    default: 'PENDING',
    enum: PAYMENT_STATUS,
  })
  paymentStatus: string;

  @Prop({ type: Date, default: Date.now })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
