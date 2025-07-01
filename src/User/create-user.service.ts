import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersRepository } from "src/User/users.repository";

interface CreateUserServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: CreateUserServiceRequest): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new BadRequestException("User with same email already exists.");
    }

    await this.usersRepository.create({ email });
  }
}
