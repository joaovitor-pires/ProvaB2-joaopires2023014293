import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { UsersRepository } from "src/User/users.repository";

@Injectable()
export class GetOrdersByUserService {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute(userId: string) {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException("User not found.");
    }

    const orders = await this.ordersRepository.findAllByUserWithItemsAndProducts(userId);

    return { orders };
  }
}
