import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/User/users.repository';

@Injectable()
export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.usersRepository.delete(user);
    return true;
  }
}
