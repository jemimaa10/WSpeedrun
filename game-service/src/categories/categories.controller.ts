import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { RolesGuard } from '../auth/roles.guard'; 
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('categories/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post('admin/categories')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch('admin/categories/:id/update')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete('admin/categories/:id/delete')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}