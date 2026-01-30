import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuthModel } from './auth-model';
import * as argon2 from 'argon2'
import {   JwtService } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { LoginDto, LoginResponseDto, SignupDto, SignupResponseDto } from './auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
 constructor(@InjectModel(AuthModel)private authmodel:typeof AuthModel, private jwtService:JwtService, private configService:ConfigService){}

    async signup(signupDto:SignupDto):Promise<SignupResponseDto>{
        const record= {
            where:{username:signupDto.username}
        }
        const findUser = await this.authmodel.findOne(record)
        if(findUser){
            throw new ConflictException('user already exists')
        }
        const hashedPassword= await argon2.hash(signupDto.password)
        if(!hashedPassword){
            throw new InternalServerErrorException('password not hashed')}
        const newUser = await this.authmodel.create({...signupDto,password:hashedPassword,})
        Logger.info('new user created!')
        return plainToInstance(SignupResponseDto, newUser.get({ plain: true }))
    };
    async login(loginDto:LoginDto):Promise<LoginResponseDto>{
        const validUser = await this.authmodel.findOne({where:{username:loginDto.username}})
        if(!validUser){
            throw new NotFoundException('user does not exists,signup!')
        }
        const isPasswordMatch = await argon2.verify(validUser.password as string,loginDto.password as string)
        if(!isPasswordMatch){throw new BadRequestException('wrong credentials')}
        const accessToken = await this.jwtService.signAsync({
            id: validUser.id,
            username: loginDto.username
        })
        const refreshToken = await this.jwtService.signAsync({
            id: validUser.id,
            username: loginDto.username,
        },{secret: this.configService.get<string>('jwt_secret'),expiresIn: '7d'})
        const responseData ={user:validUser.get({plain:true}),accessToken,refreshToken}
         return plainToInstance(LoginResponseDto, responseData)
    }
};
