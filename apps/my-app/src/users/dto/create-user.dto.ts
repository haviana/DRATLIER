import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: 'Username', minimum: 3, default: 1 })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'Password',
    minimum: 8,
    default: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email', minimum: 8, default: 1 })
  email: string;
}
