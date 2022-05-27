import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger();

export class DataGenerator {
  async generateData() {
    const users = await prisma.user.findMany();
    const posts = await prisma.posts.findMany();

    if (users.length === 0) {
      logger.log('Generating users...');
      const user1 = await prisma.user.create({
        data: {
          email: 'user1@test.com',
          name: 'User 1',
        },
      });
      const user2 = await prisma.user.create({
        data: {
          email: 'user2@test.com',
          name: 'User 2',
        },
      });
      const user3 = await prisma.user.create({
        data: {
          email: 'user3@test.com',
          name: 'User 3',
        },
      });

      if (posts.length === 0) {
        logger.log('Generating posts...');
        const post1 = await prisma.posts.create({
          data: {
            title: 'Article 1',
            content: 'Content 1',
            authorId: user1.id,
          },
        });
        const post2 = await prisma.posts.create({
          data: {
            title: 'Article 2',
            content: 'Content 2',
            authorId: user1.id,
          },
        });
        const post3 = await prisma.posts.create({
          data: {
            title: 'Article 3',
            content: 'Content 3',
            authorId: user1.id,
          },
        });
        const post4 = await prisma.posts.create({
          data: {
            title: 'Article 4',
            content: 'Content 4',
            authorId: user1.id,
          },
        });
        const post5 = await prisma.posts.create({
          data: {
            title: 'Article 5',
            content: 'Content 5',
            authorId: user2.id,
          },
        });
        const post6 = await prisma.posts.create({
          data: {
            title: 'Article 6',
            content: 'Content 6',
            authorId: user2.id,
          },
        });
        const post7 = await prisma.posts.create({
          data: {
            title: 'Article 7',
            content: 'Content 7',
            authorId: user3.id,
          },
        });
        const post8 = await prisma.posts.create({
          data: {
            title: 'Article 8',
            content: 'Content 8',
            authorId: user3.id,
          },
        });
        const post9 = await prisma.posts.create({
          data: {
            title: 'Article 9',
            content: 'Content 9',
            authorId: user3.id,
          },
        });
      }
    }
  }
}
