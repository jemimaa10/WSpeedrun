import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

@Injectable()
export class RunsService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function untuk mengubah durasi detik ke format XX Hour(s) YY Minute(s) ZZ Second(s)
  private formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours} Hour(s) ${minutes} Minute(s) ${seconds} Second(s)`;
  }

  // 4. POST /runs — Submit Speedrun Baru
  async create(createRunDto: CreateRunDto, userId: string) {
    // Memastikan run_category_id ada di Game Service lewat HTTP Call
    try {
      await axios.get(`http://localhost:3001/categories/${createRunDto.run_category_id}`);
    } catch (error) {
      throw new BadRequestException('Run category ID tidak ditemukan di Game Service');
    }

    const newRun = await this.prisma.runs.create({
      data: {
        run_id: uuidv4(),
        run_category_id: createRunDto.run_category_id,
        user_id: userId,
        vod_url: createRunDto.vod_url,
        run_duration: BigInt(createRunDto.run_duration),
        submitted_at: new Date(),
        status: 'PENDING',
      },
    });

    return {
      message: 'Run entry successfully submitted',
      run_id: newRun.run_id,
    };
  }

  // 5. GET /runs/:id/category — Leaderboard per Kategori
  async findLeaderboardByCategory(categoryId: string) {
    const runsData = await this.prisma.runs.findMany({
      where: {
        run_category_id: categoryId,
        status: 'ACCEPTED',
      },
      orderBy: {
        run_duration: 'asc', // Diurutkan berdasarkan durasi tercepat
      },
    });

    // Transformasi data untuk memformat durasi & mengambil data runner lintas service
    const formattedLeaderboard = await Promise.all(
      runsData.map(async (run) => {
        let runnerInfo = { username: 'Unknown' };
        try {
          // Menembak Auth Service untuk mengambil data user profil runner
          const resUser = await axios.get(`http://localhost:3000/users/${run.user_id}/profile`);
          runnerInfo = resUser.data;
        } catch (e) {}

        return {
          run_id: run.run_id,
          vod_url: run.vod_url,
          run_duration: this.formatDuration(Number(run.run_duration)),
          submitted_at: run.submitted_at,
          runner: runnerInfo,
        };
      }),
    );

    return formattedLeaderboard;
  }

  // 6. GET /runs/:id/user — Riwayat Run User (Conditional)
  async findRunHistoryByUser(targetUserId: string, authenticatedUserId: string) {
    const isOwnHistory = targetUserId === authenticatedUserId;

    const runsData = await this.prisma.runs.findMany({
      where: {
        user_id: targetUserId,
        // Jika milik sendiri tampilkan semua status, jika orang lain hanya yang ACCEPTED
        ...(isOwnHistory ? {} : { status: 'ACCEPTED' }),
      },
      orderBy: {
        submitted_at: 'desc',
      },
    });

    return runsData.map((run) => ({
      ...run,
      run_duration: this.formatDuration(Number(run.run_duration)),
      // Di-string agar BigInt status tidak merusak JSON parser NestJS sewaktu di-return
      status: run.status,
    }));
  }

  // 7. GET /runs/:id — Detail Spesifik Satu Run (Solusi tanpa include)
  async findOneDetails(runId: string) {
    // Ambil data run saja tanpa menggunakan block 'include' yang memicu error
    const run = await this.prisma.runs.findUnique({
      where: { run_id: runId },
    });

    if (!run) throw new NotFoundException('Run entry tidak ditemukan');

    // Ambil data komentar secara manual dari tabel comments
    const runComments = await this.prisma.comments.findMany({
      where: { run_id: runId },
      orderBy: { created_at: 'asc' },
    });

    // Ambil data pendukung dari Game Service & Auth Service
    let gameInfo = {};
    let categoryName = '';
    let runnerInfo = {};

    try {
      const resCategory = await axios.get(`http://localhost:3001/categories/${run.run_category_id}`);
      categoryName = resCategory.data.run_category_name;
      
      const resGame = await axios.get(`http://localhost:3001/games/${resCategory.data.game_id}`);
      gameInfo = resGame.data;
    } catch (e) {}

    try {
      const resUser = await axios.get(`http://localhost:3000/users/${run.user_id}/profile`);
      runnerInfo = resUser.data;
    } catch (e) {}

    return {
      run_id: run.run_id,
      vod_url: run.vod_url,
      run_duration: this.formatDuration(Number(run.run_duration)),
      status: run.status,
      submitted_at: run.submitted_at,
      verified_at: run.verified_at,
      game_information: gameInfo,
      run_category_name: categoryName,
      runner_information: runnerInfo,
      comments: runComments, // Dimasukkan dengan mulus ke sini
    };
  }
}