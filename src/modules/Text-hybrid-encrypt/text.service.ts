import { Injectable, InternalServerErrorException, NotFoundException,Req,Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TextModel } from "./text.model";
import { TextDto, TextResponseDto } from "./text.dto";
import { plainToInstance } from "class-transformer";
import { AuthModel } from "../user/auth-model";
import { ChatGateway } from "./websocket";
import { LoggerInstance } from "src/utils/logs";

@Injectable()
export class TextService{

constructor(@Inject('LOGGER')private logger:typeof LoggerInstance,@InjectModel(ChatGateway)private chatGateway:ChatGateway ,@InjectModel(TextModel) private textModel:typeof TextModel, @InjectModel(AuthModel) private authModel:typeof AuthModel){}
async createText(textDto:TextDto):Promise<TextResponseDto>{
        try{const text = await this.textModel.create({
            secretText: textDto.secretText
        })
        if(!text){
            throw new InternalServerErrorException('failed to create text')
        }
        return plainToInstance(TextResponseDto, text.get({plain:true}))}
        catch(err){
            this.logger.error(err)
            throw new InternalServerErrorException()
        }
    };

   async shareText(textId:string,recipientName:string,senderId: string ){
    try{
        const text= await this.textModel.findOne({where:{id:textId}})
        if(!text){
            throw new NotFoundException('cannot find text or shit id')
        }
        const user = await this.authModel.findOne({where:{username:recipientName}})
        if(!user){
            throw new NotFoundException('cannot find user')
        }
        const targetSocketId = this.chatGateway.getSocketId(user.id)
        if(!targetSocketId){
            throw new InternalServerErrorException('user not connected')
        }
        this.chatGateway.server.to(targetSocketId).emit('share-text',{
            message:text.secretText as string,
            from: senderId as string
        })
    }
    catch(err){
        this.logger.error(err)
        throw new InternalServerErrorException(err)}
    }
};
