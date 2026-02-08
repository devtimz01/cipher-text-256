import { Body, ClassSerializerInterceptor,Req, Controller, HttpCode, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { TextService } from "./text.service";
import { TextDto } from "./text.dto";
import { JwtGuard } from "src/common/guards/auth-guard";
import type{ AuthenticatedRequest } from "../user/auth.interface";

@Controller('text')
export class TextController{

constructor(private textService: TextService){}

@Post('/createText')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@HttpCode(201)
createText(@Body() textDto:TextDto){
    return this.textService.createText(textDto)}

@Post('/shareText')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@HttpCode(201)
shareText(@Body() textId:string,username:string, @Req() req:AuthenticatedRequest ){
    return this.textService.shareText(textId,username,req.user.id)}
}
