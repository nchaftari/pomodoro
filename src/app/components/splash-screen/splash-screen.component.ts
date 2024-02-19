import { Component } from '@angular/core';
import { fadeOut } from '../../../animations/fadeIn-animation';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations:[fadeOut]
})
export class SplashScreenComponent {

}
