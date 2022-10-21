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
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { RedisService } from './redis.service';

@Controller('redis')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Delete(':key')
  async deleteUser(@Param() { key }) {
    return this.redisService.deleteUser(key);
  }

  @Get(':key')
  async getUser(@Param() { key }) {
    return this.redisService.getUser(key);
  }

  @Post()
  async saveUser(@Body() user: CreateUserDto) {
    return this.redisService.saveUser(user);
  }

  @Put(':key')
  async updateUser(@Body() user: UpdateUserDto, @Param() { key }) {
    return this.redisService.updateUser(key, user);
  }


}
