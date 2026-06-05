import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('games')
  @ApiOperation({ summary: 'Get all games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('games/:id')
  @ApiOperation({ summary: 'Get game by ID' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Post('admin/games')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new game (Admin only)' })
  @ApiBody({ type: CreateGameDto })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Patch('admin/games/:id/update')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update game (Admin only)' })
  @ApiBody({ type: UpdateGameDto })
  update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete('admin/games/:id/delete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete game (Admin only)' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}