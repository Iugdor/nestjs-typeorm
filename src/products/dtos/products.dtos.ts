import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FilterDto } from '../../common/dtos/filter.dto';
import { Between } from 'typeorm';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's name " })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Product's description " })
  readonly description: string;

  @IsPositive()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: "Product's price" })
  readonly price: number;

  @IsPositive()
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

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: "Produt's cateogries" })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto extends FilterDto {
  @IsOptional()
  @IsPositive()
  minPrice: number;

  @IsOptional()
  @IsPositive()
  maxPrice: number;
}

export const FilterACTIONS = {
  price: ({ minPrice, maxPrice }) => {
    Between(minPrice, maxPrice);
  },
};
