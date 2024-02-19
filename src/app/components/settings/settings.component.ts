import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PomoSettings } from 'src/interfaces/pomoSettings.interface';
import { PomodoroService } from 'src/services/pomodoro.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  pomoSettings!: PomoSettings;
  form!: FormGroup;
  colorTheme: string = 'dark';
  subscriptionList: Subscription[] = [];
  totalTime: number = 115;
  myForm!: FormGroup;

  constructor(
    private pomodoroService: PomodoroService,
    private themeService: ThemeService
  ) {
    this.setSettings()
  }
  setSettings(){
    this.pomoSettings = this.pomodoroService.getPomodoro();
    this.myForm = new FormGroup({
      pomodoroCount: new FormControl(this.pomoSettings.pomodoroCount, [
        Validators.required,
        Validators.min(1),
      ]),
      length: new FormControl(this.pomoSettings.pomodoroLength, [
        Validators.required,
        Validators.min(1),
      ]),
      shortBreak: new FormControl(this.pomoSettings.shortBreakLength, [
        Validators.required,
        Validators.min(1),
      ]),
      longBreak: new FormControl(this.pomoSettings.longBreakLength, [
        Validators.required,
        Validators.min(1),
      ]),
      colorTheme: new FormGroup({
        main: new FormControl(
          this.themeService.colorTheme.main,
          Validators.required
        ),
        shortBreak: new FormControl(
          this.themeService.colorTheme.shortBreak,
          Validators.required
        ),
        longBreak: new FormControl(
          this.themeService.colorTheme.longBreak,
          Validators.required
        ),
      }),
    });
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    // this.pomoSettings = this.pomodoroService.getPomodoro();
    this.form = this.myForm;
    this.subscriptionList.push(
      this.themeService.themeIndicator.subscribe((theme) => {
        this.colorTheme = theme;
      })
    );
    this.form.valueChanges.subscribe((val) => {
      console.log('changes', val);
      let pomo: PomoSettings = {
        pomodoroCount: val.pomodoroCount,
        pomodoroLength: val.length,
        shortBreakLength: val.shortBreak,
        longBreakLength: val.longBreak,
      };
      console.log(this.pomodoroService.generatePomoList(pomo).time);
      this.totalTime = this.pomodoroService.generatePomoList(pomo).time;
    });
  }
  defaultPomo() {
    this.pomodoroService.resetSettings();
    this.themeService.resetTheme();
    // this.pomodoroService.emitStatus();
    this.setSettings()
    this.form = this.myForm;
  }
  onSubmit() {
    console.log(this.form);
    let temp: PomoSettings = {
      pomodoroCount: this.form.value.pomodoroCount,
      pomodoroLength: this.form.value.length,
      shortBreakLength: this.form.value.shortBreak,
      longBreakLength: this.form.value.longBreak,
    };
    this.pomodoroService.setPomodoro(temp);
    this.themeService.setColorTheme(this.form.value.colorTheme);
    // this.pomodoroService.emitStatus();
  }
  toggleTheme() {
    if (this.colorTheme == 'dark') {
      this.themeService.themeIndicator.next('light');
    } else {
      this.themeService.themeIndicator.next('dark');
    }
  }
}
