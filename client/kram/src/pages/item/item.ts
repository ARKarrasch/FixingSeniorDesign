import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserDataProvider } from '../../providers/user-data/user-data'
import { KramPage } from '../kram/kram';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  private editable: boolean;
  private newItem: boolean;
  private itemId: number;
  private nameMissing: boolean;
  private quantityMissing: boolean;
  private priceMissing: boolean;
  item: any = {
    "name": null,
    "quantity": null,
    "price": null,
    "location": null,
    "notes": null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public restProvider: RestProvider, public events: Events, public userDataProvider: UserDataProvider) {
    this.editable = navParams.get("editable");
    this.itemId = navParams.get("itemId");
    this.newItem = navParams.get("newItem");
    if (this.newItem === false) {
      restProvider.getItem(this.itemId).then(res => this.item = res);
    }
    //name, quantity, price, location, notes
  }
  goToKram(params) {
    if (!params) params = {};
    this.navCtrl.push(KramPage);
  }
  getEditable() {
    return this.editable;
  }
  setEditable(val: boolean) {
    this.editable = val;
  }
  create() {
    if (this.checkRequired()) {
      this.restProvider.postCreate({
        "userId": this.userDataProvider.userId,
        "name": this.item.name,
        "quantity": this.item.quantity,
        "price": this.item.price,
        "location": this.item.location,
        "notes": this.item.notes
      }).then(() => {
        this.events.publish('list:refresh');
        this.navCtrl.pop();
      });
      this.newItem = false;
      this.setEditable(false);
    }
  }
  save() {
    if (this.checkRequired()) {
      this.restProvider.postUpdate({
        "itemId": this.itemId,
        "name": this.item.name,
        "quantity": this.item.quantity,
        "price": this.item.price,
        "location": this.item.location,
        "notes": this.item.notes
      }).then(() => {
        this.events.publish('list:refresh');
      });
      this.setEditable(false);
    }
  }
  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'DELETE',
      message: 'Deleting an item is permanent. Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.restProvider.postDelete({ itemId: this.itemId }).then(() => {
              this.events.publish('list:refresh');
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }
  checkRequired() {
    if (this.item.name === null || this.item.name === '') {
      this.nameMissing = true;
    } else {
      this.nameMissing = false;
    }

    if (this.item.quantity === null || this.item.quantity === '') {
      this.quantityMissing = true;
    } else {
      this.quantityMissing = false;
    }

    if (this.item.price === null || this.item.price === '') {
      this.priceMissing = true;
    } else {
      this.priceMissing = false;
    }

    return !this.nameMissing && !this.quantityMissing && !this.priceMissing
  }
}
