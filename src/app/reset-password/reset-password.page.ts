import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonInput, IonLabel, IonItem, IonButton, IonText, IonIcon, IonGrid, IonCardContent, IonCardTitle, IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, lockClosedOutline, send } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonGrid,RouterLink, IonIcon, IonText, IonButton, IonItem, IonLabel, IonInput, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResetPasswordPage implements OnInit {

  constructor(private auth:AuthService) { addIcons({lockClosedOutline,send,arrowBackCircle});}

  ngOnInit() {
  }
 
  email:string='';

  resetpassword(){
    this.auth.resetpassword(this.email);
  }
}
