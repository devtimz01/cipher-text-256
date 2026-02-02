import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from "src/common/decorators/trim";

export class TextDto{
    @IsString()
    @IsNotEmpty()
    @Trim()
    secretText: string;
}

export class TextResponseDto{
    @Expose()
    id: string
    @Expose()
    secretText:string
    @Expose()
    createdAt: Date
    @Expose()
    updatedAt: Date

}