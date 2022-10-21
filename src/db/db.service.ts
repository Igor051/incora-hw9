import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async saveToDb() {
    let users = await this.redisService.getAllUsers();

    const foundData = await this.usersRepository.find();
    const foundKeys = foundData.map(({ key }) => key);
    users = users.filter((user) => {
      return !foundKeys.includes(user.key);
    });

    const insertResult = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute();

    return insertResult.raw;
  }

  async getFromDb() {
    const users = await this.usersRepository.find();

    for (const user of users) {
      const key = user.key;

      await this.redisService.set(key, JSON.stringify(user));
    }

    return users;
  }
}
