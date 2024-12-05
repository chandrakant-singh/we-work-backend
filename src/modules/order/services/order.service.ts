import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      this.validate(createOrderDto);
      const createdOrder = new this.orderModel(createOrderDto);
      return await createdOrder.save();
    } catch (error) {
      console.error('Error while saving order:', error);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  private validate(createOrderDto: CreateOrderDto) {
    const { items, totalAmount } = createOrderDto;
    // Amount Validation
    const calculatedTotal = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    console.log(calculatedTotal);
    if (calculatedTotal !== totalAmount) {
      throw new BadRequestException(
        `Invalid total amount. Expected ${calculatedTotal}, but got ${totalAmount}.`,
        // {
        //   message: 'The total amount does not match the sum of item prices.',
        //   expectedTotal: calculatedTotal,
        //   providedTotal: totalAmount,
        //   discrepancy: Math.abs(calculatedTotal - totalAmount),
        // },
      );
      //   throw new Error('Total amount does not match');
    }
  }
}
