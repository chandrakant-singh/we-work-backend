// src/address/address.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true, collection: 'addresses' })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ enum: ['home', 'work', 'other'], default: 'home' })
  addressType: string;

  @Prop({ type: Types.ObjectId, ref: 'user_profile' })
  profile: Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
