import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SurveyService } from '../service/survey.service';
import { CustomHttpService } from '../service/custom.header.service';
import { NgCalendarModule  } from 'ionic2-calendar';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    SurveyService, CustomHttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
    provide: CustomHttpService,
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
      return new CustomHttpService(backend, defaultOptions);
    },
    deps: [XHRBackend, RequestOptions]
  }
  ]
})
export class AppModule {}
