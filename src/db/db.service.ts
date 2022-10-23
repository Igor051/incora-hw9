import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async saveToDb(): Promise<{ id: number }[]> {
    const users = await this.redisService.getAllUsers();

    const insertResult = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .orIgnore()
      .execute();

    return insertResult.raw;
  }

  async getFromDb(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: { key: true, firstName: true, lastName: true },
    });

    await this.redisService.mSet(users);

    return users;
  }
}
