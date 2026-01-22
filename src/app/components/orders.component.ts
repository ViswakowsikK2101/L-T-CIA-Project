import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { Order } from '../models/menu.models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-container fade-in">
      <div class="orders-header">
        <h2>📋 Order History</h2>
        <p>View all your previous orders</p>
      </div>

      <div *ngIf="orders.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No orders yet</p>
        <small>Your orders will appear here</small>
      </div>

      <div *ngIf="orders.length > 0" class="orders-actions">
        <button (click)="clearAllOrders()" class="btn-clear">🗑️ Clear All Orders</button>
      </div>

      <div *ngFor="let order of orders; let i = index" class="order-card fade-in" [style.animation-delay]="i * 0.1 + 's'">
        <div class="order-header-section">
          <div class="order-id-section">
            <h3>Order #{{ order.id }}</h3>
            <span class="order-date">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="order-total">
            <span class="label">Total:</span>
            <span class="amount">₹{{ order.totalAmount }}</span>
          </div>
        </div>

        <div class="order-body">
          <div class="customer-info-section">
            <h4>👤 Customer Information</h4>
            <div class="info-grid">
              <div class="info-item">
                <label>Name</label>
                <p>{{ order.customer.name }}</p>
              </div>
              <div class="info-item">
                <label>Email</label>
                <p>{{ order.customer.email }}</p>
              </div>
              <div class="info-item">
                <label>Phone</label>
                <p>{{ order.customer.phone }}</p>
              </div>
              <div class="info-item">
                <label>Address</label>
                <p>{{ order.customer.address }}</p>
              </div>
            </div>
          </div>

          <div class="items-section">
            <h4>🍽️ Items Ordered</h4>
            <div class="items-table">
              <div class="table-header">
                <div class="col-name">Item</div>
                <div class="col-qty">Qty</div>
                <div class="col-price">Price</div>
                <div class="col-total">Total</div>
              </div>
              <div *ngFor="let item of order.items" class="table-row">
                <div class="col-name-item">
                  <img [src]="item.menuItem.imageUrl" [alt]="item.menuItem.name" class="order-item-thumb">
                  <span>{{ item.menuItem.name }}</span>
                </div>
                <div class="col-qty">{{ item.quantity }}</div>
                <div class="col-price">₹{{ item.menuItem.price }}</div>
                <div class="col-total">₹{{ item.lineTotal }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 40px 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .orders-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .orders-header h2 {
      font-size: 36px;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .orders-header p {
      font-size: 16px;
      color: #666;
    }

    .empty-state {
      text-align: center;
      padding: 80px 40px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .empty-icon {
      font-size: 80px;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .empty-state p {
      font-size: 20px;
      color: #666;
      margin-bottom: 10px;
    }

    .empty-state small {
      color: #999;
    }

    .orders-actions {
      text-align: center;
      margin-bottom: 30px;
    }

    .btn-clear {
      background-color: #ff6b6b;
      padding: 10px 20px;
      font-size: 14px;
    }

    .btn-clear:hover {
      background-color: #ff5252;
    }

    .order-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 25px;
      border-left: 4px solid #667eea;
      transition: all 0.3s ease;
    }

    .order-card:hover {
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
      transform: translateY(-2px);
    }

    .order-header-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .order-id-section h3 {
      margin: 0;
      font-size: 20px;
      color: white;
    }

    .order-date {
      font-size: 12px;
      opacity: 0.9;
    }

    .order-total {
      text-align: right;
    }

    .order-total .label {
      display: block;
      font-size: 12px;
      opacity: 0.9;
      margin-bottom: 5px;
    }

    .order-total .amount {
      display: block;
      font-size: 24px;
      font-weight: 700;
    }

    .order-body {
      padding: 25px;
    }

    .customer-info-section h4,
    .items-section h4 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      color: #2c3e50;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
      margin-bottom: 25px;
    }

    .info-item label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .info-item p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }

    .items-section {
      margin-top: 25px;
    }

    .items-table {
      background-color: #f9f9f9;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 15px;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      font-size: 13px;
    }

    .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 15px;
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;
      align-items: center;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row:hover {
      background-color: white;
    }

    .col-name {
      font-weight: 600;
      color: #333;
    }

    .col-name-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      color: #333;
    }

    .order-item-thumb {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      object-fit: cover;
    }

    .col-qty {
      text-align: center;
    }

    .col-price,
    .col-total {
      text-align: right;
      color: #667eea;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .orders-header h2 {
        font-size: 28px;
      }

      .order-header-section {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .order-total {
        text-align: left;
      }

      .table-header,
      .table-row {
        grid-template-columns: 1fr 1fr;
      }

      .col-price,
      .col-total {
        text-align: left;
      }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  clearAllOrders(): void {
    if (confirm('🗑️ Are you sure you want to clear all orders? This action cannot be undone.')) {
      this.menuService.clearAllOrders();
    }
  }
}
