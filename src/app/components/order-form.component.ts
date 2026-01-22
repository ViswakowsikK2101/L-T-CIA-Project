import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { Customer, Order, OrderItem } from '../models/menu.models';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="order-container fade-in">
      <h2>📝 Place Your Order</h2>

      <div *ngIf="!submittedOrder" class="form-wrapper">
        <form (ngSubmit)="onSubmit(form, getCartItems())" #form="ngForm" class="order-form">
          <div class="form-section">
            <h3>👤 Customer Information</h3>
            
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" ngModel required placeholder="Enter your full name">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" ngModel required placeholder="your@email.com">
              </div>

              <div class="form-group">
                <label>Phone *</label>
                <input type="tel" name="phone" ngModel required placeholder="+91 XXXXX XXXXX">
              </div>
            </div>

            <div class="form-group">
              <label>Delivery Address *</label>
              <textarea name="address" ngModel required placeholder="Enter your delivery address" rows="4"></textarea>
            </div>
          </div>

          <div class="form-section">
            <h3>🍽️ Order Summary</h3>
            
            <div *ngIf="getCartItems().length === 0" class="empty-cart-notice">
              <p>Your cart is empty</p>
              <a routerLink="/" class="link">Go back to menu to add items</a>
            </div>

            <div *ngIf="getCartItems().length > 0" class="order-summary">
              <div class="summary-header">
                <div class="summary-col">Item</div>
                <div class="summary-col">Qty</div>
                <div class="summary-col">Total</div>
              </div>
              
              <div *ngFor="let item of getCartItems()" class="summary-row">
                <div class="summary-col-item">
                  <img [src]="item.menuItem.imageUrl" [alt]="item.menuItem.name" class="order-item-image">
                  <span>{{ item.menuItem.name }}</span>
                </div>
                <div class="summary-col">{{ item.quantity }}</div>
                <div class="summary-col">₹{{ item.lineTotal }}</div>
              </div>

              <div class="summary-total">
                <span>Grand Total:</span>
                <span class="amount">₹{{ getTotalAmount(getCartItems()) }}</span>
              </div>
            </div>
          </div>

          <button type="submit" [disabled]="placing || getCartItems().length === 0" class="btn-submit">
            {{ placing ? '⏳ Processing...' : '✅ Place Order' }}
          </button>
        </form>
      </div>

      <div *ngIf="submittedOrder" class="success-section fade-in">
        <div class="success-icon">✅</div>
        <h3>Order Placed Successfully!</h3>
        
        <div class="success-details">
          <div class="detail-row">
            <span class="label">Order ID:</span>
            <span class="value">#{{ submittedOrder.id }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Customer:</span>
            <span class="value">{{ submittedOrder.customer.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value amount">₹{{ submittedOrder.totalAmount }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Delivery To:</span>
            <span class="value">{{ submittedOrder.customer.address }}</span>
          </div>
        </div>

        <p class="confirmation-message">Thank you for your order! We'll prepare your food shortly.</p>

        <div class="success-actions">
          <a routerLink="/" class="btn-back">← Back to Menu</a>
          <a routerLink="/orders" class="btn-orders">📋 View Orders</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-container {
      padding: 40px 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .order-container h2 {
      font-size: 32px;
      margin-bottom: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .form-wrapper {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      padding: 30px;
    }

    .form-section {
      margin-bottom: 30px;
    }

    .form-section h3 {
      font-size: 18px;
      margin-bottom: 20px;
      color: #2c3e50;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2c3e50;
      font-size: 14px;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .empty-cart-notice {
      background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
    }

    .empty-cart-notice p {
      margin: 0 0 10px;
      font-weight: 600;
      color: #d63031;
    }

    .empty-cart-notice .link {
      color: #d63031;
      font-weight: 600;
    }

    .order-summary {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .summary-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 15px;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 6px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .summary-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 15px;
      padding: 12px 15px;
      border-bottom: 1px solid #e0e0e0;
      align-items: center;
    }

    .summary-col-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .order-item-image {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      object-fit: cover;
    }

    .summary-row:last-of-type {
      border-bottom: none;
    }

    .summary-col {
      font-size: 14px;
    }

    .summary-col:nth-child(3) {
      text-align: right;
      font-weight: 600;
      color: #667eea;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: white;
      border-top: 2px solid #667eea;
      border-radius: 6px;
      margin-top: 10px;
      font-weight: 700;
      font-size: 16px;
    }

    .summary-total .amount {
      color: #667eea;
      font-size: 20px;
    }

    .btn-submit {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
    }

    .success-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      padding: 40px;
      text-align: center;
    }

    .success-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .success-section h3 {
      font-size: 28px;
      color: #28a745;
      margin-bottom: 30px;
    }

    .success-details {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: left;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-row .label {
      font-weight: 600;
      color: #2c3e50;
    }

    .detail-row .value {
      color: #666;
    }

    .detail-row .value.amount {
      font-size: 18px;
      font-weight: 700;
      color: #28a745;
    }

    .confirmation-message {
      font-size: 16px;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .success-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .btn-back,
    .btn-orders {
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-back {
      background-color: #f0f0f0;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-back:hover {
      background-color: #667eea;
      color: white;
    }

    .btn-orders {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-orders:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .success-actions {
        flex-direction: column;
      }

      .btn-back,
      .btn-orders {
        width: 100%;
      }
    }
  `]
})
export class OrderFormComponent {
  submittedOrder?: Order;
  placing = false;

  constructor(private menuService: MenuService) {}

  getCartItems() {
    return this.menuService.getCartItems();
  }

  getTotalAmount(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  onSubmit(form: NgForm, items: OrderItem[]): void {
    if (form.invalid || !items.length) {
      return;
    }

    const customer = new Customer(
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.address
    );

    const order = new Order(customer, items);
    this.placing = true;

    this.menuService.createOrder(order).subscribe(o => {
      this.submittedOrder = o;
      this.placing = false;
      form.resetForm();
    });
  }
}

