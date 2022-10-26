export class ImageInfo {
  constructor(public originalName: string, public filename: string) {}
}

export class FilteredFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
