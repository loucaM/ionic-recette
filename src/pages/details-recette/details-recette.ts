import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Recette } from '../../models/recette';
import { EditerRecettePage } from '../editer-recette/editer-recette';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecettesService } from '../../services/recette';


@IonicPage()
@Component({
  selector: 'page-details-recette',
  templateUrl: 'details-recette.html',
})
export class DetailsRecettePage implements OnInit {
  recette: Recette;
  index: number;
  ngOnInit() {
    this.recette = this.navParams.get('recette');
    this.index = this.navParams.get('index');
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private recetteService: RecettesService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsRecettePage');
  }

  onEditRecipe() {
    this.navCtrl.push(EditerRecettePage,{mode: 'Edit', recette: this.recette, index: this.index})
  }

  onAddIngredients() {
    this.slService.ajouterIngredients(this.recette.ingredients);
  }

  onDeleteRecette() {
    this.recetteService.supprimerRecette(this.index);
    this.navCtrl.popToRoot();
  }
}
