import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CATEGORIES, MENU_ITEMS } from '../data/mock-data';
import { Category, MenuItem, Order, OrderItem } from '../models/menu.models';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private cartItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  
  cartItems$ = this.cartItemsSubject.asObservable();
  orders$ = this.ordersSubject.asObservable();

  constructor() {
    // Load orders from localStorage
    this.loadOrdersFromStorage();
  }

  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  getMenuItems(): Observable<MenuItem[]> {
    return of(MENU_ITEMS);
  }

  getMenuItemById(id: number): Observable<MenuItem | undefined> {
    return of(MENU_ITEMS.find((m: MenuItem) => m.id === id));
  }

  addToCart(item: MenuItem): void {
    const current = [...this.cartItemsSubject.value];
    const found = current.find((ci: OrderItem) => ci.menuItem.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      current.push(new OrderItem(item, 1));
    }
    this.cartItemsSubject.next(current);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const current = [...this.cartItemsSubject.value];
    const target = current.find((ci: OrderItem) => ci.menuItem.id === itemId);
    if (target) {
      target.quantity = quantity;
      if (target.quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.cartItemsSubject.next(current);
      }
    }
  }

  removeFromCart(itemId: number): void {
    const filtered = this.cartItemsSubject.value.filter(
      (ci: OrderItem) => ci.menuItem.id !== itemId
    );
    this.cartItemsSubject.next(filtered);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  createOrder(order: Order): Observable<Order> {
    order.id = Math.floor(Math.random() * 100000);
    
    // Add to orders history
    const currentOrders = [...this.ordersSubject.value];
    currentOrders.unshift(order); // Add to beginning
    this.ordersSubject.next(currentOrders);
    
    // Save to localStorage
    this.saveOrdersToStorage(currentOrders);
    
    this.clearCart();
    return of(order);
  }

  getCartItems(): OrderItem[] {
    return this.cartItemsSubject.value;
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  private saveOrdersToStorage(orders: Order[]): void {
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
  }

  private loadOrdersFromStorage(): void {
    const stored = localStorage.getItem('restaurant_orders');
    if (stored) {
      try {
        const orders = JSON.parse(stored);
        this.ordersSubject.next(orders);
      } catch (e) {
        console.error('Error loading orders from storage', e);
      }
    }
  }

  clearAllOrders(): void {
    this.ordersSubject.next([]);
    localStorage.removeItem('restaurant_orders');
  }
}
