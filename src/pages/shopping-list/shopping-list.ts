import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  nomIngredient = this.nomIngredient ;
  nombreIngredient = this.nombreIngredient;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

/*   Angular 4 ajouter élément formulaire*/
  ajouterElement(form: NgForm) {
    console.log(form);
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
