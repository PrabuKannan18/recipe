import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonImg, IonCard, IonCardHeader, IonLabel, IonCardContent, IonItem, IonRow, IonCol, IonButton, IonIcon, IonBackButton, IonButtons, IonList, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline, arrowBackCircle } from 'ionicons/icons';
import { HomePage } from '../home/home.page';
import { HeaderPage } from '../header/header.page';
import { FooterPage } from '../footer/footer.page';
import { Recipe } from '../_models/recipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [IonText,HeaderPage,FooterPage, IonList, IonButtons, IonBackButton, IonIcon, IonButton, IonCol, IonRow, IonItem, IonCardContent, IonLabel, IonCardHeader, IonCard, IonImg, IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class ProductDetailsPage implements OnInit {

  recipe:Recipe | undefined;


  constructor(
    private router:Router,
    private auth:AuthService,
    private route:ActivatedRoute,
    private recipeService:RecipeService
    
  ) { addIcons({cartOutline,heartOutline,arrowBackCircle});}

  ngOnInit():void {
    const id=this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(id).subscribe((recipe)=>{
      this.recipe = recipe;
    })
  }
  addToWishlist(recipe: any) {
    const storedItems = localStorage.getItem('wishlist');
    const wishlist = storedItems ? JSON.parse(storedItems) : [];
  
    if (!wishlist.some((item: { id: any; }) => item.id === recipe.id)) {
      wishlist.push(recipe);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Added to wishlist!');
    } else {
      alert('Item already in wishlist!');
    }
  }

}
