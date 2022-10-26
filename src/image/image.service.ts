import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ImageService {
  constructor(private mailService: MailService) {}

  async sendImageViaEmail(image: Express.Multer.File): Promise<void> {
    await this.mailService.sendImage(image);
  }
}
