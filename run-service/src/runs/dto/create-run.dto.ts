import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({
    description: 'ID dari kategori run yang valid (UUID dari Game Service)',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  @IsString()
  @IsNotEmpty()
  run_category_id!: string;

  @ApiProperty({
    description: 'URL rekaman video (VOD) sebagai bukti speedrun',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @IsString()
  @IsNotEmpty()
  vod_url!: string;

  @ApiProperty({
    description: 'Total waktu penyelesaian run dalam satuan detik',
    example: 3600, // Contoh: 1 jam = 3600 detik
  })
  @IsNumber()
  @IsNotEmpty()
  run_duration!: number;
}