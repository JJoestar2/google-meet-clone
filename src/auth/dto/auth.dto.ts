import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthPayloadDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsBoolean()
    @IsOptional()
    rememberMe?: boolean;
}