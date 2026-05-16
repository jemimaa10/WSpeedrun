import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}