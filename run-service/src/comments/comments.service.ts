import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  // 8. POST /comments — Membuat Komentar Baru
  async create(createCommentDto: CreateCommentDto) {
    // Pastikan target run_id benar-benar exist di DB sebelum dikomentari
    const runExist = await this.prisma.runs.findUnique({
      where: { run_id: createCommentDto.run_id },
    });
    if (!runExist) throw new NotFoundException('Target Run entry tidak ditemukan');

    await this.prisma.comments.create({
      data: {
        comment_id: uuidv4(),
        run_id: createCommentDto.run_id,
        user_id: createCommentDto.user_id,
        comment: createCommentDto.comment,
        created_at: new Date(),
      },
    });

    return { message: 'Comment successfully created' };
  }

  // 9. DELETE /comments/:id — Menghapus Komentar
  async remove(commentId: string, authenticatedUserId: string) {
    const comment = await this.prisma.comments.findUnique({
      where: { comment_id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Data komentar tidak ditemukan');
    }

    // Sesuai soal: Verifikasi kepemilikan komentar sebelum mengizinkan proses delete
    if (comment.user_id !== authenticatedUserId) {
      throw new ForbiddenException('Error: Anda tidak diperbolehkan menghapus komentar orang lain');
    }

    await this.prisma.comments.delete({
      where: { comment_id: commentId },
    });

    return { message: 'Comment successfully deleted' };
  }
}