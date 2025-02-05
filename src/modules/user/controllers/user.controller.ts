import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { Public } from '../../../shared/decorators/public.decorator';
import { SetPasswordDto } from '../dto/user-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(id, updateData);
  }

  @Public()
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Get('username/:userName')
  async getUserByUserName(@Param('userName') userName: string) {
    return this.userService.findAndCreateUserByUserName(userName);
  }

  @Public()
  @Patch(':userId/set-password')
  @HttpCode(HttpStatus.OK)
  async setUserPassword(
    @Param('userId') userId: string,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    return this.userService.setPassword(userId, setPasswordDto);
  }
}
