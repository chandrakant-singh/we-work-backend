import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../schemas/order.schema';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Public } from '../../../shared/decorators/public.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Public()
  @Get('lender/:lenderId')
  findByUserId(@Param('lenderId') lenderId: string): Promise<Order[]> {
    return this.orderService.findByUserId(lenderId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Order> {
    return this.orderService.delete(id);
  }
}
