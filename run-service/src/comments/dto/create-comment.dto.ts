import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'a1b2c3d4-run-id-example-1234' })
  @IsString()
  @IsNotEmpty()
  run_id!: string; // Tambahkan tanda seru (!) di sini

  @ApiProperty({ example: 'user-id-kamu-yang-lagi-login' })
  @IsString()
  @IsNotEmpty()
  user_id!: string; // Tambahkan tanda seru (!) di sini

  @ApiProperty({ example: 'Keren banget run-nya, rapi dan cepat!' })
  @IsString()
  @IsNotEmpty()
  comment!: string; // Tambahkan tanda seru (!) di sini
}