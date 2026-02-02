import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TextModel } from "./text.model";

@Module({
    imports:[SequelizeModule.forFeature([TextModel])],
    providers:[],
    exports:[SequelizeModule]
})

export class TextModule{}