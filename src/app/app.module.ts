import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ThemeService} from './service/theme';
import {TokenService} from './service/token';
import {GitHubService} from './service/github';
import {PostService} from './service/post';
import {UserProfileComponent} from './component/user-profile';
import {HeaderComponent} from './component/header';
import {FooterComponent} from './component/footer';
import {CONFIG, CONFIG_TOKEN, firebaseConfig} from './config';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouting,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [AppComponent],
  providers: [
    GitHubService,
    ThemeService,
    TokenService,
    PostService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: CONFIG_TOKEN, useValue: CONFIG}
  ],
  entryComponents: [
    UserProfileComponent
  ]
})
export class AppModule {
}
