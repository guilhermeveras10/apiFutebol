import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the EnquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquetes',
  templateUrl: 'enquetes.html',
})
export class EnquetesPage {

  enquete: any = {};
  enquetes: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllenquetes();
  }

  save() {
    this.enquete.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.enquete.status = 'SUCESSO';
    firebase.database().ref('enquetes/').push().update(this.enquete).then(data => {
      this.displayToast("Upado com sucesso")
    });
  }

  getAllenquetes() {
    firebase.database().ref('enquetes').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.enquetes = tmp;
    })
  }

  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }

  delete(id){
    firebase.database().ref('enquetes/'+id).remove();
  }

}
