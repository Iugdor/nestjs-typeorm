import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: "User's email " })
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ description: "User's password " })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: "User's rol" })
  @MaxLength(100)
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
