import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuidv4 } from 'uuid'; // Hubungkan generator UUID
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const category = await this.prisma.runCategory.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    // Pastikan game_id yang dikirim benar-asli ada di database tabel games
    const gameExists = await this.prisma.game.findUnique({
      where: { game_id: createCategoryDto.game_id },
    });

    if (!gameExists) {
      throw new NotFoundException(`Game with ID ${createCategoryDto.game_id} not found`);
    }

    return this.prisma.runCategory.create({
      data: {
        run_category_id: uuidv4(), // Generate UUID untuk category baru
        ...createCategoryDto,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.prisma.runCategory.findUnique({
      where: { run_category_id: id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.runCategory.update({
      where: { run_category_id: id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    const existingCategory = await this.prisma.runCategory.findUnique({
      where: { run_category_id: id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.prisma.runCategory.delete({
      where: { run_category_id: id },
    });

    return {
      message: `Category with ID ${id} deleted successfully`,
    };
  }
}