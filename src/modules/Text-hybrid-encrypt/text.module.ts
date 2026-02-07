import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TextModel } from "./text.model";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";
import { GuardModule } from "src/common/guards/guards-module";
import { AuthModule } from "../user/auth.module";

@Module({
    imports:[SequelizeModule.forFeature([TextModel]),GuardModule,AuthModule],
    providers:[TextService],
    controllers:[TextController],
    exports:[SequelizeModule]
})

export class TextModule{}