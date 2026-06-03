import { Injectable } from '@nestjs/common';
import { CreateRunDto } from './dto/create-run.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async create(createRunDto: CreateRunDto, user: any) {
    return this.prisma.runs.create({
      data: {
        run_id: randomUUID(),
        run_category_id: createRunDto.run_category_id,
        vod_url: createRunDto.vod_url,
        run_duration: createRunDto.run_duration,
        user_id: user.userId || user.id || 'temp-user-id', 
        status: 'PENDING',
        submitted_at: new Date(),
      },
    });
  }

  async findByCategory(id: string) {
    const runs = await this.prisma.runs.findMany({
      where: { run_category_id: id },
      orderBy: { run_duration: 'asc' }, 
    }) as any[]; 

    return runs.map(run => {
      const totalSeconds = Number(run.run_duration); 
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return {
        ...run,
        run_duration: totalSeconds,
        formatted_duration: `${hours} Hour(s) ${minutes} Minute(s) ${seconds} Second(s)`
      };
    });
  }

  async findByUser(userId: string, authUser: any) {
    return this.prisma.runs.findMany({
      where: { user_id: userId }
    });
  }

  async findOne(id: string) {
    return this.prisma.runs.findUnique({
      where: { run_id: id }
    });
  }
}