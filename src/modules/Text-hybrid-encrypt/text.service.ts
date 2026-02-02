import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TextModel } from "./text.model";
import { TextDto } from "./text.dto";

@Injectable()
class TextService{
    constructor(@InjectModel(TextModel) private textModel:typeof TextModel){}
    async createText(textDto:TextDto){
        const text = await this.textModel.create({textDto})
        text.secretText
    };
    
    async shareSecretText(){}
}