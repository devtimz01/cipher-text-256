import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException,Scope, BadRequestException,Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from 'jsonwebtoken'
import { Auth } from "src/modules/user/auth.interface";
import { AuthModel } from "src/modules/user/auth-model";
import { InjectModel, } from "@nestjs/sequelize";
import { LoggerInstance } from "src/utils/logs";

@Injectable()
export class JwtGuard implements CanActivate{
    constructor(@Inject('LOGGER')private logger:typeof LoggerInstance,  private configService: ConfigService, @InjectModel(AuthModel) private authModel:typeof AuthModel){}
    async canActivate(context: ExecutionContext):Promise<boolean> {
        let request = context.switchToHttp().getRequest()
        let token:string;
        if(!request.headers.authorization && !request.headers.authorization.startsWith('Bearer')){
            throw new BadRequestException()
        }
        token =request.headers.authorization.split(' ')[1]
            if(!token){
                throw new NotFoundException('token not found')
            }
        try{
           const secret = this.configService.get<string>('jwt_secret') as string
           const decoded= jwt.verify(token,secret) as Auth
           const user = await this.authModel.findByPk(decoded.id,{attributes:['id','username']})
             if(!user){
                throw new Error('user not found')
             }
           request.user = user.get({plain:true})
           return true;
    }
        catch(error){
             this.logger.error(error)
            throw new UnauthorizedException("invalid or expired token")
        }
    }
}