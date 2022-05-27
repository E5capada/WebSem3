import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get All Users',
  })
  @Get('allUsers')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @ApiOperation({
    summary: 'Get user by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Invlaid ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'User does not exist!',
  })
  @Get('allUsers/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'User Created!',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create')
  async createUser(@Body() CreateUserDto: UserDto): Promise<User> {
    return await this.userService.createUser(CreateUserDto);
  }

  @ApiOperation({
    summary: 'Update user by ID',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put('allUsers/:id/update')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, userDto);
  }

  @ApiOperation({
    summary: 'Delete user by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Invlaid ID format',
  })
  @Delete('allUsers/:id/delete')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Get()
  @Render('authors')
  async showUsers() {
    const users = await this.userService.getUsersWithPosts();
    return { users };
  }

  @Get('user/:id')
  @Render('author')
  async showUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserWithPost(id);
    return { user };
  }
}
