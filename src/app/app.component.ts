import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NoticiasPage } from '../pages/noticias/noticias';
import { TorcedoresPage } from '../pages/torcedores/torcedores';
import { ArtilheirosPage } from '../pages/artilheiros/artilheiros';
import { EnquetesPage } from '../pages/enquetes/enquetes';
import * as firebase from 'firebase';
import { JogadoresPage } from '../pages/jogadores/jogadores';
import { JogosPage } from '../pages/jogos/jogos';
import { ProdutosLojaPage } from '../pages/produtos-loja/produtos-loja';
import { ProdutosPontosPage } from '../pages/produtos-pontos/produtos-pontos';
import { LoginPage } from '../pages/login/login';
import { SorteiosPage } from '../pages/sorteios/sorteios';
import { VideosPage } from '../pages/videos/videos';
import { TimesPage } from '../pages/times/times';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NoticiasPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Torcedores', component: TorcedoresPage },
      { title: 'Notícias', component: NoticiasPage },
      { title: 'Jogadores', component: JogadoresPage },
      { title: 'Artilheiros', component: ArtilheirosPage },
      { title: 'Enquetes', component: EnquetesPage },
      { title: 'Sorteios', component: SorteiosPage },
      { title: 'Vídeos', component: VideosPage },
      { title: 'Tabelas', component: TimesPage },
      { title: 'Produtos de pontos', component: ProdutosPontosPage },
      { title: 'Produtos da loja', component: ProdutosLojaPage },
      { title: 'Jogos', component: JogosPage }
    ];

  }

  initializeApp() {
    firebase.initializeApp({
      apiKey: "AIzaSyDHeksMw52dDwN9ULGTSjD1567Z8ykEA1c",
      authDomain: "patrociniopremiado-ddabd.firebaseapp.com",
      databaseURL: "https://patrociniopremiado-ddabd.firebaseio.com",
      projectId: "patrociniopremiado-ddabd",
      storageBucket: "patrociniopremiado-ddabd.appspot.com",
      messagingSenderId: "144670116619"
    });
    if (!firebase.auth().currentUser) {
      this.modalCtrl.create(LoginPage, {}, { enableBackdropDismiss: false }).present();
    }
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
