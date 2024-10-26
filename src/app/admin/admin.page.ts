import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonGrid, IonRow, IonCol, IonItem, IonList, IonInput, IonSelect, IonSelectOption, IonLabel, IonButton, IonTextarea, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonButtons, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, search, menu } from 'ionicons/icons';
import { RecipeService } from '../_services/recipe.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonImg, ReactiveFormsModule,IonButtons, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTextarea, IonButton, IonLabel, IonInput, IonList, IonItem, IonCol, IonRow, IonGrid, IonCard, IonContent, IonHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdminPage implements OnInit {
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private auth:AuthService
  ) {
    addIcons({ menu, search, personOutline });

    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['Food Delights', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addRecipe() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).then(() => {
        alert('Recipe added successfully!');
        this.recipeForm.reset();
      }).catch(error => {
        console.error('Error adding recipe: ', error);
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  logout(){
    this.auth.logout();
  }
  
}
