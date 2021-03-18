import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({ attributes: { exclude: ['password'] } });
  }

  findUserById(id: string): Promise<User> {
    return this.userModel.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email,
      },
    });
  }
}
