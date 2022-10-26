import { CacheInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { RedisModule } from './redis/redis.module';
import { DbModule } from './db/db.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ImageModule } from './image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        auth: {
          user: 'apikey',
          pass: process.env.MAILER_SECRET,
        },
      },
      defaults: {
        from: '"hw11" <incoramailer01@gmail.com>',
      },
    }),
    MulterModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'hw9',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    RedisModule,
    DbModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
