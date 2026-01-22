import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-brand">
          <h1>🍽️ Restaurant Menu</h1>
        </div>
        <ul class="navbar-menu">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">🏠 Home</a></li>
          <li><a routerLink="/cart" routerLinkActive="active">🛒 Cart</a></li>
          <li><a routerLink="/order" routerLinkActive="active">📝 New Order</a></li>
          <li><a routerLink="/orders" routerLinkActive="active">📋 Orders</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
    }

    .navbar-menu {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 3rem;
      align-items: center;
    }

    .navbar-menu a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .navbar-menu a:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .navbar-menu a.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.3);
      border-bottom: 2px solid white;
    }

    @media (max-width: 768px) {
      .navbar-content {
        flex-direction: column;
        gap: 1rem;
      }

      .navbar-menu {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .navbar-brand h1 {
        font-size: 22px;
      }
    }
  `]
})
export class NavbarComponent {}
