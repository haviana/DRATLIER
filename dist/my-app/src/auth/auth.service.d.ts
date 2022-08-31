import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private readonly userRepository;
    private jwtService;
    constructor(usersService: UsersService, userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
