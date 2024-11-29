import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartController } from './controllers/cart.controller';
import { ServiceAttributesService } from '../service-attributes/services/service-attributes.service';
import {
  ServiceAttribute,
  ServiceAttributeSchema,
} from '../service-attributes/schemas/service-attributes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: ServiceAttribute.name, schema: ServiceAttributeSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ServiceAttributesService],
  exports: [CartService],
})
export class CartModule {}
