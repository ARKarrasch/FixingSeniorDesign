import { Component } from '@angular/core';
import { App, MenuController, NavController, PopoverController, ViewController, AlertController, NavParams, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ItemPage } from '../item/item';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="refresh()">Refresh</button>
      <button ion-item (click)="showRadio()">Sort by...</button>
    </ion-list>
  `
})
export class PopoverPage {
  sort: string;

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navParms: NavParams, 
    public events: Events) {}

  ngOnInit() {
    if (this.navParms.data) {
      this.sort = this.navParms.data.sort;
    }
  }

  refresh() {
    this.events.publish('list:refresh');
    this.close();
  }
  close() {
    this.viewCtrl.dismiss(this.sort);
  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort By');

    alert.addInput({
      type: 'radio',
      label: 'Name',
      value: 'name',
      checked: this.sort == 'name'
    });

    alert.addInput({
      type: 'radio',
      label: 'Location',
      value: 'location',
      checked: this.sort == 'location'
    });

    alert.addInput({
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: this.sort == 'price'
    });

    alert.addButton({
      text: 'Cancel',
      handler: () => {
        this.close();
      }
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.sort = data;
        this.close();
      }
    });

    alert.present();
  }
}

@Component({
  selector: 'page-kram',
  templateUrl: 'kram.html'
})
export class KramPage {
  showSearchbar = false;
  sort = 'name';
  searchTerm = "";
  data: any;
  constructor(app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, 
    public menu: MenuController, public restProvider: RestProvider, public events: Events, public userDataProvider: UserDataProvider) {
    this.data = {'data':[]};
    this.refresh();
    menu.enable(true);
    events.subscribe('list:refresh', () => {
      this.refresh();
    });
  }

  goToItem(params) {
    if (!params) params = {itemId:null, editable: true, newItem: true};
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
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      sort: this.sort
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this.sort = data;
      this.refresh();
    })
  }
  search() {
    this.restProvider.postSearch({userId: this.userDataProvider.userId, sort:this.sort, search:this.searchTerm}).then(res => this.data = res);
    this.toggleSearchbar();
  }
  refresh() {
    this.restProvider.postItems({userId: this.userDataProvider.userId, sort:this.sort}).then(res => this.data = res).then(() => this.userDataProvider.itemCount = this.data['data'].length);
  }
}
