import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemeColor } from 'src/interfaces/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // private theme:string='dark'
  constructor() {}
  private themeEvent = new Subject<string>();
  private backgroundEvent = new Subject<string>();

  defaultBgColor = '#051cea';
  colorThemeDefault: ThemeColor = {
    main: '#051cea',
    shortBreak: '#880000',
    longBreak: '#016301',
  };
  colorTheme: ThemeColor = {
    main: '#051cea',
    shortBreak: '#880000',
    longBreak: '#016301',
  };

  get themeIndicator() {
    return this.themeEvent;
  }
  get backgroundIndicator() {
    return this.backgroundEvent;
  }

  resetTheme() {
    this.colorTheme.main = this.colorThemeDefault.main;
    this.colorTheme.shortBreak = this.colorThemeDefault.shortBreak;
    this.colorTheme.longBreak = this.colorThemeDefault.longBreak;
  }
  setColorTheme(theme: ThemeColor) {
    this.colorTheme = theme;
  }
  defaultBg() {
    this.backgroundEvent.next(this.colorTheme.main);
  }
  shortBg() {
    this.backgroundEvent.next(this.colorTheme.shortBreak);
  }
  longBg() {
    this.backgroundEvent.next(this.colorTheme.longBreak);
  }
}
