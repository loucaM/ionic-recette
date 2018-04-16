import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private loadindCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadindCtrl.create({
      content: 'Enregistrement'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => { 
        loading.dismiss();
       })
        .catch(error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'L\'enregistrement a échoué',
            message: error.message,
            buttons: ['ok']
          });
          alert.present();
        });
        form.reset();
  }
}
