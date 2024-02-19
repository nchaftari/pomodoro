import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  colorTheme: string = 'dark';
  image: string = 'assets/images/pomodoro.png';
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
        if (this.colorTheme == 'dark') {
          this.image = 'assets/images/pomodoro.png';
        } else {
          this.image = 'assets/images/pomodoro.png';
        }
      })
    );
  }
}
