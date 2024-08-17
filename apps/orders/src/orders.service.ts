import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERIVE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERIVE) private billingClient: ClientProxy,
  ) {}
  async createOrder(request: CreateOrderRequestDto) {
    try {
      const order = await this.orderRepository.create(request);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      return order;
    } catch (err) {
      throw err;
    }
  }
  async getOrders() {
    return this.orderRepository.find({});
  }
}
