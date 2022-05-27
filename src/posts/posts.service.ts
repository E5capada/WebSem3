import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Posts, PrismaClient } from '@prisma/client';
import { PostDto } from './dto/post-dto';

const prisma = new PrismaClient();

@Injectable()
export class PostsService {
  async getPosts(): Promise<Posts[]> {
    const posts = await prisma.posts.findMany();
    return posts;
  }

  async getPost(id: number): Promise<Posts> {
    if (!+id)
      throw new HttpException('Article ID Provided is not a number!', 400);
    const post = await prisma.posts.findUnique({
      where: {
        id: +id, // +id is a hack to convert id from string to number
      },
    });
    if (post) {
      return post;
    }
    throw new NotFoundException("Article doesn't exist!");
  }

  async getPostByUser(id: number): Promise<Posts[]> {
    if (!+id)
      throw new HttpException('Author ID Provided is not a number!', 400);

    const user = await prisma.posts.findUnique({
      where: {
        id: +id,
      },
    });
    if (!user) throw new NotFoundException("User doesn't exist!");

    const post = await prisma.posts.findMany({
      where: {
        authorId: +id,
      },
    });
    return post;
  }

  async getPostByTitle(title: string): Promise<Posts[]> {
    if (typeof title == 'string')
      throw new HttpException('Title is not a string!', 400);

    const post = await prisma.posts.findMany({
      where: {
        title: title,
      },
    });
    return post;
  }

  async createPost(articleDto: PostDto): Promise<Posts> {
    const { title, content, authorId } = articleDto;
    if (!+authorId)
      throw new HttpException('Author ID Provided is not a number!', 400);
    const post = await prisma.posts.create({
      data: {
        title: title,
        content: content,
        authorId: +authorId,
      },
    });

    return post;
  }

  async updatePost(id: number, articleDto: PostDto): Promise<Posts> {
    const { title, content, authorId } = articleDto;
    const post = await prisma.posts.update({
      where: {
        id: +id,
      },
      data: {
        title: title,
        content: content,
        authorId: +authorId,
      },
    });
    return post;
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.getPost(id);
    if (post) {
      await prisma.posts.delete({ where: { id: +id } });
    }
  }

  async getPublishedPosts(): Promise<Posts[]> {
    const posts = await prisma.posts.findMany({
      where: {
        published: true,
      },
      include: { author: true, comments: true },
    });
    return posts;
  }

  async getPostWithComments(id: number) {
    const post = await prisma.posts.findUnique({
      where: {
        id: +id,
      },
      include: { author: true, comments: { include: { author: true } } },
    });
    return post;
  }
}
