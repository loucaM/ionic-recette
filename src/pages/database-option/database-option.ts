import { Component } from "@angular/core";
import { Grid } from "ionic-angular/components/grid/grid";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
    selector: 'page-sl-options',
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>
                        <h3> Store and Load </h3>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                         <button ion-button outline (click)="onAction('load')">Load List</button>
                        </ion-col>
                    </ion-row>
                        <ion-col>
                            <button ion-button outline (click)="onAction('store')">Save List</button>
                        </ion-col>
                </ion-grid>`
})

export class DatabaseOptionsPage {
    constructor(private viewCtrl: ViewController) {}
    onAction(action: string) {
        this.viewCtrl.dismiss({action: action});
    }

}