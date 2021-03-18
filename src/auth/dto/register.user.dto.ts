import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'k1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'k1@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: '+254723989067' })
  @IsOptional()
  phone: string;
}
