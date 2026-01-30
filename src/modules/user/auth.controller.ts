import { Body, ClassSerializerInterceptor, Controller, HttpCode,Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDto, SignupDto } from './auth.dto';
import { JwtGuard } from 'src/common/guards/auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

@Post('signup')
@UseInterceptors(ClassSerializerInterceptor)
@HttpCode(201)
    signupUser(@Body() dto:SignupDto){
       return this.authService.signup(dto)
      
    }
@Post('login')
@UseInterceptors(ClassSerializerInterceptor)
@HttpCode(201)
    loginUser(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}
