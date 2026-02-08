import { Global, Module } from "@nestjs/common";
import { LoggerInstance } from "./logs";

@Global()
@Module({
    imports:[],
    exports:['LOGGER'],
    providers:[ {
      provide: 'LOGGER',
      useValue: LoggerInstance
    }],
})

export class LogModule{}