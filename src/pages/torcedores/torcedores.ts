import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';
import { TorcedoresInfoPage } from '../torcedores-info/torcedores-info';

/**
 * Generated class for the TorcedoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-torcedores',
  templateUrl: 'torcedores.html',
})
export class TorcedoresPage {

  torcedores: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllTorcedores();
  }

  getAllTorcedores() {
    firebase.database().ref('torcedores').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.torcedores = tmp;
    })
  }

  delete(id){
    firebase.database().ref('torcedores/'+id).remove();
  }

  showPassengerInfo(key){
    this.modalCtrl.create(TorcedoresInfoPage, {key}).present();
  }
}
