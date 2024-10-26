import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonImg, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu, search } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [RouterLink,IonIcon, IonImg, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HeaderPage implements OnInit {

  constructor() { addIcons({menu,search}); }

  ngOnInit() {
  }

}
