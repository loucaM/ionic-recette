import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }


  onSignin (form: NgForm) {
      const loading = this.loadingCtrl.create({
        content: 'Connexion'
      });
      loading.present();
      this.authService.signin(form.value.email, form.value.password)
        .then(data => {
          loading.dismiss()
        })
        .catch (error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'La connexion a échouée',
            message: error.message,
            buttons: ['ok']
        });
        alert.present();
    });
  }
}
