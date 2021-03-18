import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    })],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtAuthGuard, LocalAuthGuard, AuthService],
})
export class AuthModule {
}
