import { Category, MenuItem } from '../models/menu.models';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Appetizers' },
  { id: 2, name: 'Main Course' },
  { id: 3, name: 'Desserts' },
  { id: 4, name: 'Beverages' }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Spring Rolls',
    description: 'Crispy spring rolls with fresh vegetables',
    ingredients: ['vegetables', 'rice paper', 'soy sauce'],
    price: 26,
    categoryId: 1,
    imageUrl: 'https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg'
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken',
    ingredients: ['basmati rice', 'chicken', 'spices', 'yogurt'],
    price: 149,
    categoryId: 2,
    imageUrl: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg'
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese grilled to perfection',
    ingredients: ['paneer', 'yogurt', 'spices', 'capsicum'],
    price: 210,
    categoryId: 2,
    imageUrl: 'https://www.cookingcurries.com/wp-content/uploads/2017/05/Paneer-Tikka_thumb.jpg'
  },
  {
    id: 4,
    name: 'Gulab Jamun',
    description: 'Sweet dumplings in sugar syrup',
    ingredients: ['milk solids', 'sugar syrup', 'cardamom'],
    price: 17,
    categoryId: 3,
    imageUrl: 'https://www.foodie-trail.com/wp-content/uploads/2020/04/PHOTO-2022-02-12-20-04-41_1.jpg'
  },
  {
    id: 5,
    name: 'Fresh Orange Juice',
    description: 'Freshly pressed orange juice',
    ingredients: ['oranges', 'water'],
    price: 47,
    categoryId: 4,
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.EL20NV4Nlnoh1e-RrTrUiwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 6,
    name: 'Tamilnadu Samosa',
    description: 'Crispy pastry with spiced potato filling',
    ingredients: ['flour', 'potatoes', 'peas', 'spices'],
    price: 8,
    categoryId: 1,
    imageUrl: 'https://cdn.pixabay.com/photo/2024/02/04/20/02/ai-generated-8553025_1280.jpg'
  }
];
