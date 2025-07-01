import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/Order/orders.repository';

interface GetOrderByIdServiceRequest {
    id: string;
}

@Injectable()
export class GetOrderByIdService {
    constructor(private ordersRepository: OrdersRepository) {}

    async execute({ id }: GetOrderByIdServiceRequest) {
        return await this.ordersRepository.findById(id);
    }
}
