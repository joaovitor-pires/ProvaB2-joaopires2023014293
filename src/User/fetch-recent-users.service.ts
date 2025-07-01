import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/User/users.repository";

@Injectable()
export class FetchRecentUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findManyRecent();

    return users;
  }
}
