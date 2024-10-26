import { Injectable } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private userEmail: string | null;
  wishlistItems: Recipe[] = []; 

  constructor(private auth: AuthService) {
    this.userEmail = this.auth.currentUserEmail;
    
    this.wishlistItems = this.get();
  }

  private getKey(): string {
    return `wishlist_${this.userEmail}`;
  }

  add(item: Recipe): void {
    const wishlist = this.get();
    wishlist.push(item);
    localStorage.setItem(this.getKey(), JSON.stringify(wishlist));
    this.wishlistItems = wishlist; 
  }

  get(): Recipe[] {
    return JSON.parse(localStorage.getItem(this.getKey()) || '[]');
  }

  remove(itemId: string): void {
    const updatedList = this.get().filter(item => item.id !== itemId);
    localStorage.setItem(this.getKey(), JSON.stringify(updatedList));
    this.wishlistItems = updatedList; 
  }

  clearWishlist(): void {
    this.wishlistItems = []; 
  }
}