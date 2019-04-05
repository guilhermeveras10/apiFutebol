import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the JogosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html',
})
export class JogosPage {

  jogo: any = {};
  jogos: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllVideos();
  }

  save() {
    // this.upload();
    firebase.database().ref('jogos/').push().update(this.jogo).then(data => {
      this.displayToast("Upado com sucesso")
    });
  }

  chooseFile() { document.getElementById('escudooponente').click(); }

  chooseFileOponente() { document.getElementById('meuescudo').click(); }

  chooseFileCampeonato() { document.getElementById('campeonato').click(); }

  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('escudooponente')).files[0]]) {
      let path = '/jogos/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.jogo.escudooponente = snapshot.downloadURL;
        this.jogo.timestamp = firebase.database.ServerValue.TIMESTAMP;
        this.jogo.status = 'SUCESSO';
        // this.uploadVideo();
      });
    }
  }

  uploadCampeonato() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('campeonato')).files[0]]) {
      let path = '/jogos/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.jogo.campeonato = snapshot.downloadURL;
      });
    }
  }

  uploadVideo() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('meuescudo')).files[0]]) {
      let path = '/jogos/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.jogo.meuescudo = snapshot.downloadURL;
      });
    }
  }

  getAllVideos() {
    firebase.database().ref('jogos').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.jogos = tmp;
    })
  }

  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }

  delete(id){
    firebase.database().ref('jogos/'+id).remove();
  }

  colocar(id,jogo){
    firebase.database().ref('jogos/'+id).update(jogo);
  }
}
