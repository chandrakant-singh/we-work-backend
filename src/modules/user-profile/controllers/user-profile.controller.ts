import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserProfile } from '../schemas/user-profile.schema';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileDto } from '../dto/user-profile.dto';
import { Public } from '../../../shared/decorators/public.decorator';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: UserProfileDto) {
    return this.userProfileService.create(createUserDto);
  }

  @Public()
  @Patch(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateData: Partial<UserProfile>,
  ) {
    return this.userProfileService.updateUserProfile(id, updateData);
  }

  @Public()
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userProfileService.getUser(id);
  }

  @Public()
  @Get(':id')
  async getUserWithAddress(@Param('id') id: string) {
    return this.userProfileService.getUseProfileWithAddress(id);
  }

  @Public()
  @Get()
  async findAll() {
    return this.userProfileService.findAll();
  }
}
