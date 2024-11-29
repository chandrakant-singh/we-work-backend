// cart.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Request,
//   UseGuards,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/cart-cart.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
// @UseGuards(AuthGuard('jwt')) // Assuming you're using JWT Auth
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId')
  addToCart(@Body() dto: AddToCartDto, @Request() req) {
    console.log(req.params.userId);
    return this.cartService.addToCart(req.params.userId, dto);
  }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: string, @Request() req) {
    return this.cartService.removeFromCart(req.user.id, id);
  }
}
