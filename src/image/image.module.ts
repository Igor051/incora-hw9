import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, MailService],
  imports: [MailModule],
})
export class ImageModule {}
