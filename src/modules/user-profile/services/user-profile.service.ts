import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from '../schemas/user-profile.schema';
import { Model } from 'mongoose';
import { UserProfileDto } from '../dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) {}

  async create(createUserProfileDto: UserProfileDto) {
    const createUserProfile = new this.userProfileModel(createUserProfileDto);
    return createUserProfile.save();
  }

  // Update UserProfile method
  async updateUserProfile(
    id: string,
    updateData: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const updatedUser = await this.userProfileModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }, // returns the updated document
    );

    if (!updatedUser) {
      throw new NotFoundException(`UserProfile with ID ${id} not found`);
    }

    return updatedUser;
  }

  async getUser(id: string): Promise<UserProfile> {
    try {
      const userProfile = await this.userProfileModel.findById(id).exec();
      if (!userProfile) {
        // Throwing NOT_FOUND error directly
        throw new HttpException(
          `UserProfile with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return userProfile;
    } catch (error) {
      // This catch block will handle actual errors, such as database connection issues
      if (error instanceof HttpException) {
        // Re-throw any HttpException without changing it
        throw error;
      }
      throw new HttpException(
        `Failed to retrieve userProfile: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileModel.find().exec();
  }
}
