import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { constants } from 'buffer';
import { jwtConstants } from './constants';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    console.log(jwtConstants.secret);
    console.log(process.env.SECRET_KEY);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
