import { Injectable } from '@angular/core';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  public userId: number;
  public email: string;
  public fullName: string;
  public itemCount: number;
}
