import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu.models';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container fade-in">
      <a routerLink="/" class="back-link">← Back to Menu</a>

      <div *ngIf="!item" class="loading">
        <p>Loading menu item...</p>
      </div>

      <div *ngIf="item" class="item-detail">
        <div class="detail-content">
          <div class="item-image-section">
            <div class="item-image">
              <img [src]="item.imageUrl" [alt]="item.name" class="food-image">
            </div>
          </div>

          <div class="item-info-section">
            <h2>{{ item.name }}</h2>
            <p class="description">{{ item.description }}</p>
            
            <div class="price-section">
              <span class="price">₹{{ item.price }}</span>
              <span class="category-badge">{{ getCategoryName() }}</span>
            </div>

            <div class="divider"></div>

            <div class="ingredients-section">
              <h4>📋 Ingredients:</h4>
              <ul class="ingredients-list">
                <li *ngFor="let ingredient of item.ingredients">{{ ingredient }}</li>
              </ul>
            </div>

            <button (click)="addToCart()" class="btn-add-large">
              ➕ Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 40px 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 30px;
      color: #667eea;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .back-link:hover {
      transform: translateX(-5px);
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .detail-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .item-image-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item-image {
      font-size: 200px;
      text-align: center;
      width: 100%;
      height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .food-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-info-section h2 {
      font-size: 36px;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .description {
      font-size: 16px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }

    .price {
      font-size: 36px;
      font-weight: 700;
      color: #667eea;
    }

    .category-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }

    .divider {
      height: 2px;
      background: linear-gradient(to right, #667eea, #764ba2);
      margin: 20px 0;
    }

    .ingredients-section h4 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .ingredients-list {
      list-style: none;
      padding: 0;
      margin-bottom: 30px;
    }

    .ingredients-list li {
      padding: 10px 0;
      color: #666;
      border-bottom: 1px solid #f0f0f0;
    }

    .ingredients-list li:before {
      content: "✓ ";
      color: #28a745;
      font-weight: bold;
      margin-right: 8px;
    }

    .btn-add-large {
      width: 100%;
      padding: 16px;
      font-size: 18px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .detail-content {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
      }

      .item-image {
        height: 250px;
        font-size: 120px;
      }

      .item-info-section h2 {
        font-size: 28px;
      }

      .price {
        font-size: 28px;
      }
    }
  `]
})
export class MenuDetailComponent implements OnInit {
  item?: MenuItem;
  private allCategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.getCategories().subscribe(cats => this.allCategories = cats);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.menuService.getMenuItemById(id).subscribe(i => (this.item = i));
  }

  getCategoryName(): string {
    if (!this.item) return '';
    const cat = this.allCategories.find(c => c.id === this.item!.categoryId);
    return cat ? cat.name : '';
  }

  addToCart(): void {
    if (this.item) {
      this.menuService.addToCart(this.item);
      alert(`✅ ${this.item.name} added to cart!`);
    }
  }
}

