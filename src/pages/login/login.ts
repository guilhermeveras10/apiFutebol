import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};
  adminEmail:any = 'admin@admin.com';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  login(){
    let loader = this.loadCtrl.create({ content:'Validating...'});
    loader.present();
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(data=>{
      console.log(data);
      loader.dismiss();
      if(firebase.auth().currentUser.email == this.adminEmail){
        this.viewCtrl.dismiss();
      }
    }).catch(err => {
      console.log(err);
      this.toastCtrl.create({ message: err, duration: 2000}).present();
      loader.dismiss();
    });
  }

}
