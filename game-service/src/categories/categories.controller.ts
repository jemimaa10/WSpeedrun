import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Tambahkan ini
import { RolesGuard } from '../auth/roles.guard'; // Tambahkan ini
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Publik: Diakses oleh Guest [cite: 89, 142]
  @Get('categories/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // Admin Only: Dikunci dengan Guard [cite: 148]
  @Post('admin/categories')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Admin Only: Dikunci dengan Guard [cite: 152]
  @Patch('admin/categories/:id/update')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // Admin Only: Dikunci dengan Guard [cite: 155]
  @Delete('admin/categories/:id/delete')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}