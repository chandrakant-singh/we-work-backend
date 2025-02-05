import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address } from '../schemas/address.schema';
import { AddressDto } from '../dto/address.dto';
import { UserProfileService } from '../../../modules/user-profile/services/user-profile.service';
import { UserProfile } from 'src/modules/user-profile/schemas/user-profile.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
    private readonly userProfileService: UserProfileService,
  ) {}

  async create(createAddressDto: AddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    const address = await createdAddress.save();
    const userprofile = await this.userProfileService.getUser(
      String(address.profileId),
    );

    if (!(userprofile?.addresses && userprofile.addresses.length)) {
      userprofile['addresses'] = [];
    }
    userprofile.addresses.push(new Types.ObjectId(address._id));
    console.log('============= ', String(address.profileId));
    this.userProfileService.updateUserProfile(String(address.profileId), {
      addresses: userprofile.addresses,
    });
    return address;
  }

  // Update Address method
  async updateAddress(
    id: string,
    updateData: Partial<Address>,
  ): Promise<Address> {
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }, // returns the updated document
    );

    if (!updatedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return updatedAddress;
  }

  async getAddressByProfileId(profileId: string): Promise<Address> {
    try {
      const address = await this.addressModel
        .findOne({
          profileId: profileId,
        })
        .exec();

      if (!address) {
        // Throwing NOT_FOUND error directly
        throw new HttpException(
          `Address with ID ${profileId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return address;
    } catch (error) {
      // This catch block will handle actual errors, such as database connection issues
      if (error instanceof HttpException) {
        // Re-throw any HttpException without changing it
        throw error;
      }
      throw new HttpException(
        `Failed to retrieve address: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAddress(id: string): Promise<Address> {
    try {
      const address = await this.addressModel.findById(id).exec();
      if (!address) {
        // Throwing NOT_FOUND error directly
        throw new HttpException(
          `Address with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return address;
    } catch (error) {
      // This catch block will handle actual errors, such as database connection issues
      if (error instanceof HttpException) {
        // Re-throw any HttpException without changing it
        throw error;
      }
      throw new HttpException(
        `Failed to retrieve address: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }
}
