import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@IonicPage()
@Component({
  selector: 'page-editer-recette',
  templateUrl: 'editer-recette.html',
})
export class EditerRecettePage implements OnInit{
  mode = 'New';
  selectOptions = ['Facile', 'Moyenne','Difficile'];

   /* REACTIVE FORM --- ANGULAR 2 */
  recipeForm: FormGroup;
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams, 
    private actionSheetController: ActionSheetController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController)
     {
  }

  private creerNouvelIngredientAlerte() {
    return this.alertCtrl.create({
      title: 'Ajouter Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'nom'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Ajouter',
          handler: data => {
            if (data.name.trim() == '' || null) {
              const toast = this.toastCtrl.create({
                message: 'Entrez une donnée valide',
                duration: 2000,
                position: 'bottom'
              })
              toast.present();
            }
            (<FormArray>this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'ingrédient ajouté',
              duration: 2000,
              position: 'top'
            })
            toast.present();
          }
        }
      ]
    });
  }

  /* REACTIVE FORM --- ANGULAR 2 */
  private initializeForm() {
    this.recipeForm = new FormGroup( {
      'titre' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulté': new FormControl('Moyenne',Validators.required),
      'ingredients': new FormArray([])
    });
  } 
  
  onSubmit() {
    console.log(this.recipeForm);
  }

  /* An Action Sheet is a dialog that lets the user choose from a set of options */
  gererIngredients() {
   const actionSheet = this.actionSheetController.create({
      title: 'Que voulez vous faire ?',
      buttons: [
        {
          text: 'Ajouter un ingrédient',
          handler: () => {
            this.creerNouvelIngredientAlerte().present();
          }
        },
        {
          text: 'Supprimer tous les ingrédients',
          role: 'detruire',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len>0) {
              for (let i =len -1; i>=0; i-1) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'Tous les ingrédients ont été supprimés',
                duration: 2000,
                position: 'bottom'
              })
              toast.present();
            }
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
        ]
    });
    actionSheet.present();
  }
}
