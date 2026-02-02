import { Exclude,Expose, Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsString, MinLength,MaxLength,IsEmail,IsEnum,IsNumber,Min,Max, Matches} from 'class-validator'
import { Trim } from 'src/common/decorators/trim';

export class SignupDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Trim()
  username: string;
  
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(8)
  @MaxLength(100)
  password: string;
  
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

