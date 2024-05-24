import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({
      secret: 'abc23',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    UsersModule,
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
