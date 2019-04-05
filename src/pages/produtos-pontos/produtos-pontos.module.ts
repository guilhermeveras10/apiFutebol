import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosPontosPage } from './produtos-pontos';

@NgModule({
  declarations: [
    ProdutosPontosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosPontosPage),
  ],
})
export class ProdutosPontosPageModule {}
