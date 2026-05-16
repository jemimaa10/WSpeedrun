import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  game_id!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  run_category_name!: string;
}