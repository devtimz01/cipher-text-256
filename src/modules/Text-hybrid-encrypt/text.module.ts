import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TextModel } from "./text.model";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";
import { GuardModule } from "src/common/guards/guards-module";
import { AuthModule } from "../user/auth.module";
import { ChatGateway } from "./websocket";

@Module({
    imports:[SequelizeModule.forFeature([TextModel]),GuardModule,AuthModule],
    providers:[TextService,ChatGateway],
    controllers:[TextController],
    exports:[SequelizeModule,ChatGateway]
})

export class TextModule{}