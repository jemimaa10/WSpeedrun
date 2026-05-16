import { Body, Controller,Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('games')
  findAll() { return this.gamesService.findAll(); }

  @Get('games/:id')
  findOne(@Param('id') id: string) { return this.gamesService.findOne(id); }

  // Gunakan Guard di bawah ini untuk mengunci endpoint Admin
  @Post('admin/games')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Patch('admin/games/:id/update')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete('admin/games/:id/delete')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}