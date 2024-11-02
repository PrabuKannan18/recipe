import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonicSlides,IonToolbar,AlertController, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu, search, wallet, restaurant, car, checkmarkCircle, cart, starOutline, restaurantOutline, medkitOutline, timeOutline, location, call, mail, logoFacebook, logoTwitter, logoInstagram, logoYoutube, bagOutline, menuOutline, heartOutline, cartOutline, personOutline, shareOutline, shareSocialOutline, share, shareSocial, addOutline, removeOutline } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { HeaderPage } from '../header/header.page';
import { FooterPage } from '../footer/footer.page';
import { shareReplay } from 'rxjs';
import { CartItem, Recipe } from '../_models/recipe';
import { RecipeService } from '../_services/recipe.service';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { AuthService } from '../_services/auth.service';
import { WishlistService } from '../_services/wishlist.service';
register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg,CommonModule, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,HeaderPage,FooterPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  constructor(private recipeService:RecipeService,
    private router:Router,
    private wishlistService: WishlistService,
    private cartService: CartService,
     private authService: AuthService,
     private alertController:AlertController,
  )  {addIcons({addOutline,removeOutline,starOutline,timeOutline,medkitOutline,wallet,restaurant,car,checkmarkCircle,heartOutline,shareOutline,menu,search,location,call,mail,logoFacebook,logoTwitter,logoInstagram,logoYoutube,bagOutline,menuOutline,cartOutline,personOutline,restaurantOutline,cart,shareSocial});}

  images = [
    {image:'home6.avif'},
    {image: 'home3.avif'},
    {image:'home5.jpg'}
  ]

  swiperModules = [IonicSlides];

  trackByFn(index: number, item: any): number {
    return index;
  }

  recipes:Recipe[]=[];

  ngOnInit() {
    this.getAllRecipe();
  }

  getAllRecipe(){
    this.recipeService.getRecipes().subscribe(data=>{
      this.recipes=data;
    })
  }

  viewRecipe(id?:string){
    this.router.navigate([`/home/${id}`])
  }

  addToWishlist(recipe: Recipe): void {
    const wishlist = this.wishlistService.get();
    
    // Check if the recipe is already in the wishlist
    const exists = wishlist.some(item => item.id === recipe.id);
    
    if (exists) {
      this.showalert(`${recipe.name} is already in your wishlist`);
    } else {
      this.wishlistService.add(recipe);
      this.showalert(`${recipe.name} added to wishlist`);
    }
  }


  orderNow(recipe: Recipe) {
    const cartItem: CartItem = {
      id: recipe.id,
      name: recipe.name,
      price: recipe.price,
      quantity: 1, 
      image: recipe.imageUrl
    };

    this.cartService.addToCart(cartItem);
    
    
    this.showalert(`${recipe.name} has been added to your cart!`);
  }

  async showalert(header:string){
    const alert = await this.alertController.create({
      header:header,
      buttons:['Ok']
    })
    await alert.present();

  }

  
}
