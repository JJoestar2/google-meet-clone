import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthPayloadDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

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

        const payload = { sub: user._id, username: user.name };

        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }

    async register(userData: AuthPayloadDto) {
        const hashedPassword = await bcrypt.hash(userData.password, this.saltOrRounds);
        const user = await this.usersService.create({
            ...userData,
            password: hashedPassword,
        });

        const payload = { sub: user._id, username: user.name };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user,
        }
    }
}
