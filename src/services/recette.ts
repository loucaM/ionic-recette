import { Recette } from "../models/recette";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';import { AuthService } from "./auth";
import 'rxjs/Rx' ;
@Injectable()
export class RecettesService {
    private recettes: Recette [] = [];

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

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
            this.recettes.splice(index,1);
        }

        storeList(token: string) {
            const uid = this.authService.getActiveUser().uid;  
            return this.http.put('https://ionic3-recette.firebaseio.com/' + uid + '/recettes.json?auth='+token, this.recettes);
        }

        getListServer(token: string) {
            const uid = this.authService.getActiveUser().uid;
            return this.http.get<Array<Recette>>('https://ionic3-recette.firebaseio.com/'+
            uid + '/recettes.json?auth=' + token);
        }
}