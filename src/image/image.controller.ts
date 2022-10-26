import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from './validators/imageFileFilter.validator';
import { editFileName } from './validators/editFileName.validator';
import { ImageService } from './image.service';
import { ImageInfo } from './dto/image.dto';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageInfo> {
    this.imageService.sendImageViaEmail(file);

    return new ImageInfo(file.originalname, file.filename);
  }
}
