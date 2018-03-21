import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecettesPage } from '../pages/recettes/recettes';
import { EditerRecettePage } from '../pages/editer-recette/editer-recette';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecettesService } from '../services/recette';
import { DetailsRecettePage } from '../pages/details-recette/details-recette';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    RecettesPage,
    EditerRecettePage,
    TabsPage,
    DetailsRecettePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    ShoppingListPage,
    RecettesPage,
    EditerRecettePage,
    TabsPage,
    DetailsRecettePage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecettesService
  ]
})
export class AppModule {}
