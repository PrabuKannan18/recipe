import { Injectable } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 
  private collectionName = 'recipes'; 

  constructor(private firestore: AngularFirestore) {}

  // Add a recipe to Firestore
  addRecipe(recipe: Recipe): Promise<void> {
    const id = this.firestore.createId(); 
    return this.firestore.collection<Recipe>(this.collectionName).doc(id).set({ ...recipe, id });
  }

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.firestore.collection<Recipe>(this.collectionName).valueChanges();
  }

  // Get a recipe by ID
  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.firestore.collection<Recipe>(this.collectionName).doc(id).valueChanges();
  }
}