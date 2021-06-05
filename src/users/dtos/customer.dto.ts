import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserCustomerDto } from './user.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested()
  @IsNotEmpty()
  readonly user: CreateUserCustomerDto;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
