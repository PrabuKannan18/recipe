import { Injectable } from '@angular/core';
import { CartItem } from '../_models/recipe';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'user_cart';
  private cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }


  private loadCart() {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

 
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

 
  addToCart(item: CartItem) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; 
    } else {
      this.cart.push({ ...item, quantity: item.quantity }); // Add new item with quantity
    }
    this.saveCart();
  }

 
  removeFromCart(itemId: string) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
  }


  increaseQuantity(item: CartItem) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      this.saveCart();
    }
  }

 
  decreaseQuantity(item: CartItem) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.removeFromCart(item.id);
      }
      this.saveCart();
    }
  }

  
  clearCart() {
    this.cart = [];
    localStorage.removeItem(this.cartKey);
  }


  loadUserCart(userEmail: string) {
    const savedCart = localStorage.getItem(`cart_${userEmail}`);
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  saveUserCart(userEmail: string) {
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(this.cart));
  }

  getCart() {
    return this.cart;
  }

  getTotalAmount() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}