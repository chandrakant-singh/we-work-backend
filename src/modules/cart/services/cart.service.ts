// cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from '../schemas/cart.schema';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { ServiceAttributesService } from 'src/modules/service-attributes/services/service-attributes.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly serviceAttributesService: ServiceAttributesService,
  ) {}

  async addToCart(userId: string, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (cart) {
      // Check if item exists in cart
      const item = cart.items.find(
        (i) => i.serviceSubCategoryId.toString() === dto.serviceSubCategoryId,
      );

      if (item) {
        item.quantity += dto.quantity || 1;
      } else {
        const item = await this.serviceSubGroupHandler(
          dto.serviceSubCategoryId,
          1,
        );
        // Add new item to cart
        cart.items.push(item);
      }
      return cart.save();
    }

    const item = await this.serviceSubGroupHandler(dto.serviceSubCategoryId, 1);
    // Create new cart
    const newCart = new this.cartModel({
      userId: new Types.ObjectId(userId),
      items: [item],
    });
    return newCart.save();
  }

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.serviceSubCategoryId');
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async removeFromCart(
    userId: string,
    serviceSubCategoryId: string,
  ): Promise<void> {
    await this.cartModel.updateOne(
      { userId },
      { $pull: { items: { serviceSubCategoryId } } },
    );
  }

  // Validate service-sub-groupId and get price
  async serviceSubGroupHandler(
    serviceSubCategoryIdString: string,
    quantity: number,
  ): Promise<{
    serviceSubCategoryId: Types.ObjectId;
    quantity: number;
    price: number;
  }> {
    // Fetch price from the database based on the serviceSubCategoryId
    const serviceAttributeDetails =
      await this.serviceAttributesService.findByServiceSubCategoryId(
        serviceSubCategoryIdString,
      );

    if (!serviceAttributeDetails) {
      throw new Error('Service details not found');
    }

    const price: number = serviceAttributeDetails.price; // Ensure price is fetched correctly

    const cartItem: {
      serviceSubCategoryId: Types.ObjectId;
      quantity: number;
      price: number;
    } = {
      serviceSubCategoryId: new Types.ObjectId(serviceSubCategoryIdString), // Convert to ObjectId
      quantity,
      price, // Include price
    };

    // Add the cart item to the cart
    return cartItem;
  }
}
