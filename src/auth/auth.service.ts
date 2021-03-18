import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import { MailerService } from '@nestjs-modules/mailer';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User) private userModel: typeof User,
    private mailerService: MailerService,
    private configService: ConfigService,
    private sequelize: Sequelize,
    private jwtService: JwtService) {
  }

  findUserById(userId: string) {
    return this.userModel.findByPk(userId);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      try {
        if (await bcrypt.compare(pass, user.password)) {
          return this.userModel.findByPk(user.id, { attributes: { exclude: ['password'] } });
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      user,
      jwt: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDto: any): Promise<any> {
    const transaction = await this.sequelize.transaction();
    try {
      userDto.password = await bcrypt.hash(userDto.password, 10);

      // check if a user with this email verified exists
      let user = await this.userModel.findOne({
        where: {
          email: userDto.email
        },
        attributes: { exclude: ['password'] },
        transaction,
      });

      if (user && user.id) {
        // This email is already taken
        throw new BadRequestException(`A user with this email already exists.`);
      }
      user = await this.userModel.create(userDto, { transaction });

      await transaction.commit();
      // @ts-ignore
      const userDataValues = user.dataValues;
      delete userDataValues.password;
      return userDataValues;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

}
