import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonCol, IonFooter, IonGrid, IonItem, IonRow, IonButton, IonText, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagOutline, call, cartOutline, heartOutline, location, logoFacebook, logoInstagram, logoTwitter, logoYoutube, mail, menuOutline, personOutline ,} from 'ionicons/icons';
// import { MenuController,IonicModule} from '@ionic/angular'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [IonList, RouterLink,IonText, IonButton, IonRow, IonItem, IonGrid, IonFooter, IonCol, IonLabel, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FooterPage implements OnInit {

  constructor(private router:Router, ) {addIcons({location,call,mail,logoFacebook,logoTwitter,logoInstagram,logoYoutube,bagOutline,menuOutline,heartOutline,cartOutline,personOutline}); }

  ngOnInit() {
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
