import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ENV_CONFIG} from './env';
import {environment} from '../../environments/environment';
import {FirebaseModule} from './firebase/firebase.module';


@NgModule({
  declarations: [],
  providers: [
    {provide: ENV_CONFIG, useValue: environment},
  ],
  imports: [
    CommonModule,
    FirebaseModule
  ]
})
export class CoreModule {
}
