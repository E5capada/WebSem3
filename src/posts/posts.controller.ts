import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Posts } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post-dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('posts')
@UseInterceptors(LoggingInterceptor)
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({
    summary: 'Get All Posts',
  })
  @ApiResponse({
    status: 401,
    description: "You're not authorized to access this resource",
  })
  @Get('allposts')
  @UseGuards(AuthGuard)
  async getPosts(@Session() session: SessionContainer): Promise<Posts[]> {
    const userId = session.getUserId();
    console.log(userId);
    return await this.postService.getPosts();
  }

  @ApiOperation({
    summary: 'Get posts by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Invlaid ID format',
  })
  @Get('allposts/:id')
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return await this.postService.getPost(id);
  }

  @ApiOperation({
    summary: 'Get published posts',
  })
  @Get('allposts/published')
  async getPublishedPost(): Promise<Posts[]> {
    return await this.postService.getPublishedPosts();
  }

  @ApiOperation({
    summary: 'Get posts created by user using his ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Invlaid ID format',
  })
  @UseGuards(AuthGuard)
  @Get('/user/:id/userPosts')
  async getPostByUser(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: SessionContainer,
  ): Promise<Posts[]> {
    const userId = session.getUserId();
    console.log(userId);
    return await this.postService.getPostByUser(id);
  }

  @ApiOperation({
    summary: 'Get posts by title',
  })
  @ApiResponse({
    status: 400,
    description: 'Invlaid title format',
  })
  @ApiResponse({
    status: 401,
    description: 'Bad Request',
  })
  @UseGuards(AuthGuard)
  @Get('search')
  async getPostByTitle(
    @Query('title') title: string,
    @Session() session: SessionContainer,
  ): Promise<Posts[]> {
    return await this.postService.getPostByTitle(title);
  }

  @ApiOperation({
    summary: 'Create posts',
  })
  @ApiResponse({
    status: 201,
    description: 'Post Created!',
  })
  @ApiResponse({
    status: 401,
    description: 'Bad Request',
  })
  @Post('allposts/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Body() postDto: PostDto): Promise<Posts> {
    return await this.postService.createPost(postDto);
  }

  @ApiOperation({
    summary: 'Update post by ID',
  })
  @ApiResponse({
    status: 401,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 200,
    description: 'Post successfully changed',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put('allposts/:id/update')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postDto: PostDto,
  ): Promise<Posts> {
    return await this.postService.updatePost(id, postDto);
  }

  @ApiOperation({
    summary: 'Delete posts by ID',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 200,
    description: 'Post successfully deleted',
  })
  @Delete(':id/delete')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.postService.deletePost(id);
  }

  @Get()
  @Render('posts')
  async showPosts() {
    const posts = await this.postService.getPublishedPosts();
    return { posts };
  }

  @Get('post/:id')
  @Render('post')
  async showPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.getPostWithComments(id);
    return { post };
  }
}
