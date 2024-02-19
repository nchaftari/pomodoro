import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeColor } from 'src/interfaces/theme.interface';
import { PomodoroService } from 'src/services/pomodoro.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit, OnDestroy {
  @HostBinding('style.background') backgroundColor: string;
  @HostBinding('style.height') height: string;
  @HostBinding('style.display') display: string;
  @HostBinding('style.transition') transition: string;

  subscriptionList: Subscription[] = [];

  constructor(
    private themeService: ThemeService,
    private pomodoroService: PomodoroService
  ) {
    this.backgroundColor = 'black';
    this.subscriptionList.push(
      this.themeService.backgroundIndicator.subscribe((bg: string) => {
        this.backgroundColor = bg;
      })
    );
    this.height = '100vh';
    this.display = 'block';
    this.transition = 'all 1000ms cubic-bezier(0.4, 0, 1, 1) 0ms';

    this.subscriptionList.push(
      this.pomodoroService.pomodoroStatusIndicator.subscribe((status: any) => {
        console.log(status);
        if (status.type == 'pomodoro') {
          themeService.defaultBg();
        } else if (status.type == 'shortBreak') {
          themeService.shortBg();
        } else if (status.type == 'longBreak') {
          themeService.longBg();
        } else {
          themeService.defaultBg();
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
}
