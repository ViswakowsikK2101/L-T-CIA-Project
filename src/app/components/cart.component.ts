import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { OrderItem } from '../models/menu.models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="cart-container fade-in">
      <h2>🛒 Shopping Cart</h2>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <div class="empty-illustration">🛒</div>
        <p>Your cart is empty</p>
        <a routerLink="/" class="btn-continue">Continue Shopping</a>
      </div>

      <div *ngIf="cartItems.length > 0">
        <div class="cart-table-wrapper">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems" class="cart-item">
                <td class="item-cell">
                  <div class="item-row">
                    <img [src]="item.menuItem.imageUrl" [alt]="item.menuItem.name" class="item-image">
                    <span>{{ item.menuItem.name }}</span>
                  </div>
                </td>
                <td class="price">₹{{ item.menuItem.price }}</td>
                <td>
                  <input type="number" [value]="item.quantity" (change)="onQuantityChange(item.menuItem.id, $event)" min="1" class="qty-input">
                </td>
                <td class="price">₹{{ item.lineTotal }}</td>
                <td>
                  <button (click)="remove(item.menuItem.id)" class="btn-remove">🗑️ Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>₹{{ getTotal(cartItems) }}</span>
            </div>
            <div class="summary-row">
              <span>Items:</span>
              <span>{{ cartItems.length }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>₹{{ getTotal(cartItems) }}</span>
            </div>
            <a routerLink="/order" class="btn-checkout">✅ Proceed to Order</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 40px 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .cart-container h2 {
      font-size: 32px;
      margin-bottom: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .empty-illustration {
      font-size: 100px;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .empty-cart p {
      font-size: 18px;
      color: #666;
      margin-bottom: 20px;
    }

    .btn-continue {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 30px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-continue:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .cart-table-wrapper {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 30px;
    }

    .cart-table {
      width: 100%;
      border-collapse: collapse;
    }

    .cart-table thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .cart-table th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
    }

    .cart-table td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .item-cell {
      display: flex;
      align-items: center;
    }

    .item-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .item-image {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      object-fit: cover;
    }

    .cart-item:hover {
      background-color: #f9f9f9;
    }

    .price {
      font-weight: 600;
      color: #667eea;
    }

    .qty-input {
      width: 60px;
      padding: 8px;
      border: 2px solid #e0e6ed;
      border-radius: 6px;
    }

    .btn-remove {
      background-color: #ff6b6b;
      padding: 8px 16px;
      font-size: 13px;
    }

    .btn-remove:hover {
      background-color: #ff5252;
    }

    .cart-summary {
      display: flex;
      justify-content: flex-end;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      width: 100%;
      max-width: 350px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 15px;
    }

    .summary-row.total {
      border-bottom: none;
      border-top: 2px solid #667eea;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 18px;
      font-weight: 700;
      color: #667eea;
    }

    .btn-checkout {
      width: 100%;
      display: block;
      margin-top: 20px;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-checkout:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .cart-table {
        font-size: 13px;
      }

      .cart-table th, .cart-table td {
        padding: 10px;
      }

      .summary-card {
        max-width: 100%;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: OrderItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.cartItems$.subscribe(items => (this.cartItems = items));
  }

  getTotal(items: OrderItem[]): number {
    return items.reduce((sum, i) => sum + i.lineTotal, 0);
  }

  onQuantityChange(id: number, value: any): void {
    const qty = Number(value.target.value);
    this.menuService.updateQuantity(id, qty);
  }

  remove(id: number): void {
    this.menuService.removeFromCart(id);
  }
}

