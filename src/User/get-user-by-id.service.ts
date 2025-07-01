import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "src/User/users.repository";

@Injectable()
export class GetUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }
}
