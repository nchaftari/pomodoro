import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TimerComponent } from './components/timer/timer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WindowComponent } from './components/window/window.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { FooterComponent } from './components/footer/footer.component';
import { MinutesToHours } from 'src/pipes/hourMinPipe';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    SettingsComponent,
    NavbarComponent,
    WindowComponent,
    AboutComponent,
    SplashScreenComponent,
    FooterComponent,
    MinutesToHours,
    ConfirmationModalComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
