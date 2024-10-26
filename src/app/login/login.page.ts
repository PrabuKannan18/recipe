import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{person, logoGoogle, logoFacebook, eye, lockClosedOutline }from 'ionicons/icons';
import { IonContent,IonInputPasswordToggle, IonHeader, IonTitle, IonToolbar, IonGrid, IonFooter, IonText, IonRow, IonCol, IonItem, IonCardTitle, IonInput, IonButton, IonIcon, IonImg, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonImg, IonIcon,IonInputPasswordToggle,RouterLink, IonButton, IonInput, IonCardTitle, IonItem, IonCol, IonRow, IonText, IonFooter, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private auth:AuthService,private router:Router,private cartService:CartService) { addIcons({person,lockClosedOutline,logoGoogle,logoFacebook,eye,});}

  ngOnInit() {
  }

  email:string='';
  password:string='';

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    this.auth.login(this.email, this.password);
    this.cartService.loadUserCart(this.email);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}

