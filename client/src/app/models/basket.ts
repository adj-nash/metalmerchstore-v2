import { type Product } from "./product";

export type Basket = {
  id: number;
  basketId: string;
  items: Item[];
  clientSecret?: string;
  paymentIntentId?: string;
};

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.category = product.category;
    this.band = product.band;
    this.quantity = quantity;
  }

  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  band: string;
  quantity: number;
}
