import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RedisService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async saveUser(user) {
    const key = `${(Math.random() + 1).toString(36).substring(7)}`;
    await this.cacheManager.set(key, JSON.stringify(user));
    return key;
  }

  async getUser(key: string) {
    return await this.cacheManager.get(key);
  }

  async updateUser(key, user) {
    if (!(await this.cacheManager.get(key))) {
      throw new BadRequestException();
    }

    await this.cacheManager.del(key);
    return await this.cacheManager.set(key, JSON.stringify(user));
  }

  async deleteUser(key) {
    return await this.cacheManager.del(key);
  }

  async getAllUsers() {
    const keys = await this.cacheManager.store.keys();
    const users = [];
    for (const key of keys) {
      const user = JSON.parse(await this.cacheManager.get(key));
      users.push({ key, ...user });
    }

    return users;
  }

  async set(key, user) {
    await this.cacheManager.set(key, user);
  }
}
