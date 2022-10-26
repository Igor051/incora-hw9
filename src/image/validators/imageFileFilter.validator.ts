import { FilteredFile } from '../dto/image.dto';
import { ValidatorsErrors } from '../constants/errorMessages.constants';
import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (
  req,
  file: FilteredFile,
  callback: (error: Error, acceptFile: boolean) => void,
): void => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException(ValidatorsErrors.ONLY_IMAGE_FILES),
      false,
    );
  }
  callback(null, true);
};
