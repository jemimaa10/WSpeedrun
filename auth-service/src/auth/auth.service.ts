import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private validateEmail(email: string): boolean {
    const atIndex = email.indexOf('@');
    const lastAtIndex = email.lastIndexOf('@');
    const dotIndex = email.indexOf('.');
    
    const hasExactlyOneAt = atIndex !== -1 && atIndex === lastAtIndex;
    const hasDot = dotIndex !== -1;
    const notAdjacent = !email.includes('@.') && !email.includes('.@');
    
    return hasExactlyOneAt && hasDot && notAdjacent;
  }

  private validatePassword(password: string): boolean {
    const hasUpper = [...password].some(c => c >= 'A' && c <= 'Z');
    const hasLower = [...password].some(c => c >= 'a' && c <= 'z');
    const hasNumber = [...password].some(c => c >= '0' && c <= '9');
    
    const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const hasSpecial = [...password].some(c => specialChars.includes(c));
    
    return hasUpper && hasLower && hasNumber && hasSpecial;
  }

  async register(data: RegisterDto) {
    if (!this.validateEmail(data.email)) {
      throw new BadRequestException('Format email tidak valid.');
    }
    if (!this.validatePassword(data.password)) {
      throw new BadRequestException('Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial.');
    }

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        country: data.country,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return { message: 'Registrasi berhasil.' };
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah.');
    }

    const payload = { id: user.user_id, role: user.role }; // Payload sesuai permintaan dokumen [cite: 62]
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}