import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsRecettePage } from './details-recette';

@NgModule({
  declarations: [
    DetailsRecettePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsRecettePage),
  ],
})
export class DetailsRecettePageModule {}
