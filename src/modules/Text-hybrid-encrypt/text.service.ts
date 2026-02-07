import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TextModel } from "./text.model";
import { TextDto, TextResponseDto } from "./text.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TextService{
    constructor(@InjectModel(TextModel) private textModel:typeof TextModel){}
    async createText(textDto:TextDto):Promise<TextResponseDto>{
        try{const text = await this.textModel.create({
            secretText: textDto.secretText
        })
        if(!text){
            throw new InternalServerErrorException('failed to create text')
        }
        return plainToInstance(TextResponseDto, text.get({plain:true}))}
        catch(err){
            //Logger.error(err)
            console.log(err)
            throw new InternalServerErrorException()
        }
    };

    async shareSecretText(){
        
    }
}