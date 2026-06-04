import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string; 

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string; 
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}