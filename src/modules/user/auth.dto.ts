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
  
  @IsNotEmpty()
  @IsEnum(['male', 'female'], { message: 'Gender must be either male or female' })
  @Trim()
  gender: 'male' | 'female';
  
  @IsNotEmpty()
  @IsNumber()
  @Trim()
  @Type(()=>Number)
  @Min(13)
  @Max(120)
  age: number;
  
  @IsNotEmpty()
  @IsNumber()
  @Trim()
  @Type(()=>Number)
  @Min(30)
  @Max(300)
  weight: number; // in kg
  
  @IsNotEmpty()
  @IsNumber()
  @Trim()
  @Type(()=>Number)
  @Min(100)
  @Max(250)
  height_cm: number;
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
  gender: 'male' | 'female';
  @Expose()
  age: number;
  @Expose()
  weight: number;
  @Expose()
  height_cm: number;
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

