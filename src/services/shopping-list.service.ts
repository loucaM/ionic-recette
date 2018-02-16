import { Ingredient } from "../models/ingredient";

export class ShoppingListService {

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

}