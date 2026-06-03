import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunsModule } from './runs/runs.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module'; // Added import

@Module({
  imports: [PrismaModule, RunsModule, CommentsModule], // Added here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}