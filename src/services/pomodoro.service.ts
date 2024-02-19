import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PomoSettings } from 'src/interfaces/pomoSettings.interface';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  constructor() {
    this.pomodoroStatus.subscribe((status) => {
      if (status) {
        this.pomoTime = status.length * 60;
      }
    });
    this.pauseStatus.subscribe((status) => {
      this.paused = status;
    });
  }
  private started = new Subject<boolean>();
  private pomodoroStatus = new Subject<any>();
  private completionStatus = new Subject<any>();
  private sessionComplete = new Subject<any>();
  private pauseStatus = new Subject<any>();
  private paused: boolean = false;

  private pomodoroDefault: PomoSettings = {
    pomodoroCount: 4,
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
  };
  private pomodoro: PomoSettings = {
    pomodoroCount: 4,
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
  };

  private pomoTime: number = 0;
  private completion: boolean = true;
  private pomoCount = this.pomodoro.pomodoroCount;

  private pomodoroList: any[] = [];

  getPomodoro() {
    return this.pomodoro;
  }

  setPomodoro(newPomodoro: PomoSettings) {
    this.pomodoro.longBreakLength = newPomodoro.longBreakLength;
    this.pomodoro.pomodoroCount = newPomodoro.pomodoroCount;
    this.pomodoro.pomodoroLength = newPomodoro.pomodoroLength;
    this.pomodoro.shortBreakLength = newPomodoro.shortBreakLength;
  }

  getPomodoroInstance() {
    return new Observable((pomo) => {
      setInterval(() => {
        if (!this.paused) {
          if (this.pomoTime == 0) {
            pomo.next({ min: 0, sec: 0 });
            if (!this.completion) {
              this.playNotification();
              this.completion = !this.completion;
              this.completionStatus.next(true);
            }
            // pomo.complete();
          } else {
            this.pomoTime = this.pomoTime - 1;
            let minutes = Math.floor(this.pomoTime / 60);
            pomo.next({ min: minutes, sec: this.pomoTime - minutes * 60 });
          }
        }
      }, 1000);
    });
  }
  startPomo() {
    this.pomodoroList = this.generatePomoList(this.pomodoro).list
    this.pomodoroStatus.next(this.pomodoroList[0]);
    this.started.next(true);
    this.completion = false;
    this.completionStatus.next(false);
    this.sessionComplete.next(false);
    // this.pomoTime = this.pomodoro.pomodoroLength * 60;
  }
  generatePomoList(pomodoro:PomoSettings) {
    let list: { type: string; length: number }[] = [];
    let time = 0;
    var foo = new Array(pomodoro.pomodoroCount).fill(0);
    foo.forEach((pomo, index) => {
      list.push({ type: 'pomodoro', length: pomodoro.pomodoroLength });
      time += pomodoro.pomodoroLength;
      if(index+1 < pomodoro.pomodoroCount)
      if ((index + 1) % 4 == 0) {
        list.push({ type: 'longBreak', length: pomodoro.longBreakLength });
        time += pomodoro.longBreakLength;
      } else {
        list.push({
          type: 'shortBreak',
          length: pomodoro.shortBreakLength,
        });
        time += pomodoro.shortBreakLength;
      }
    });
    console.log(list);
    return { list: list, time: time };
  }
  resetPomo() {
    this.started.next(false);
    this.completionStatus.next(false);

    this.pomoTime = 0;
  }
  pausePomo() {
    this.pauseStatus.next(!this.paused);
  }
  resumePomo() {
    this.pomodoroList = this.pomodoroList.slice(1);
    if (this.pomodoroList.length > 0) {
      this.started.next(true);
      this.completion = false;
      this.completionStatus.next(false);
      this.pomodoroStatus.next(this.pomodoroList[0]);
    } else {
      this.sessionComplete.next(true);
      this.pomodoroStatus.next({ type: 'done' });
    }
  }
  emitStatus() {
    this.pomodoroStatus.next(this.pomodoroList[0]);
  }
  decrementPomodoro() {
    this.pomodoro.pomodoroCount;
  }
  resetSettings() {
    this.setPomodoro(this.pomodoroDefault);
  }
  playNotification() {
    let audio = new Audio();
    audio.src = 'assets/audio/alarm.wav';
    audio.load();
    audio.play();
  }
  get startIndicator() {
    return this.started;
  }
  get completionStatusIndicator() {
    return this.completionStatus;
  }
  get sessionStatusIndicator() {
    return this.sessionComplete;
  }
  get pomodoroStatusIndicator() {
    return this.pomodoroStatus;
  }
  get pauseStatusIndicator() {
    return this.pauseStatus;
  }
}
