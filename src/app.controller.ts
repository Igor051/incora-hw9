import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('db')
  // async getFromDb() {
  //   return this.appService.getFromDb();
  // }
  //
  // @Post('db')
  // async saveToDb() {
  //   return this.appService.saveToDb();
  // }

  // @Post('redis')
  // async saveUser(@Body() user: CreateUserDto) {
  //   return this.appService.saveUser(user);
  // }
  //
  // // @Get('redis/:key')
  // // async getUser(@Param() { key }) {
  // //   return this.appService.getUser(key);
  // // }
  //
  // @Put('redis')
  // async updateUser(@Body() body: UpdateUserDto) {
  //   return this.appService.updateUser(body);
  // }
  //
  // @Delete('redis/:key')
  // async deleteUser(@Param() { key }) {
  //   return this.appService.deleteUser(key);
  // }
}
