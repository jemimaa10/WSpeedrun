// Guard ini berfungsi untuk memblokir request jika role user di dalam token bukan 'Admin'.

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Pastikan user sudah melewati JwtAuthGuard terlebih dahulu
    if (!user) {
      return false;
    }

    // Cek apakah role-nya Admin
    if (user.role !== 'Admin') {
      throw new ForbiddenException('Access denied. Admin only.');
    }

    return true;
  }
}