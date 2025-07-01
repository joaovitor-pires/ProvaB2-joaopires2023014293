import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/User/users.repository';

interface EditUserServiceRequest {
  id: string;
  email: string;
}

@Injectable()
export class EditUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, email }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new BadRequestException('Email is already in use by another user.');
    }

    await this.usersRepository.save({ ...user, email });
  }
}
