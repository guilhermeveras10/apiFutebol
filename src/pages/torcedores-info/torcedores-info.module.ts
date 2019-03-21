import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TorcedoresInfoPage } from './torcedores-info';

@NgModule({
  declarations: [
    TorcedoresInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TorcedoresInfoPage),
  ],
})
export class TorcedoresInfoPageModule {}
