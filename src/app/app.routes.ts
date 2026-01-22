import { Routes } from '@angular/router';
import { MenuListComponent } from './components/menu-list.component';
import { MenuDetailComponent } from './components/menu-detail.component';
import { CartComponent } from './components/cart.component';
import { OrderFormComponent } from './components/order-form.component';
import { OrdersComponent } from './components/orders.component';

export const routes: Routes = [
  { path: '', component: MenuListComponent },
  { path: 'menu/:id', component: MenuDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '' }
];
