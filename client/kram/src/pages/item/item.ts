import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { KramPage } from '../kram/kram';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  private editable: boolean;
  private newItem: boolean;
  private itemId: number;
  item: any = {
    "name": null, 
    "quantity": null, 
    "price": null, 
    "location": null, 
    "notes": null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public restProvider: RestProvider, public events: Events) {
    this.editable = navParams.get("editable");
    this.itemId = navParams.get("itemId");
    this.newItem = navParams.get("newItem");
    // console.log({itemId: this.itemId, editable: this.editable, newItem: this.newItem});
    if (this.newItem === false) {
      restProvider.getItem(this.itemId).then(res => this.item = res);
    }
    //name, quantity, price, location, notes
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
  create() {
    this.restProvider.postCreate({
      "userId": 1,
      "name": this.item.name,
      "quantity": this.item.quantity,
      "price": this.item.price,
      "location": this.item.location,
      "notes": this.item.notes
    }).then( () => {
      this.events.publish('list:refresh');
      this.navCtrl.pop();
    });
    this.newItem = false;
    this.setEditable(false);

  }
  save() {
    this.restProvider.postUpdate({
      "itemId": this.itemId,
      "name": this.item.name,
      "quantity": this.item.quantity,
      "price": this.item.price,
      "location": this.item.location,
      "notes": this.item.notes
    }).then( () => {
      this.events.publish('list:refresh');
    });
    this.setEditable(false);
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
            console.log({"itemId": this.itemId});
            this.restProvider.postDelete({itemId: this.itemId}).then( () => {
              this.events.publish('list:refresh');
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
