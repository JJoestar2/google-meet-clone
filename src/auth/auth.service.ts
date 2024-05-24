import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async signIn({ email, password }: AuthPayloadDto) {
        const user = await this.usersService.findOne(email);

        // todo add password transofr to hash to check hashes

        if (!user) throw new NotFoundException();
        if (user.password !== password) throw new UnauthorizedException();

        const payload = { sub: user.id, username: user.name };

        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
