import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { CartService } from './cart.service';
import { AlertController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserEmail: string | null = null;
  isLoading:boolean=false;
  

  constructor(
    private auth: Auth,
    private router: Router,
    private cartService:CartService,
    private alertController:AlertController,
  ) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.currentUserEmail = user?.email || null;
      if (this.currentUserEmail) {
        // Load the user's cart when they log in
        this.cartService.loadUserCart(this.currentUserEmail);
      } else {
        // Optionally, clear the cart when the user is logged out
        this.cartService.clearCart();
      }
    });
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(res => {
      
      this.showalert('Welcome')
        this.router.navigate(['/home']);

      })
      .catch(error => {
        console.error('Error during sign up:', error);
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        if (email === 'admin@gmail.com') { 
          this.isLoading=true;
          this.showalert('Welcome Admin!');
          this.router.navigate(['/admin']);   
        } else {
          this.isLoading=true;
          this.showalert('Login successful!')
          this.router.navigate(['/home']); 
        }
        
      })
      .catch(error => {
        this.showalert(' Please create an account to log in.');
      });
  }

  resetpassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.showalert('Reset password email sent')
      })
      .catch(error => console.log('Error sending reset password email:', error));
  }

 logout() {
    return signOut(this.auth).then(() => {
      if (this.currentUserEmail) {
    
        this.cartService.saveUserCart(this.currentUserEmail);
        localStorage.removeItem('wishlist');
      }
      this.currentUserEmail = null;
      this.showalert('Logged out successfully');
      this.router.navigate(['/login']);
    });
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
        .then((result) => {
            this.router.navigate(['']);
        })
}

 async showalert(header:string){
    const alert = await this.alertController.create({
      header: header,
      buttons:['Ok']
    })
    await alert.present();
  }
}

