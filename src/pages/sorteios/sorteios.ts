import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the SorteiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sorteios',
  templateUrl: 'sorteios.html',
})
export class SorteiosPage {

  sorteio: any = {};
  sorteios: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllJogadores();
  }

  save() {
    this.upload();
    firebase.database().ref('sorteios/').push().update(this.sorteio).then(data => {
      this.displayToast("Upado com sucesso")
    });
  }

  chooseFile() { document.getElementById('imgSorteio').click(); }

  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('imgSorteio')).files[0]]) {
      let path = '/sorteios/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.sorteio.url = snapshot.downloadURL;
        this.sorteio.timestamp = firebase.database.ServerValue.TIMESTAMP;
        this.sorteio.status = 'SUCESSO';
      });
    }
  }

  getAllJogadores() {
    firebase.database().ref('sorteios').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.sorteios = tmp;
    })
  }

  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }

  delete(id){
    firebase.database().ref('sorteios/'+id).update({ status: 'RETIRADO'});
  }

  colocar(id){
    firebase.database().ref('sorteios/'+id).update({ status: 'SUCESSO'});
  }
}
