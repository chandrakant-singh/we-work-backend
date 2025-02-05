/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { UserProfile } from '../../user-profile/schemas/user-profile.schema';
import { BcryptUtils } from 'src/shared/utils/jwt/bcrypt.utils';
import { SetPasswordDto } from '../dto/user-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) { }

  async create(createUserDto: UserDto): Promise<User> {
    // const session = await this.userModel.db.startSession();
    // session.startTransaction();
    try {
      const { userName, password } = createUserDto;

      // Check if user already exists
      await this.validateUserIsExists(userName);

      // Step 1: Create user profile
      const createdUserProfile = await this.createUserProfile(createUserDto);

      // Step 2: Create user and link profileId
      const createdUser = await this.createUser(createUserDto, password, createdUserProfile);

      // Step 3: Create user profile
      this.updateUserProfile(createdUserProfile[0]._id, createdUser[0]._id);

      return createdUser[0];
    } catch (error) {
      // Rollback transaction in case of error
      // await session.abortTransaction();

      // Check for validation errors
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message); // Map to 400 error
      }

      // Check for MongoDB E11000 Duplicate Key Error
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0]; // Extract the duplicate field
        const duplicateValue = error.keyValue[duplicateField];
        throw new ConflictException(
          `Duplicate value detected: ${duplicateField} '${duplicateValue}' already exists.`,
        );
      }

      throw error; // Rethrow for other unhandled errors
    } finally {
      // session.endSession();
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
        throw new NotFoundException(`User with ID ${id} not found`);
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
      throw new NotFoundException(`User with UserId ${userName} not found`);
    }
    return user;
  }

  async findAndCreateUserByUserName(userName: string): Promise<User> {
    const user = await this.userModel.findOne({ userName }, { passwordHash: 0, salt: 0 }).exec();
    if (!user) {
      const userDto = new UserDto();
      userDto.userName = userName;
      userDto.contactNumber = userName;
      return await this.create(userDto);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async setPassword(userId: string, setPasswordDto: SetPasswordDto): Promise<any> {
    const { password, firstName } = setPasswordDto;
    if (!password) {
      throw new BadRequestException('Password is required');
    };

    // Generate salt and hash password
    const { salt, passwordHash } = password ? await BcryptUtils.hashPassword(password) : { salt: '', passwordHash: '' };

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { passwordHash, salt, isActive: passwordHash ? true : false },
      { new: true },
    ).exec();

    await this.userProfileModel.findByIdAndUpdate(
      user.profileId,
      { firstName: firstName },
    ).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return "User password updated successfully";
  }

  private async createUserProfile(createUserDto: UserDto): Promise<any> {
    return await this.userProfileModel.create(
      [
        {
          contactNumber: createUserDto.contactNumber,
        },
      ],
    );
  }

  private async updateUserProfile(profileId: string, userId: string): Promise<any> {
    await this.userProfileModel.findByIdAndUpdate(
      { _id: profileId },
      { userId: userId },
    ).exec();
  }

  private async createUser(createUserDto: UserDto, password: string, createdUserProfile: any): Promise<any> {
    // Generate salt and hash password
    const { salt, passwordHash } = password ? await BcryptUtils.hashPassword(password) : { salt: '', passwordHash: '' };
    return await this.userModel.create(
      [{
        ...createUserDto,
        passwordHash,
        salt,
        isActive: passwordHash ? true : false,
        profileId: createdUserProfile[0]._id
      }],
    );
  }

  private async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch;
  }

  // Validate user
  private async validateUserIsExists(userName: string): Promise<any> {
    const existingUser = await this.userModel.findOne({ userName }).exec();
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
  }

}
