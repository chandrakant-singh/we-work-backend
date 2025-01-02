import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { Public } from 'src/shared/decorators/public.decorator';
// import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
// @UseGuards(AuthGuard('jwt')) // Assuming you're using JWT Auth
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Public()
  @Post('add/:userId')
  addToCart(@Body() dto: AddToCartDto, @Param('userId') userId: string) {
    return this.cartService.addToCart(userId, dto);
  }

  @Public()
  @Get('user/:userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: string) {
    return this.cartService.delete(id);
  }

  @Public()
  @Delete('user/:userId/sub-category/:subCategoryId')
  removeItemFromCart(
    @Param('userId') userId: string,
    @Param('subCategoryId') subCategoryId: string,
  ) {
    return this.cartService.removeItemFromCart(userId, subCategoryId);
  }
}
