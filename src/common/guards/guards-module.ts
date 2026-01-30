import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/modules/user/auth.module";
import { JwtGuard } from "./auth-guard";

@Module({
    imports:[AuthModule],
    providers:[JwtGuard],
    exports:[JwtGuard]
})
export class GuardModule{}