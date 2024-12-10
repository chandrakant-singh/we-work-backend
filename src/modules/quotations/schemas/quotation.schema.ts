import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum QuotationStatus {
  PENDING = 'PENDING',
  NEGOTIATING = 'NEGOTIATING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

@Schema({ timestamps: true, collection: 'quotations' })
export class Quotation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [
      { serviceSubCategoryId: Types.ObjectId, quantity: Number, price: Number },
    ],
    required: true,
  })
  items: Array<{
    serviceSubCategoryId: Types.ObjectId;
    quantity: number;
    price: number;
  }>;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ enum: QuotationStatus, default: QuotationStatus.PENDING })
  status: QuotationStatus;

  @Prop()
  remarks?: string; // Any remarks from customer/admin

  @Prop({ default: 0 })
  finalAmount?: number; // Final negotiated price, if applicable
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
