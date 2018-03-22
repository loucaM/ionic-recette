import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RecettesService } from '../../services/recette';
import { Recette } from '../../models/recette';

@IonicPage()
@Component({
  selector: 'page-editer-recette',
  templateUrl: 'editer-recette.html',
})
export class EditerRecettePage implements OnInit{
  mode = 'New';
  selectOptions = ['Facile', 'Moyenne','Difficile'];
  recette: Recette;
  index: number;

   /* REACTIVE FORM --- ANGULAR 2 */
  recipeForm: FormGroup;
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode =='Edit') {
      this.recette = this.navParams.get('recette');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams, 
    private actionSheetController: ActionSheetController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recetteService: RecettesService,
    )
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
    let titre = null;
    let description = null;
    let difficulte = 'Moyen';
    let ingredients = [];

    if (this.mode =='Edit') {
      titre = this.recette.titre;
      description = this.recette.description;
      difficulte = this.recette.difficulte;

      // ici, on a besoin d'un form Control et non d'un formArray
      for (let ingredient of this.recette.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }
    this.recipeForm = new FormGroup( {
      'titre' : new FormControl(titre, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'difficulte': new FormControl(difficulte,Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  } 
  
  onSubmit() {
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0){
      //on retourne un tableau d'objets au lieu d'une string
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }
    if (this.mode == 'Edit') {
      this.recetteService.updateRecette(this.index, value.title, value.description, value.difficulte, ingredients);
    } else {
      this.recetteService.ajouterRecettes(value.titre, value.description, value.difficulte, ingredients);
      
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
    
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
