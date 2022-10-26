import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendImage(image: Express.Multer.File): Promise<void> {
    await this.mailerService.sendMail({
      to: 'snigurigor05116@gmail.com',
      subject: 'image',
      attachments: [
        {
          filename: image.filename,
          path: image.path,
        },
      ],
    });
  }
}
