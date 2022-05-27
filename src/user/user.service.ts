import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Posts, PrismaClient, User } from "@prisma/client";
import { UserDto } from './dto/user-dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(id: number): Promise<User> {
    if (!+id) throw new HttpException('User ID Provided is not a number!', 400);
    const user = await prisma.user.findUnique({
      where: {
        id: +id, // +id is a hack to convert id from string to number
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException("User doesn't exist!");
  }

  async createUser(CreateUserDto: UserDto): Promise<User> {
    const { email, name } = CreateUserDto;
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });

    return user;
  }

  async updateUser(id: number, CreateUserDto: UserDto): Promise<User> {
    const { email, name } = CreateUserDto;
    const user = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        email: email,
        name: name,
      },
    });
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUser(id);
    if (user) {
      await prisma.user.delete({ where: { id: +id } });
    }
  }

  async getUsersWithPosts(): Promise<User[]> {
    return await prisma.user.findMany({ include: { posts: true } });
  }

  async getUserWithPost(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: +id, // +id is a hack to convert id from string to number
      },
      include: { posts: true, comments: true },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException("User doesn't exist!");
  }
}
