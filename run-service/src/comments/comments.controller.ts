import { Controller, Post, Body, Delete, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new comment in a specific run' })
  async createComment(@Body() createCommentDto: CreateCommentDto, @Request() req: any) {
    const authenticatedUserId = req.user.userId;

    if (createCommentDto.user_id !== authenticatedUserId) {
      throw new ForbiddenException('Pesan Error: user_id tidak cocok dengan akun login Anda');
    }

    return this.commentsService.create(createCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment (Owner Only)' })
  @ApiParam({ name: 'id', description: 'Comment ID (UUID)' })
  async deleteComment(@Param('id') commentId: string, @Request() req: any) {
    const authenticatedUserId = req.user.userId;
    return this.commentsService.remove(commentId, authenticatedUserId);
  }
}