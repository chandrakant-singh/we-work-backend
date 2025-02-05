// src/address/address.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true, collection: 'addresses' })
export class Address {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  contactNumber: string;

  /**
   * addressLine1: Flat, House no., Building, Company, Apartment
   */
  @Prop({ required: true })
  addressLine1: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  /**
   * addressLine2: Area, Street, Sector, Village
   */
  @Prop({ required: true })
  addressLine2: string;

  @Prop({ enum: ['home', 'work', 'other'], default: 'home' })
  addressType: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'user_profiles',
    required: true,
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for profile',
    },
  })
  profileId: Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
