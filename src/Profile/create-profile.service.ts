import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from 'src/Profile/profiles.repository';
import { UsersRepository } from 'src/User/users.repository';

interface CreateProfileRequest {
  userId: string;
  avatarUrl: string;
}

@Injectable()
export class CreateProfileService {
  constructor(
    private profilesRepository: ProfilesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId, avatarUrl }: CreateProfileRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const existingProfile = await this.profilesRepository.findByUserId(userId);

    if (existingProfile) {
      throw new BadRequestException('User already has a profile.');
    }

    await this.profilesRepository.create({
      avatarUrl,
      userId,
    });
  }
}
