import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonImg, IonCardSubtitle, IonGrid, IonCardTitle, IonCardHeader, IonCardContent, IonText, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, arrowBackOutline, heartDislikeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { WishlistService } from '../_services/wishlist.service';
import { Recipe } from '../_models/recipe';
import { FooterPage } from '../footer/footer.page';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonButtons,FooterPage, RouterLink,IonIcon, IonButton, IonText, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonCardSubtitle, IonImg, IonCard, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WishlistPage implements OnInit {
  wishlistItems: Recipe[] = []; 

  constructor(private authService:AuthService,private wishlistService: WishlistService) { addIcons({arrowBackOutline,trashOutline,heartDislikeOutline});
 
}

ngOnInit(): void {
  this.loadWishlist();  // Load wishlist when component initializes
}

loadWishlist(): void {
    const userEmail = this.authService.currentUserEmail; // Get the current user's email
    if (userEmail) {
      this.wishlistItems = this.wishlistService.get(); // Get the wishlist items for the logged-in user
    } else {
      this.wishlistItems = []; // If no user is logged in, set wishlistItems to an empty array
    }
  }

  removeFromWishlist(itemId: string): void {
    this.wishlistService.remove(itemId);
    this.loadWishlist();  // Reload wishlist to reflect changes
  }
}

