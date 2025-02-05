import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: false })
  passwordHash: string; // For storing hashed password

  @Prop()
  salt: string; //For password hashing salt, if needed

  @Prop({
    type: Types.ObjectId,
    ref: 'user_profile',
    validate: {
      validator: mongoose.isValidObjectId,
      message: 'Invalid ObjectId for profile',
    },
  })
  profileId: Types.ObjectId;

  @Prop({ required: true, default: 100 })
  role: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
