import { Module } from '@nestjs/common';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { Address, AddressSchema } from './schemas/address.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileService } from '../user-profile/services/user-profile.service';
import {
  UserProfile,
  UserProfileSchema,
} from '../user-profile/schemas/user-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService, UserProfileService],
  exports: [AddressService],
})
export class AddressModule {}
