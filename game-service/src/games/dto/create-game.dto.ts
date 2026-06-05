import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Portal',
    description: 'Nama game',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  game_name!: string;

  @ApiProperty({
    example: 'Puzzle platform game with active speedrunning community',
    description: 'Deskripsi game',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;
}