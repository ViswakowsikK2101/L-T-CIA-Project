export interface Category {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  categoryId: number;
  imageUrl?: string;
}

export class Customer {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public address: string
  ) {}
}

export class OrderItem {
  constructor(
    public menuItem: MenuItem,
    public quantity: number
  ) {}

  get lineTotal(): number {
    return this.menuItem.price * this.quantity;
  }
}

export class Order {
  id?: number;

  constructor(
    public customer: Customer,
    public items: OrderItem[],
    public createdAt: Date = new Date()
  ) {}

  get totalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.lineTotal, 0);
  }
}
