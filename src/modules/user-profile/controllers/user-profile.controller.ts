import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserProfile } from '../schemas/user-profile.schema';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileDto } from '../dto/user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async create(@Body() createUserDto: UserProfileDto) {
    return this.userProfileService.create(createUserDto);
  }

  @Patch(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateData: Partial<UserProfile>,
  ) {
    return this.userProfileService.updateUserProfile(id, updateData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userProfileService.getUser(id);
  }

  @Get()
  async findAll() {
    return this.userProfileService.findAll();
  }
}
