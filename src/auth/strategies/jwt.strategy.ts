import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { UsersService } from "src/users/users.service";
import { JwtUser } from "../interfaces";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false,
        } as StrategyOptions);
    }

    async validate(payload: any) {
        const user = await this.usersService.getByEmailAndUpdateActivity(payload.email);

        if (!user) return false;

        return {
            sub: user._id.toString(),
            name: user.name,
            email: user.email,
        } as JwtUser;
    }
}