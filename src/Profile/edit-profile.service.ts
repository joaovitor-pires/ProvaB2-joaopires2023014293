import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from 'src/Profile/profiles.repository';

interface EditProfileRequest {
  id: string;
  avatarUrl: string;
}

@Injectable()
export class EditProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ id, avatarUrl }: EditProfileRequest): Promise<boolean> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      return false;
    }

    await this.profilesRepository.save({
      ...profile,
      avatarUrl,
    });

    return true;
  }
}
