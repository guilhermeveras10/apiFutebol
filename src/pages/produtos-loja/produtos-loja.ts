import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the ProdutosLojaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos-loja',
  templateUrl: 'produtos-loja.html',
})
export class ProdutosLojaPage {

  produto: any = {};
  produtos: any = [];
  constructor(public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawRequestsPage');
    this.getAllProdutos();
  }

  save() {
    this.upload();
    firebase.database().ref('produtosLoja/').push().update(this.produto).then(data => {
      this.displayToast("Upado com sucesso")
    });
  }

  chooseFile() { document.getElementById('imgProduto').click(); }

  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('imgProduto')).files[0]]) {
      let path = '/produtosLoja/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.produto.url = snapshot.downloadURL;
        this.produto.timestamp = firebase.database.ServerValue.TIMESTAMP;
        this.produto.status = 'SUCESSO';
      });
    }
  }

  getAllProdutos() {
    firebase.database().ref('produtosLoja').on('value', requests => {
      let tmp = [];
      requests.forEach(request => {
        tmp.push({ key: request.key, ...request.val() });
        return false;
      });
      this.produtos = tmp;
    })
  }

  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }

  delete(id){
    firebase.database().ref('produtosLoja/'+id).remove();
  }

}
