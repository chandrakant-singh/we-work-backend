// src/user-profile/user-profile.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true, collection: 'user_profiles' })
export class UserProfile {
  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true, unique: true })
  contactNumber: string;

  @Prop({ required: false, unique: false })
  email: string;

  @Prop({ type: Date })
  dateOfBirth?: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'users',
    required: false,
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for user',
    },
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'addresses',
    required: false,
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for Address',
    },
  })
  addresses: Types.ObjectId[];

  @Prop()
  profileImageUrl?: string;

  // Role-specific fields for 'partner' or 'admin'
  @Prop()
  companyName?: string;

  @Prop()
  position?: string;

  @Prop()
  bio?: string;

  // Preferences or other settings
  @Prop({ default: [] })
  preferences?: string[];
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
