import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'negotiations' })
export class Negotiation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Quotation', required: true })
  quotationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [{ offer: Number, by: String, timestamp: Date }],
    required: true,
  })
  offers: Array<{ offer: number; by: 'CUSTOMER' | 'ADMIN'; timestamp: Date }>; // Negotiation history

  @Prop({ default: false })
  isFinalized: boolean;
}

export const NegotiationSchema = SchemaFactory.createForClass(Negotiation);
