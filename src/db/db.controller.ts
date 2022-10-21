import { Controller, Get, Post } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('db')
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async getFromDb() {
    return this.dbService.getFromDb();
  }

  @Post()
  async saveToDb() {
    return this.dbService.saveToDb();
  }
}
