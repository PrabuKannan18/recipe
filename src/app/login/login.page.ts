import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { person, logoGoogle, logoFacebook, eye, lockClosedOutline } from 'ionicons/icons';
import { IonContent, IonInputPasswordToggle, IonHeader, IonTitle, IonToolbar, IonGrid, IonFooter, IonText, IonRow, IonCol, IonItem, IonCardTitle, IonInput, IonButton, IonIcon, IonImg, IonLabel, AlertController, IonSpinner, IonLoading } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLoading, IonSpinner, IonLabel, IonImg, IonIcon, IonInputPasswordToggle, RouterLink, IonButton, IonInput, IonCardTitle, IonItem, IonCol, IonRow, IonText, IonFooter, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  

  constructor(private auth: AuthService, private router: Router, private cartService: CartService, private alertController: AlertController) { addIcons({ person, lockClosedOutline, logoGoogle, logoFacebook, eye, }); }

  ngOnInit() {
  }

  email: string = '';
  password: string = '';
  isLoading: boolean = false;
 

  async login() {
    
    if (!this.email || !this.password) {
      this.isLoading=false;
      this.showAlert('Incomplete details', 'Please enter both email and password.');
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

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}

