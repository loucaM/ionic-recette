import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditerRecettePage } from '../editer-recette/editer-recette';
import { RecettesService } from '../../services/recette';
import { Recette } from '../../models/recette';
import { DetailsRecettePage } from '../details-recette/details-recette';


@IonicPage()
@Component({
  selector: 'page-recettes',
  templateUrl: 'recettes.html',
})
export class RecettesPage {

  recettes: Recette [] ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recettesService: RecettesService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecettesPage');
  }

  ionViewWillEnter() {
    this.recettes = this.recettesService.getRecettes();
  }

  AjoutNouvelleRecette() {
    this.navCtrl.push(EditerRecettePage, {mode: 'New'});
  }

  onLoadRecipe(recette: Recette, index: number) {
    this.navCtrl.push(DetailsRecettePage,{recette: recette, index: index});
  }

}
