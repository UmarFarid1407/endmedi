import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MedicineService } from '../medicine/medicine.service';
import { Stripe } from 'stripe';
import { CartDTO } from './cart.dto';
import { error } from 'console';

@Injectable()
export class CartService {
  private stripe: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    private readonly medicineService: MedicineService,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new InternalServerErrorException('Stripe secret key is missing');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async savePendingCart(cartDTO: CartDTO, sessionId: string) {
    try {
      const { cartItems, totalAmount, userID } = cartDTO;

      const user = await this.prisma.user.findUnique({
        where: { id: userID },
        select: {
          role: true,
        },
      });

      // const pharmacycart = await this.prisma.cart.findUnique({
      //   where: { id: userID },
      //   select: {
      //     medicineQuantity: true,
      //   },
      // });

      if (user?.role === 'user') {
        console.log('The user has the role "user". Performing the action...');
        for (const item of cartItems) {
          const { medicineID, amount, id } = item;
          const cart = await this.prisma.cart.findMany({
            where: {
              medicineID: medicineID,
            },
          });
          if (!cart) {
            throw new InternalServerErrorException(
              `Medicine with ID ${medicineID} not found`,
            );
          }
          await this.prisma.cart.updateMany({
            where: {
              id: id,
            },
            data: {
              medicineQuantity: cart[0].medicineQuantity - amount,
            },
          });
          // if (cart.medicineQuantity < amount) {
          //   throw new InternalServerErrorException(
          //     `Not enough stock for medicine ID: ${medicineID}`,
          //   );
          // }

          const pendingstatus = 'pending';
          await this.prisma.userCart.create({
            data: {
              amount: item.amount,
              userId: item.userId,
              totalAmount: totalAmount,
              medicineID: item.medicineID,
              medicineName: item.medicineName,
              medicineQuantity: item.amount,
              medicineCategory: item.medicineCategory,
              priceofonemedicineinTablet: item.priceofonemedicineinTablet,
              medicinequantityinonetablet: item.medicinequantityinonetablet,
              mediciinemadeIN: item.mediciinemadeIN,
              medicineExpiryDate: item.medicineExpiryDate,
              medicineManufacturingDate: item.medicineManufacturingDate,
              sellerID: item.sellerID,
              mgs: item.mgs,
              paymentStatus: pendingstatus,
              sessionId,
            },
          });
        }
      }

      if (user?.role === 'pharmacist') {
        for (const item of cartItems) {
          const { medicineID, amount } = item;
          const medicine = await this.medicineService.findOne(medicineID);
          if (!medicine) {
            throw new InternalServerErrorException(
              `Medicine with ID ${medicineID} not found`,
            );
          }

          if (medicine.medicineQuantity < amount) {
            throw new InternalServerErrorException(
              `Not enough stock for medicine ID: ${medicineID}`,
            );
          }

          await this.medicineService.updateQuantity(medicineID, amount);
          const pendingstatus = 'pending';

          await this.prisma.cart.create({
            data: {
              amount: item.amount,
              userId: userID,
              totalAmount: totalAmount,
              medicineID: item.medicineID,
              medicineName: item.medicineName,
              medicineQuantity: item.amount,
              medicineCategory: item.medicineCategory,
              priceofonemedicineinTablet: item.priceofonemedicineinTablet,
              medicinequantityinonetablet: item.medicinequantityinonetablet,
              mediciinemadeIN: item.mediciinemadeIN,
              medicineExpiryDate: item.medicineExpiryDate,
              medicineManufacturingDate: item.medicineManufacturingDate,
              sellerID: item.sellerID,
              mgs: item.mgs,
              paymentStatus: pendingstatus,
              sessionId,
            },
          });
        }
      }

      return {
        message: 'Cart items added successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async updateQuantity(cartID: number, amount: number): Promise<void> {
  //   try {
  //     // Find the medicine by its ID
  //     const carts = await this.prisma.cart.findMany({
  //       where: { id: cartID },
  //       select: {
  //         medicineQuantity: true,
  //       },
  //     });
  //     await this.prisma.cart.updateMany({
  //       where: { id: cartID },
  //       data: {
  //         medicineQuantity: carts?.medicineQuantity - amount,
  //       },
  //     });

  //     if (!carts) {
  //       throw new NotFoundException('Medicine not found');
  //     }
  //     console.log('from update');
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Error updating medicine quantity: ' + error.message,
  //     );
  //   }
  // }

  async getCartByUserId(userId: number) {
    try {
      const cartItems = await this.prisma.cart.findMany({
        where: { userId },
      });

      // if (!cartItems || cartItems.length === 0) {
      //   throw new InternalServerErrorException(
      //     'No cart items found for this user',
      //   );
      // }

      return cartItems;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCartByPharmacistId(userId: number) {
    try {
      const cartItems = await this.prisma.userCart.findMany({
        where: { userId },
      });

      // if (!cartItems || cartItems.length === 0) {
      //   throw new InternalServerErrorException(
      //     'No cart items found for this user',
      //   );
      // }

      return cartItems;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCartBySellerId(userId: number) {
    try {
      const cartItems = await this.prisma.cart.findMany({
        where: { sellerID: userId },
      });

      return cartItems;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCartByCategory(category: string) {
    try {
      console.log(category);
      const cartItems = await this.prisma.cart.findMany({
        where: { medicineCategory: category },
      });
      if (!cartItems) {
        return error;
      }
      console.log(cartItems);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw new Error('Failed to fetch cart items');
    }
  }

  async getCartBySessionId(sessionId: string) {
    try {
      const cartItems = await this.prisma.cart.findMany({
        where: { sessionId },
      });

      if (cartItems.length > 0) {
        const updatedCartItems = await this.prisma.cart.updateMany({
          where: { sessionId },
          data: {
            paymentStatus: 'success',
          },
        });

        return updatedCartItems;
      }

      const userCartItems = await this.prisma.userCart.findMany({
        where: { sessionId },
      });

      if (userCartItems.length > 0) {
        const updatedUserCartItems = await this.prisma.userCart.updateMany({
          where: { sessionId },
          data: {
            paymentStatus: 'success',
          },
        });

        return updatedUserCartItems;
      }

      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeCartItem(cartItemId: number) {
    try {
      const cartItem = await this.prisma.cart.findUnique({
        where: { id: cartItemId },
      });

      if (!cartItem) {
        throw new InternalServerErrorException(
          `Cart item with ID ${cartItemId} not found`,
        );
      }

      await this.prisma.cart.delete({
        where: { id: cartItemId },
      });

      return {
        message: `Cart item with ID ${cartItemId} removed successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllCartItems() {
    try {
      return this.prisma.cart.findMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUserCartItems() {
    try {
      return this.prisma.userCart.findMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
