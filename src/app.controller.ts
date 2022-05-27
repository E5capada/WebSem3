import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { LoggingInterceptor } from './logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  @Get(['/', '/index.html'])
  @Render('index')
  getIndexPage() {
    return {};
  }

  @Get('enter.html')
  @Render('enter')
  getEnterPage() {
    return { registration: false };
  }

  @Get('registration.html')
  @Render('enter')
  getRegistrationPage() {
    return { registration: true };
  }

  @UseGuards(AuthGuard)
  @Get('/posts.html')
  @Render('posts')
  getPostPage(@Session() session: SessionContainer) {
    const isLoggedIn = !!session.getUserId();
    return { isLoggedIn };
  }

  @UseGuards(AuthGuard)
  @Get('/authors.html')
  @Render('authors')
  getAuthorsPage(@Session() session: SessionContainer) {
    const isLoggedIn = !!session.getUserId();
    return { isLoggedIn };
  }

  @UseGuards(AuthGuard)
  @Get('/gallery.html')
  @Render('gallery')
  getGalleryPage(@Session() session: SessionContainer) {
    const isLoggedIn = !!session.getUserId();
    return { isLoggedIn };
  }

  @UseGuards(AuthGuard)
  @Get('/toDoList.html')
  @Render('toDoList')
  getToDoListPage(@Session() session: SessionContainer) {
    const isLoggedIn = !!session.getUserId();
    return { isLoggedIn };
  }
}
