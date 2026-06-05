import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Nama kategori perlombaan atau lari yang ingin diubah',
    example: '10K Marathon',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  run_category_name?: string;
}