import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonIcon, IonImg, IonCardContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonText, IonButtons, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { HeaderPage } from '../header/header.page';
import { FooterPage } from '../footer/footer.page';
import { addIcons } from 'ionicons';
import { addOutline, cartOutline, removeOutline, trashOutline, sadOutline, arrowBackCircle, arrowBackCircleOutline, arrowBackOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { AuthService } from '../_services/auth.service';
import { CartItem } from '../_models/recipe';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonButtons, RouterLink,IonText, IonCardTitle, IonCardHeader, IonCard, IonList, IonCardContent, IonImg, IonIcon, IonLabel, IonItem, IonButton, IonContent,HeaderPage,FooterPage, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,]
})
export class CartPage implements OnInit {
  cart: CartItem[] = [];
  totalAmount = 0;


  constructor(private cartService: CartService, private authService: AuthService) {
      addIcons({arrowBackOutline,addOutline,removeOutline,trashOutline,cartOutline,sadOutline});}

      ngOnInit() {
        this.cart = this.cartService.getCart();
        this.updateTotalAmount();
      }
    
      /** Add quantity */
      increaseQuantity(item: CartItem) {
        this.cartService.increaseQuantity(item);
        this.updateTotalAmount();
      }
    
      /** Decrease quantity */
      decreaseQuantity(item: CartItem) {
        this.cartService.decreaseQuantity(item);
        this.updateTotalAmount();
      }
    
      /** Remove item */
      removeItem(itemId: string) {
        this.cartService.removeFromCart(itemId);
        this.updateTotalAmount();
        this.updateCart();

      }
    
      /** Update total amount */
      updateTotalAmount() {
        this.totalAmount = this.cartService.getTotalAmount();
      }
    
      /** Get cart count */
      getCartCount() {
        return this.cartService.getCartCount();
      }

      updateCart() {
        this.cart = this.cartService.getCart(); // Refresh the cart state after modification
        this.updateTotalAmount(); // Update total amount after modification
      }
    }