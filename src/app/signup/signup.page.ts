import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInputPasswordToggle,IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCardTitle, IonItem, IonInput, IonButton, IonText, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockClosedOutline, person } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonIcon,IonInputPasswordToggle,RouterLink, IonFooter, IonText, IonButton, IonInput, IonItem, IonCardTitle, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor(private auth:AuthService) {addIcons({person,lockClosedOutline,lockClosed}); }

  ngOnInit() {
  }
  email:string='';
  password:string='';
  cpassword:string='';

  signup(){
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

   if(this.password===this.cpassword){
    this.auth.signup(this.email,this.password);
   }else{
    alert('password do not match')
   }
  }
}
