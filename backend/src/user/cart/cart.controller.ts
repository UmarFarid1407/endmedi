import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  ParseIntPipe,
  HttpException,
  UseGuards,
  HttpStatus,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { OrderService } from './Order.service';
import { CartDTO } from './cart.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles-guard';
import { Roles } from '../decorators/role.decorators';
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist', 'user')
  @Post('add')
  async createCheckoutSession(
    @Body() cartDTO: CartDTO,
  ): Promise<{ sessionId: string }> {
    try {
      const { cartItems, totalAmount } = cartDTO;

      const { sessionId } = await this.orderService.createCheckoutSession(
        cartItems,
        totalAmount,
      );
      if (sessionId) {
        await this.cartService.savePendingCart(cartDTO, sessionId);
      }
      return { sessionId };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new HttpException(
        'Failed to create checkout session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist')
  @Get('/cartwithpharmacistid/:userId')
  async getPharmacistCart(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.cartService.getCartByUserId(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist')
  @Get('/cartwithpharmacistidpagination/:userId')
  async getPharmacistCartWithPagination(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    try {
      return this.cartService.getCartByUserIdPagination(userId, page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist', 'user')
  @Get('/cartwithuseridforpharmacist/:userId')
  async getUserCart(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.cartService.getCartByPharmacistId(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist', 'user')
  @Get('/cartwithuseridforuser/:userId')
  async getUserCartforuser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.cartService.getCartByUserIdForUser(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('seller')
  @Get('/cartwithsellerid/:userId')
  async getSellerCart(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.cartService.getCartBySellerId(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/cartsession/:sessionId')
  async getCartID(@Param('sessionId') sessionId: string) {
    try {
      return this.cartService.getCartBySessionId(sessionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('user')
  @Get('/cartcategory/:category')
  async getCartWithCategory(@Param('category') category: string) {
    try {
      return this.cartService.getCartByCategory(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('pharmacist')
  @Delete('/remove/:cartItemId')
  async removeCartItem(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
    try {
      return this.cartService.removeCartItem(cartItemId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @Get('/all')
  async getAllCartItems() {
    try {
      return this.cartService.getAllCartItems();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/admin/all')
  async getAllUserCartItems() {
    try {
      return this.cartService.getAllUserCartItems();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/allnotsignin')
  async getAllCartItemsNotSinIn() {
    try {
      return this.cartService.getAllCartItems();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
