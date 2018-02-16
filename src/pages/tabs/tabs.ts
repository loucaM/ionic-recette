import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecettesPage } from '../recettes/recettes';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  shoppingListRoot = ShoppingListPage;
  recettesRoot = RecettesPage;


  constructor(public navCtrl: NavController) {}

}
