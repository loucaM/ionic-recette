import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /* REACTIVE FORM --- ANGULAR 2 */
  private initializeForm() {
    this.recipeForm = new FormGroup( {
      'titre' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulté': new FormControl('Moyenne',Validators.required)
    });
  } 
  
  onSubmit() {
    console.log(this.recipeForm);
  }
}
