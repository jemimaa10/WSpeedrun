import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'b49c648f-93bb-4d9a-b6c3-a1fa77c07c83',
    description: 'ID game yang akan memiliki kategori ini',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  game_id!: string;

  @ApiProperty({
    example: 'Any%',
    description: 'Nama kategori speedrun',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  run_category_name!: string;
}