import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FirebaseBootstrapperModule} from './core/firestore-helper';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseBootstrapperModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
