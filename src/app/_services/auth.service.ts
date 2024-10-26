import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserEmail: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private cartService:CartService
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
        alert('Welcome')
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
          alert('Welcome Admin!');
          this.router.navigate(['/admin']); 
        } else {
          alert('Login successful!');
          this.router.navigate(['/home']); 
        }
        
      })
      .catch(error => {
          alert(' Please create an account to log in.');
      });
  }

  resetpassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        alert('Reset password email sent')
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
      alert('Logged out successfully');
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
}
