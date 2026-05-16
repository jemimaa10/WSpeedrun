import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  game_name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;
}