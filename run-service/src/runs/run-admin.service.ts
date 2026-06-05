import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path PrismaService Anda

@Injectable()
export class RunAdminService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Mengambil semua run berdasarkan status (PENDING, ACCEPTED, REJECTED)
  async findByStatus(status: string) {
    const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
    
    // Validasi input parameter status
    if (!validStatuses.includes(status.toUpperCase())) {
      throw new BadRequestException(`Status harus berupa salah satu dari: ${validStatuses.join(', ')}`);
    }

    const runsData = await this.prisma.runs.findMany({
      where: {
        status: status.toUpperCase(),
      },
      orderBy: {
        submitted_at: 'desc', // Menampilkan submisi terbaru di atas
      },
    });

    // Melakukan mapping untuk mengubah BigInt menjadi number/string agar tidak error JSON
    return runsData.map((run) => ({
      ...run,
      run_duration: run.run_duration.toString(), // Aman untuk serialization JSON
    }));
  }

  // 2. Mengubah status run menjadi ACCEPTED atau REJECTED sekaligus mengisi verified_at
  async updateStatus(run_id: string, newStatus: 'ACCEPTED' | 'REJECTED') {
    // Pastikan data run yang dimaksud terdaftar di DB
    const checkRun = await this.prisma.runs.findUnique({
      where: { run_id },
    });

    if (!checkRun) {
      throw new NotFoundException(`Run dengan ID ${run_id} tidak ditemukan`);
    }

    // Melakukan update status dan mencatat waktu verifikasi saat ini
    const updatedRun = await this.prisma.runs.update({
      where: { run_id },
      data: {
        status: newStatus,
        verified_at: new Date(), // Menambahkan timestamp saat diperiksa Admin
      },
    });

    return {
      message: `Run entry successfully ${newStatus.toLowerCase()}`,
      data: {
        ...updatedRun,
        run_duration: updatedRun.run_duration.toString(),
      },
    };
  }
}