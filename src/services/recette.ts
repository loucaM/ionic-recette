import { Recette } from "../models/recette";
import { Ingredient } from "../models/ingredient";

export class RecettesService {
    private recettes: Recette [] = [];

    ajouterRecettes (
        titre: string,
        description: string,
        difficulte: string,
        ingredients: Ingredient []
    ) {
        this.recettes.push(new Recette(titre, description, difficulte, ingredients));
    }

    getRecettes() {
        return this.recettes.slice();
    }

    updateRecette (
        index: number,
        titre: string,
        description: string,
        difficulte: string,
        ingredients: Ingredient []
    ) {
        this.recettes[index] = new Recette(titre, description, difficulte, ingredients)
    }

        supprimerRecette(index: number) {
            this.recettes.slice(index,1);
        }
}