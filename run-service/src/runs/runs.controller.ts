// import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { RunsService } from './runs.service';
// import { CreateRunDto } from './dto/create-run.dto';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('runs')
// export class RunsController {
//   constructor(private readonly runsService: RunsService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post()
//   create(@Body() createRunDto: CreateRunDto, @Request() req) {
//     return this.runsService.create(createRunDto, req.user);
//   }

//   @Get(':id/category')
//   findByCategory(@Param('id') id: string) {
//     return this.runsService.findByCategory(id);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get(':id/user')
//   findByUser(@Param('id') id: string, @Request() req) {
//     return this.runsService.findByUser(id, req.user);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.runsService.findOne(id);
//   }
// }


import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Runs')
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new run entry (Authenticated User)' })
  async createRun(@Body() createRunDto: CreateRunDto, @Request() req: any) {
    // user_id diambil otomatis dari extract JWT token login
    const userId = req.user.userId;
    return this.runsService.create(createRunDto, userId);
  }

  @Get(':id/category')
  @ApiOperation({ summary: 'List of all accepted runs by run category ordered by duration ascending' })
  @ApiParam({ name: 'id', description: 'Run Category ID (UUID)' })
  async getLeaderboardByCategory(@Param('id') categoryId: string) {
    return this.runsService.findLeaderboardByCategory(categoryId);
  }

  @Get(':id/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List of all runs submitted by the specified user' })
  @ApiParam({ name: 'id', description: 'Target User ID (UUID)' })
  async getUserRunHistory(@Param('id') targetUserId: string, @Request() req: any) {
    const authenticatedUserId = req.user.userId;
    return this.runsService.findRunHistoryByUser(targetUserId, authenticatedUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full details of a specific run' })
  @ApiParam({ name: 'id', description: 'Run ID (UUID)' })
  async getRunDetails(@Param('id') runId: string) {
    return this.runsService.findOneDetails(runId);
  }
}