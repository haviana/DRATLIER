import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { MyAppService } from './my-app.service';

@Controller()
export class MyAppController {
  constructor(
    private readonly myAppService: MyAppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.myAppService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
