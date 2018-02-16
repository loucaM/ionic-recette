import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditerRecettePage } from './editer-recette';

@NgModule({
  declarations: [
    EditerRecettePage,
  ],
  imports: [
    IonicPageModule.forChild(EditerRecettePage),
  ],
})
export class EditerRecettePageModule {}
