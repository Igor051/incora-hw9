import {
  BadRequestException,
  CACHE_MANAGER,
  HttpException,
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
    const keys: string[] = await this.cacheManager.store.keys();
    if (!keys.length) {
      throw new HttpException('', 204);
    }

    const values = await this.cacheManager.store.mget(...keys);
    values.filter((value) => value);
    return values.map((value, i) => {
      return { key: keys[i], ...JSON.parse(value) };
    });
  }

  async mSet(users) {
    const keysValues = [];
    for (let i = 0; i < users.length; i++) {
      keysValues.push(users[i].key);
      const { key, ...value } = users[i];
      keysValues.push(JSON.stringify(value));
    }
    await this.cacheManager.store.mset(...keysValues);
  }
}
