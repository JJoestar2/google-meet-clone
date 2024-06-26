import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { RegisterPayloadDto, AuthPayloadDto } from './dto';

@Injectable()
export class AuthService {

    saltOrRounds: number = 10;

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async signIn({ email, password }: AuthPayloadDto) {
        const user = await this.usersService.getByEmail(email);
        const isPasswordMatched = await bcrypt.compare(password, user?.password);

        if (!user) return null;
        if (!isPasswordMatched) throw new UnauthorizedException();

        const payload = {
            sub: user._id,
            username: user.name,
            email: user.email,
            avatar: user.avatar,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user
        }
    }

    async register(userData: RegisterPayloadDto) {
        const hashedPassword = await bcrypt.hash(userData.password, this.saltOrRounds);
        const user = await this.usersService.create({
            ...userData,
            password: hashedPassword,
        });

        const payload = {
            sub: user._id,
            username: user.name,
            email: user.email,
            avatar: user.avatar,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user,
        }
    }
}
