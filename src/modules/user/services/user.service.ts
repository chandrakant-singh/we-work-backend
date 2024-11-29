/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { UserProfile } from '../../user-profile/schemas/user-profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) { }

  async create(createUserDto: UserDto): Promise<User> {
    // Create user
    // const createdUser = new this.userModel(createUserDto);
    // return createdUser.save();

    // try {
    //   console.log("createdUser", createUserDto);

    //   const createdUser = new this.userModel(createUserDto);
    //   console.log(createdUser);
    //   return await createdUser.save();
    // } catch (error) {
    //   if (error.name === 'ValidationError') {
    //     throw new BadRequestException(error.message); // Map to 400 error
    //   }
    //   throw error; // Rethrow for other unhandled errors
    // }
    const session = await this.userModel.db.startSession();
    session.startTransaction();
    try {
      // Step 1: Create user profile
      const createdUserProfile = await this.userProfileModel.create(
        [
          {
            // email: createUserDto.email ?? null,
            contactNumber: createUserDto.contactNumber,
          },
        ],
        // { session },
      );

      // Step 2: Create user and link profileId
      const createdUser = await this.userModel.create(
        [{ ...createUserDto, profileId: createdUserProfile[0]._id }],
        // { session },
      );

      // Step 3: Create user profile
      await this.userProfileModel.findByIdAndUpdate(
        createdUserProfile[0]._id,
        { userId: createdUser[0]._id },
      )
        // .session(session)
        .exec();

      // Commit the transaction
      // await session.commitTransaction();

      return createdUser[0];
    } catch (error) {
      // Rollback transaction in case of error
      // await session.abortTransaction();
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message); // Map to 400 error
      }
      throw error; // Rethrow for other unhandled errors
    } finally {
      session.endSession();
    }
  }

  // Update user method
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }, // returns the updated document
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        // Throwing NOT_FOUND error directly
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      // This catch block will handle actual errors, such as database connection issues
      if (error instanceof HttpException) {
        // Re-throw any HttpException without changing it
        throw error;
      }
      throw new HttpException(
        `Failed to retrieve user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByUserName(userName: string): Promise<User> {
    const user = await this.userModel.findOne({ userName }).exec();
    if (!user) {
      // Throwing NOT_FOUND error directly
      throw new HttpException(
        `User with UserId ${userName} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
