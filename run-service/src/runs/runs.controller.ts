import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRunDto: CreateRunDto, @Request() req) {
    return this.runsService.create(createRunDto, req.user);
  }

  @Get(':id/category')
  findByCategory(@Param('id') id: string) {
    return this.runsService.findByCategory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/user')
  findByUser(@Param('id') id: string, @Request() req) {
    return this.runsService.findByUser(id, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }
}