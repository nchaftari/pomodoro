import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhrasesService } from 'src/services/phrases.service';
import { PomodoroService } from 'src/services/pomodoro.service';
import { fadeIn } from '../../../animations/fadeIn-animation';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  animations: [fadeIn],
})
export class TimerComponent implements OnInit, OnDestroy {
  min: number = 0;
  sec: number = 0;
  started: boolean = false;
  completed: boolean = false;
  sessionComplete: boolean = false;
  state: string = '';
  paused: boolean = false;
  animate = false;
  animateState = 'enter';
  workPhrase = '';
  shortBreakPhrase = '';
  longBreakPhrase = '';
  subscriptionList: Subscription[] = [];

  constructor(
    private pomodoroService: PomodoroService,
    private phrasesService: PhrasesService
  ) {}
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.pomodoroService.getPomodoroInstance().subscribe((pomo: any) => {
        this.min = pomo.min;
        this.sec = pomo.sec;
      })
    );
    this.subscriptionList.push(
      this.pomodoroService.startIndicator.subscribe((state) => {
        this.started = state;
      })
    );
    this.subscriptionList.push(
      this.pomodoroService.completionStatusIndicator.subscribe((state) => {
        this.completed = state;
      })
    );
    this.subscriptionList.push(
      this.pomodoroService.sessionStatusIndicator.subscribe((state) => {
        this.sessionComplete = state;
      })
    );
    this.subscriptionList.push(
      this.pomodoroService.pomodoroStatusIndicator.subscribe((state) => {
        console.log(state);
        this.workPhrase = this.phrasesService.getWorkPhrase();
        this.shortBreakPhrase = this.phrasesService.getShortBreakPhrase();
        this.longBreakPhrase = this.phrasesService.getLongBreakPhrase();
        this.state = state.type;
      })
    );
    this.subscriptionList.push(
      this.pomodoroService.pauseStatusIndicator.subscribe((state) => {
        this.paused = state;
      })
    );
  }

  startPomo() {
    this.pomodoroService.startPomo();
  }
  resetPomo() {
    this.pomodoroService.resetPomo();
  }
  pausePomo() {
    this.pomodoroService.pausePomo();
  }
  resumePomo() {
    this.pomodoroService.resumePomo();
  }
}
