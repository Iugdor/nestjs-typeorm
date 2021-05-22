import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's name " })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's description " })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: "Product's price" })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's stock" })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's url image" })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's brand" })
  readonly brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
