import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRunDto {
  @IsString()
  @IsNotEmpty()
  run_category_id!: string;

  @IsString()
  @IsNotEmpty()
  vod_url!: string;

  @IsNumber()
  @IsNotEmpty()
  run_duration!: number;
}