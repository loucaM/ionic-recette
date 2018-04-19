import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { Popover } from 'ionic-angular/components/popover/popover';
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DatabaseOptionsPage } from '../database-option/database-option';

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
    public shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private http: HttpClientModule,
    private loadingCtrl: LoadingController,
    private alerteCtrl : AlertController
  ) 
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


  supprimerDeShoppingList(index: number) {
    this.shoppingListService.supprimerIngredient(index) ;
    console.log(index) ;
    this.chargerListeIngredients();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action =='load'){
          loading.present();
           this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.shoppingListService.getListIngredientServer(token)
               .subscribe(
                 (ingredients: Ingredient[]) => {
                   loading.dismiss();
                   this.shoppingListService.ajouterIngredients(ingredients)
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
              this.shoppingListService.storeList(token)
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

