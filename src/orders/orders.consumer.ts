import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderStatus, OrderType } from './entities/order.entity';
import { OrdersService } from './orders.service';

export type TradeKafkaMessage = {
  order_id: string;
  investor_id: string;
  asset_id: string;
  order_type: OrderType;
  status: OrderStatus.OPEN | OrderStatus.CLOSED;
  partial: number;
  shares: number;
  transactions: {
    transaction_id: string;
    buyer_id: string;
    seller_id: string;
    asset_id: string;
    shares: number;
    price: number;
  }[];
};

@Controller()
export class OrderConsumer {

  constructor(private ordersService: OrdersService) {}

  @EventPattern('output')
  handleTrade(@Payload() message: TradeKafkaMessage) {
    this.ordersService.createTrade();
  }
}
