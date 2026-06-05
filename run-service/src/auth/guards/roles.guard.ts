import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    // Mengecek apakah role user (misal: 'ADMIN') ada di dalam daftar requiredRoles 
    const hasRole = requiredRoles.includes(user?.role);
    
    if (!hasRole) {
      throw new ForbiddenException('Access Denied: Anda tidak memiliki akses admin');
    }
    
    return true;
  }
}