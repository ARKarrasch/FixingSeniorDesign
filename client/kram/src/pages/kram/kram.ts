import { Component } from '@angular/core';
import { App, MenuController, NavController, PopoverController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-kram',
  templateUrl: 'kram.html'
})
export class KramPage {
  showSearchbar = false;
  userId = 1;
  sort = 'name';
  data: any;
  constructor(app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, 
    public menu: MenuController, public restProvider: RestProvider) {
    this.data = {'data':[]};
    restProvider.postItems({userId: this.userId, sort:this.sort}).then(res => this.data = res);
    menu.enable(true);
  }

  goToItem(params) {
    if (!params) params = {itemId:null, editable: true};
    this.navCtrl.push(ItemPage, params);
  }
  openMenu() {
    this.menu.open();
  }
  toggleSearchbar() {
    if (this.showSearchbar === false) {
      this.showSearchbar = true;
    } else {
      this.showSearchbar = false;
    }
  }
}
