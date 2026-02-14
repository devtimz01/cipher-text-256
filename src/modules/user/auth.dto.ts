import { Exclude,Expose, Transform, Type } from 'class-transformer'
import { IsNotEmpty,IsArray, IsString, MinLength,MaxLength,IsEmail,IsEnum,IsNumber,Min,Max, Matches, IsOptional} from 'class-validator'
import { Trim } from 'src/common/decorators/trim';

export class SignupDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Trim()
  username: string;
  
  @IsEmail()
  @IsOptional()
  @Trim()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Trim()
  identityPreKey: string;
  
  @IsNotEmpty()
  @IsString()
  @Trim()
  signedPreKey: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Trim()
  oneTimePreKeys: string;
  
  @IsNotEmpty()
  @IsString()
  @Trim()
  signedPreKeySignature: string;

};

export class LoginDto{

    @IsNotEmpty()
    @IsString()
    @Trim()
    username:string

    @IsNotEmpty()
    @IsString()
    @Trim()
    password:string


}
export class keyPairQueryDto{
  @IsOptional()
  @IsString()
  @Trim()
  username:string

}

export class SignupResponseDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  isEmailVerified: boolean;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  
  @Exclude()
  password: string;
  
};

export class LoginResponseDto{
  @Expose()
    validUser:{
        username:string;
        id:string;
    };
    @Expose()
    accessToken: string;
    @Expose()
    refreshToken:string;
    
}

export class keyPairsResponsetDto{
  @Expose()
  Identity_Key: string
  @Expose()
  Signed_PreKey: string
  @Expose()
  OneTime_PreKeys: string
  @Expose()
  Signed_PreKey_Signature: string[]

}



