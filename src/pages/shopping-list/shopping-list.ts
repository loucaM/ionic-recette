import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  nomIngredient = this.nomIngredient ;
  nombreIngredient = this.nombreIngredient;
  shopList: Ingredient [] ;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shoppingListService: ShoppingListService ) 
    { }

    chargerListeIngredients() {
      this.shopList = this.shoppingListService.getIngredients() ;
    }

    /*  je suis sur que j'alimente la lsite uniquement quand j'entre sur la page */
    ionViewWillEnter() {
      this.chargerListeIngredients() ;
    }
    /*   Angular 4 ajouter élément formulaire*/
  ajouterElement(form: NgForm) {
  
     this.shoppingListService.ajouterIngredient(form.value.nomIngredient, form.value.nombreIngredient) ;
     form.reset();
     this.chargerListeIngredients() ;

     
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
