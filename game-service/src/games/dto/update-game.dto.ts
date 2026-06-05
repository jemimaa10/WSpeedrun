import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGameDto {
  @ApiPropertyOptional({
    description: 'Nama game yang ingin diubah',
    example: 'Counter-Strike 2',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_name?: string;

  @ApiPropertyOptional({
    description: 'Deskripsi singkat mengenai game',
    example: 'Game shooter taktis legendaris dari Valve.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}