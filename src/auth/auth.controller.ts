import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterPayloadDto, AuthPayloadDto } from './dto';
import { JwtGuard } from './guards';
import { JwtUser } from './interfaces';
import { CurrentUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authData: AuthPayloadDto) {
    const user = this.authService.signIn(authData);

    if (!user) throw new HttpException('Invalid Credentials', 401);

    return user;
  }

  @Post('register')
  register(@Body() authData: RegisterPayloadDto) {
    return this.authService.register(authData);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@CurrentUser() user: JwtUser) {
    console.log('reee', user);
    return {};
  }
}
