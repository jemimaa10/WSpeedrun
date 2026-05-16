import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.game.findMany();
  }

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { game_id: id },
      include: {
        categories: true, 
      },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: {
        game_id: uuidv4(), 
        ...createGameDto,
      },
    });
  }


  async update(id: string, updateGameDto: UpdateGameDto) {
    const existingGame = await this.prisma.game.findUnique({
      where: {
        game_id: id,
      },
    });

    if (!existingGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return this.prisma.game.update({
      where: {
        game_id: id,
      },
      data: updateGameDto,
    });
  }

  async remove(id: string) {
    const existingGame = await this.prisma.game.findUnique({
      where: {
        game_id: id,
      },
    });

    if (!existingGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    await this.prisma.game.delete({
      where: {
        game_id: id,
      },
    });

    return {
      message: `Game with ID ${id} deleted successfully`,
    };
  }
}