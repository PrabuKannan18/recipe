import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonImg, IonItem, IonList, IonIcon, IonLabel, IonRow, IonCol, IonButton, IonCardContent, IonText, IonGrid } from '@ionic/angular/standalone';
import { HeaderPage } from '../header/header.page';
import { FooterPage } from '../footer/footer.page';
import { addIcons } from 'ionicons';
import { bagOutline, logOutOutline, person, location, call, mail, logoFacebook, logoTwitter, logoInstagram, logoYoutube } from 'ionicons/icons';
import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';
import { WishlistService } from '../_services/wishlist.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
  standalone: true,
  imports: [IonGrid, IonText, IonCardContent, IonButton, IonCol, IonRow, IonLabel, IonIcon, IonList, IonItem, IonImg, IonAvatar, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,HeaderPage,FooterPage]
})
export class MyaccountPage implements OnInit {
  username:string |null =null;

  constructor(
    private auth:AuthService,
   private cartService:CartService,
   private wishlistService: WishlistService
  
  ) { addIcons({location,call,mail,logoFacebook,logoTwitter,logoInstagram,logoYoutube,person,bagOutline,logOutOutline}); }

  ngOnInit() {
    const email=this.auth.currentUserEmail;
    if(email){
      this.username=email.split('@')[0];
    }
  }

  logout(){

    const user=this.auth.currentUserEmail;
    if (user) {
      this.cartService.saveUserCart(user);
    }
    this.wishlistService.clearWishlist();
    this.cartService.clearCart();
    this.auth.logout();
  }
}