import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonicSlides,IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
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
    private cartService: CartService, private authService: AuthService
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
      alert(`${recipe.name} is already in your wishlist`);
    } else {
      this.wishlistService.add(recipe);
      alert(`${recipe.name} added to wishlist`);
    }
  }


  orderNow(recipe: Recipe) {
    const cartItem: CartItem = {
      id: recipe.id,
      name: recipe.name,
      price: recipe.price,
      quantity: 1, // Default quantity
      image: recipe.imageUrl
    };

    // Call the cart service to add the recipe to the cart
    this.cartService.addToCart(cartItem);
    
    // Optional: Display confirmation message
    alert(`${recipe.name} has been added to your cart!`);
  }

  

  // dishes = [
  //   {
  //     name: 'Paneer Tikka',
  //     category: 'Starters',
  //     description: 'Flavor Starters',
  //     price: 299,
  //     image: 'assets/imgs/Paneer-Tikka-2.jpg'
  //   },
  //   {
  //     name: 'Chicken Biryani',
  //     category: 'Main Course',
  //     description: 'Satisfying Mains',
  //     price: 299,
  //     image: 'assets/imgs/chicken biriyani.jpg'
  //   },
  //   {
  //     name:'orange',
  //     category:'Juice',
  //     description:'Fruity Bliss',
  //     price:'100',
  //     image:'assets/imgs/orange.jpg'
  //   },
  //   {
  //     name:'vanilla',
  //     category:'Ice cream',
  //     description:'Chilly Treat',
  //     price:'100',
  //     image:'assets/imgs/vanilla.jpg'
  //   },
  // ];

}
