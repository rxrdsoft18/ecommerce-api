import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dtos/item.dto';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async createCart(
    userId: string,
    itemDTO: ItemDTO,
    subTotalPrice: number,
    totalPrice: number,
  ): Promise<Cart> {
    return this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    });
  }

  async getCart(userId: string): Promise<CartDocument> {
    return this.cartModel.findOne({ userId });
  }

  async deleteCart(userId: string): Promise<Cart> {
    return this.cartModel.findOneAndRemove({ userId });
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price } = itemDTO;
    const subTotalPrice = quantity * price;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      return this.createCart(userId, itemDTO, subTotalPrice, price);
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId,
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      return cart.save();
    }
  }
}
