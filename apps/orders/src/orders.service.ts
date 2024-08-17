import { Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}
  async createOrder(request: CreateOrderRequestDto) {
    return this.orderRepository.create(request);
  }
  async getOrders() {
    return this.orderRepository.find({});
  }
}
