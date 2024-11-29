import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'carts', timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      serviceSubCategoryId: {
        type: Types.ObjectId,
        ref: 'ServiceSubCategory',
        required: true,
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ])
  items: Array<{
    serviceSubCategoryId: Types.ObjectId;
    quantity: number;
    price: number;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
