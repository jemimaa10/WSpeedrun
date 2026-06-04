import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const prisma = new PrismaClient();

@ApiTags('Users')
@Controller('users')
export class UsersController {
  
  @Get(':id/profile')
  @UseGuards(AuthGuard('jwt')) 
  @ApiBearerAuth()
  async getProfile(@Param('id') id: string) {
    const user = await prisma.user.findUnique({
      where: { user_id: id },
      select: { username: true, email: true, country: true, role: true }, 
    });
    return user;
  }
}