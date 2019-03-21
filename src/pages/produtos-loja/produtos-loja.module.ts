import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosLojaPage } from './produtos-loja';

@NgModule({
  declarations: [
    ProdutosLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosLojaPage),
  ],
})
export class ProdutosLojaPageModule {}
