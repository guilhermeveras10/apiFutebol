import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the TorcedoresInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-torcedores-info',
  templateUrl: 'torcedores-info.html',
})
export class TorcedoresInfoPage {

  torcedor: any = {};
  torcedorKey: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadCtrl: LoadingController, public toastCtrl: ToastController) {
    this.torcedorKey = navParams.get('key');
  }

  ionViewDidLoad() {
    this.getTorcedorInfo();
  }
  getTorcedorInfo(){
    firebase.database().ref('torcedores/'+this.torcedorKey).on('value', snapshot => {
      this.torcedor = snapshot.val();
    })
  }

  updateUserInfo(){
    firebase.database().ref('torcedores/'+this.torcedorKey).update(this.torcedor).then(data=>{
      this.displayToast("Upado com sucesso");
    }).catch( err => console.log(err));
  }

  displayToast(message){
    this.toastCtrl.create({ message: message, duration: 2000}).present()
  }

  close(){
    this.viewCtrl.dismiss();
  }
}