import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/services/theme.service';
import { fadeOut } from '../animations/fadeIn-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeOut],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  subscriptionList: Subscription[] = [];

  constructor(private themeService: ThemeService) {}
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.subscriptionList.push(
      this.themeService.themeIndicator.subscribe((theme) => {
        this.colorTheme = theme;
        // if (this.colorTheme == 'dark') {
        //   this.image = 'assets/images/pomodoro.png';
        // } else {
        //   this.image = 'assets/images/pomodoro.png';
        // }
      })
    );
  }
  colorTheme = 'dark';
  ngAfterViewInit(): void {
    setInterval(() => {
      this.loaded = false;
    }, 1000);
  }
  title = 'pomodoro';
  loaded = true;
}
