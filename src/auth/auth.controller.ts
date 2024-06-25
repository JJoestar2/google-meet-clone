import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

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
  register(@Body() authData: AuthPayloadDto) {
    return this.authService.register(authData);
  }
}
