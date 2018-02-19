import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditerRecettePage } from '../editer-recette/editer-recette';


@IonicPage()
@Component({
  selector: 'page-recettes',
  templateUrl: 'recettes.html',
})
export class RecettesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecettesPage');
  }


  AjoutNouvelleRecette() {
    this.navCtrl.push(EditerRecettePage, {mode: 'New'});

  }

}
