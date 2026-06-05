import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RunAdminService } from './run-admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Sesuaikan path guard Anda
import { RolesGuard } from '../auth/guards/roles.guard';     // Sesuaikan path guard Anda
import { Roles } from '../auth/decorators/roles.decorator';   // Sesuaikan path decorator Anda

@ApiTags('Admin Run Management')
@ApiBearerAuth() // Memunculkan gembok token di Swagger untuk kelompok endpoint ini
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN') // Mengunci agar hanya role ADMIN yang bisa masuk
@Controller('admin/runs')
export class RunAdminController {
  constructor(private readonly runAdminService: RunAdminService) {}

  @Get(':status')
  @ApiOperation({ summary: 'Melihat semua run entry filtered by status' })
  @ApiParam({ name: 'status', enum: ['PENDING', 'ACCEPTED', 'REJECTED'], example: 'PENDING' })
  async getRunsByStatus(@Param('status') status: string) {
    return this.runAdminService.findByStatus(status);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept a run entry' })
  @ApiParam({ name: 'id', description: 'ID dari Run (UUID)', example: 'b123e456-7890-12d3-a456-426614174000' })
  async acceptRun(@Param('id') id: string) {
    return this.runAdminService.updateStatus(id, 'ACCEPTED');
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a run entry' })
  @ApiParam({ name: 'id', description: 'ID dari Run (UUID)', example: 'b123e456-7890-12d3-a456-426614174000' })
  async rejectRun(@Param('id') id: string) {
    return this.runAdminService.updateStatus(id, 'REJECTED');
  }
}

