import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { TextService } from "./text.service";
import { TextDto } from "./text.dto";
import { JwtGuard } from "src/common/guards/auth-guard";

@Controller('text')
export class TextController{

constructor(private textService: TextService){}
@Post('/createText')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@HttpCode(201)
createText(@Body() textDto:TextDto){
    return this.textService.createText(textDto)}

}