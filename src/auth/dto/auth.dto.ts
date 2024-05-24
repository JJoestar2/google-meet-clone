import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthPayloadDto {
    @IsNotEmpty()
    @Length(3)
    name?: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}