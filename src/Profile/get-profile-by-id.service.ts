import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from 'src/Profile/profiles.repository';

@Injectable()
export class GetProfileByIdService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(id: string) {
    const profile = await this.profilesRepository.findByIdWithUser(id);
    return profile;
  }
}
