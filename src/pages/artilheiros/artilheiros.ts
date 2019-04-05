import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the ArtilheirosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artilheiros',
  templateUrl: 'artilheiros.html',
})
export class ArtilheirosPage {

  artilheiro: any = {};
  artilheiros: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllArtilheiros();
  }

  save() {
    this.upload();
    firebase.database().ref('artilheiros/').push().update(this.artilheiro).then(data => {
      this.displayToast("Upado com sucesso")
    });
  }

  chooseFile() { document.getElementById('imgArtilheiro').click(); }

  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('imgArtilheiro')).files[0]]) {
      let path = '/artilheiros/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.artilheiro.url = snapshot.downloadURL;
        this.artilheiro.status = 'SUCESSO';
      });
    }
  }

  getAllArtilheiros() {
    firebase.database().ref('artilheiros').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.artilheiros = tmp;
    })
  }

  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }

  delete(id){
    firebase.database().ref('artilheiros/'+id).remove();
  }

}
