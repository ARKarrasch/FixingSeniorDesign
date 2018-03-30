import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { KramPage } from '../kram/kram';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  private editable: boolean;
  private itemId: number;
  item = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public restProvider: RestProvider) {
    this.editable = navParams.get("editable");
    this.itemId = navParams.get("itemId");
    restProvider.getItem(this.itemId).then(res => this.item = res);
  }
  goToKram(params){
    if (!params) params = {};
    this.navCtrl.push(KramPage);
  }
  getEditable(){
    return this.editable;
  }
  setEditable(val: boolean){
    this.editable = val;
  }
  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'DELETE',
      message: 'Deleting an item is permanent. Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes');
          }
        }
      ]
    });
    confirm.present();
  }
}
