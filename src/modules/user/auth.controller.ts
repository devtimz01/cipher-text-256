import { Body, ClassSerializerInterceptor, Controller, HttpCode,Post, UseGuards,Get, UseInterceptors,Req } from '@nestjs/common';
import { Options, Header, Param, Query } from '@nestjs/common/decorators/http';
import { AuthService } from './auth.service';
import {  keyPairQueryDto, LoginDto, SignupDto } from './auth.dto';
import { JwtGuard } from 'src/common/guards/auth-guard';
import type { AuthenticatedRequest } from './auth.interface';

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
@Get('getkeypairs')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@HttpCode(201)
    getKeyPairs(@Query() query: keyPairQueryDto, @Req() req:AuthenticatedRequest){
        return this.authService.getuserBKeyPairs(query,req.user.username )
    }
}

