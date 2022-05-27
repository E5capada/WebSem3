import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PostsModule,
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.ConnectionURI,
      apiKey: process.env.APIKey,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'web-6th-sem',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
