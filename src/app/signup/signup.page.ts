import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInputPasswordToggle, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCardTitle, IonItem, IonInput, IonButton, IonText, IonFooter, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockClosedOutline, person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInputPasswordToggle, RouterLink, IonFooter, IonText, IonButton, IonInput, IonItem, IonCardTitle, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {
  email: string = '';
  password: string = '';
  cpassword: string = '';

  constructor(private auth: AuthService, private alertController: AlertController) {
    addIcons({ person, lockClosedOutline, lockClosed });
  }

  ngOnInit() {}

  async signup() {
    if (!this.email || !this.password) {
      await this.showAlert('Incomplete details', 'Please enter both email and password.');
      return;
    }

    if (this.password === this.cpassword) {
      this.auth.signup(this.email, this.password);
    } else {
      await this.showAlert('Password mismatch', 'The passwords do not match. Please try again.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
