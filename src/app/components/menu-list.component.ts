import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuItem, Category } from '../models/menu.models';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="menu-container fade-in">
      <div class="menu-header">
        <h2>🍽️ Menu Items</h2>
        <p>Discover our delicious menu</p>
      </div>
      
      <div class="filters-section">
        <select (change)="onCategoryChange($event)" class="category-select">
          <option value="">✨ All Categories</option>
          <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
        </select>
      </div>

      <div class="items-grid">
        <div *ngFor="let item of filteredItems()" class="item-card fade-in">
          <div class="item-image">
            <img [src]="item.imageUrl" [alt]="item.name" class="food-image">
          </div>
          
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            
            <div class="item-meta">
              <span class="price">₹{{ item.price }}</span>
              <span class="category-badge">{{ getCategory(item.categoryId) }}</span>
            </div>

            <p class="ingredients"><strong>Ingredients:</strong> {{ item.ingredients.join(', ') }}</p>
            
            <div class="item-actions">
              <button (click)="addToCart(item)" class="btn-add">➕ Add to Cart</button>
              <a [routerLink]="['/menu', item.id]" class="btn-view">👁️ View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .menu-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .menu-header h2 {
      font-size: 36px;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .menu-header p {
      font-size: 16px;
      color: #666;
    }

    .filters-section {
      margin-bottom: 40px;
      display: flex;
      justify-content: center;
    }

    .category-select {
      padding: 12px 20px;
      font-size: 16px;
      border: 2px solid #667eea;
      border-radius: 8px;
      background-color: white;
      color: #333;
      cursor: pointer;
      font-weight: 600;
      min-width: 250px;
      transition: all 0.3s ease;
    }

    .category-select:hover {
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
    }

    .item-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .item-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 25px rgba(102, 126, 234, 0.2);
    }

    .item-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

    .image-placeholder {
      font-size: 80px;
    }

    .item-details {
      padding: 20px;
    }

    .item-name {
      font-size: 20px;
      margin-bottom: 8px;
      color: #2c3e50;
    }

    .item-description {
      color: #666;
      font-size: 14px;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .item-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid #f0f0f0;
    }

    .price {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
    }

    .category-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .ingredients {
      font-size: 12px;
      color: #999;
      margin-bottom: 15px;
    }

    .item-actions {
      display: flex;
      gap: 10px;
    }

    .btn-add, .btn-view {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      transition: all 0.3s ease;
      font-size: 13px;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-add:hover {
      transform: scale(1.05);
    }

    .btn-view {
      background-color: #f0f0f0;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-view:hover {
      background-color: #667eea;
      color: white;
    }

    @media (max-width: 768px) {
      .menu-header h2 {
        font-size: 28px;
      }

      .items-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MenuListComponent implements OnInit {
  categories: Category[] = [];
  menuItems: MenuItem[] = [];
  selectedCategoryId?: number;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getCategories().subscribe(c => (this.categories = c));
    this.menuService.getMenuItems().subscribe(m => (this.menuItems = m));
  }

  filteredItems(): MenuItem[] {
    if (!this.selectedCategoryId) {
      return this.menuItems;
    }
    return this.menuItems.filter(m => m.categoryId === this.selectedCategoryId);
  }

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.target.value ? Number(event.target.value) : undefined;
  }

  addToCart(item: MenuItem): void {
    this.menuService.addToCart(item);
    alert(`✅ ${item.name} added to cart!`);
  }

  getCategory(categoryId: number): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : '';
  }
}

