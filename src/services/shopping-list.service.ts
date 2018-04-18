import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth";


@Injectable()
export class ShoppingListService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private listeIngredients: Ingredient [] = [];

    ajouterIngredient(name: string, nombre:number) {
        console.log(name);
        console.log(nombre);
        
        this.listeIngredients.push(new Ingredient(name, nombre));
    }

  /*   ES 6, divise en un élément chaque Elements  */
    ajouterIngredients(ingredients: Ingredient[]){
        this.listeIngredients.push(...ingredients);
    }

    supprimerIngredient(index: number) {
        this.listeIngredients.splice(index,1);
    }
    
/*     on envoi une copie */
    getIngredients() {
        return this.listeIngredients.slice();
    }

    supprimerIngredientIndex(index: number) {
        this.listeIngredients.slice(index, 1) ;
    }

    storeList(token: string) {
        const uid = this.authService.getActiveUser().uid;
        return this.http.put<Array<Ingredient>>('https://ionic3-recette.firebaseio.com/'+
         uid + '/shopping-list.json?auth=' + token, this.listeIngredients);
        
    }

}