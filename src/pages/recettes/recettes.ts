import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditerRecettePage } from '../editer-recette/editer-recette';
import { RecettesService } from '../../services/recette';
import { Recette } from '../../models/recette';
import { DetailsRecettePage } from '../details-recette/details-recette';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-option/database-option';


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
    public recettesService: RecettesService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alerteCtrl: AlertController,
    private authService: AuthService
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return ;
        }
        if (data.action =='load'){
          loading.present();
           this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recettesService.getListServer(token)
               .subscribe(
                 (liste: Recette[]) => {
                   loading.dismiss();
                   this.recettes = liste;
                 },
                  error => {
                    loading.dismiss();
                    console.log(error)},
                )
            }
          )
        } else if(data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recettesService.storeList(token)
              .subscribe(
                () =>  loading.dismiss(),
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                });
            }
          );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alerteCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
