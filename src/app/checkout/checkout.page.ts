import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonSelect,IonSelectOption, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCol, IonRow, IonLabel, IonItem, IonList, IonCardContent, IonCardHeader, IonCard, IonInput, IonCardTitle, IonText } from '@ionic/angular/standalone';
import { HeaderPage } from '../header/header.page';
import { addIcons } from 'ionicons';
import { checkmarkDoneOutline, arrowBackCircle } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { FooterPage } from "../footer/footer.page";
import { CartService } from '../_services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonText, RouterLink, IonCardTitle, IonSelect, IonInput, HeaderPage, FormsModule, CommonModule, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelectOption, FooterPage]
})
export class CheckoutPage implements OnInit {
  totalAmount:number | undefined;


  constructor(private cartService:CartService,private alertController: AlertController) { addIcons({checkmarkDoneOutline,arrowBackCircle});}

  ngOnInit() {
    this.totalAmount = this.cartService.getTotalAmount();
  }
  user = { name: '', address: '', phone: '', paymentmethod: '',cardnumber:'',expiry:'',cvv:'' };

  onPaymentMethodChange(event: any) {
    const selectedMethod = event.detail.value;
    if (selectedMethod !== 'card') {
 
      this.user.cardnumber = '';
      this.user.expiry = '';
      this.user.cvv = '';
    }
  }
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Payment Successful!',
      message: `Thank you for your purchase. Your order will be delivered soon.`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  payNow() {
  
    if (!this.user.name || !this.user.phone || !this.user.address || !this.user.paymentmethod) {
      alert('Please fill all the required fields.');
      return; 
    }
  
    if (
      this.user.paymentmethod === 'card' &&
      (!this.user.cardnumber || !this.user.expiry || !this.user.cvv)
    ) {
      alert('Please complete your card details.');
      return; 
    }
    this.showSuccessAlert();
    this.cartService.clearCart();

  }
  
}

