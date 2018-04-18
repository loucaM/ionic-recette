import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { SLOptionsPage } from './sl-options/sl-option';
import { Popover } from 'ionic-angular/components/popover/popover';
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';
import { errorHandler } from '@angular/platform-browser/src/browser';

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
    private http: HttpClientModule
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
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action =='load'){
           
        } else {
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.shoppingListService.storeList(token)
              .subscribe(
                () => console.log('Success'),
                error => {
                  console.log(error);
                });
            }
          );
        }
      }
    );
  }
}
