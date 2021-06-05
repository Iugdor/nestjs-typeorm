import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class CreateUserCustomerDto extends PartialType(
  OmitType(CreateUserDto, ['role']),
) {}

export class UserChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ description: "Customer's password " })
  readonly password: string;
}
