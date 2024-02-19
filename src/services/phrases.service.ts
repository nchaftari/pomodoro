import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhrasesService {
  constructor() {}
  workPhrases: string[] = [
    'Get to it.',
    "Let's do this.",
    'Grind time.',
    'Put in work.',
    "Clock's ticking.",
    'Time to hustle.',
    'Focus now.',
    'Roll up sleeves.',
    'Get busy.',
    "Let's go!",
    'Get cracking.',
    'Make it happen.',
    'Get things done.',
    "Let's make progress.",
    'All hands on deck.',
    'Tackle the day.',
    'Mind on the prize.',
    'Take action.',
    'Get motivated.',
    'Time to get busy.',
  ];
  workPhrasesFunny = [
    "It's go time!",
    "Let's make things happen!",
    'Grind mode activated.',
    "Let's turn up the hustle!",
    "Tick-tock, time's a'wasting!",
    'Ready, set, hustle!',
    "Let's get our focus on!",
    'Roll up those sleeves and get to work!',
    "Let's get this party started!",
    "Let's gooooo!",
    'Crack those knuckles and get to work!',
    'Make things happen, stat!',
    "It's time to get things done!",
    "Let's make some progress, people!",
    "All hands on deck, let's do this!",
    'Time to tackle the day!',
    "Minds on the prize and let's get to work!",
    "No more procrastination, let's take action!",
    "Let's get motivated and make things happen!",
    "It's time to get busy and make magic happen!",
  ];
  shortBreak = [
    'Take a breather.',
    'Time out.',
    'Relax a bit.',
    'Break time.',
    'Recharge.',
    'Step away.',
    'Chill moment.',
    'Time off.',
    'Pause and relax.',
    'Recharge batteries.',
    'Have a rest.',
    'Take five.',
    'Enjoy a breather.',
    'Take a pause.',
    'Stretch legs.',
    'Refresh mind.',
    'Unwind for a bit.',
    'Get some fresh air.',
    'Relax and recharge.',
    'Have a mini vacation.',
  ];
  shortBreakFunny = [
    'Take a load off!',
    'Break time, whoo!',
    "Relax, don't do it!",
    'Break time, baby!',
    'Recharge those batteries!',
    'Step away from the desk!',
    'Chill moment, activated!',
    "Time off, let's do this!",
    'Pause, relax, and take it easy!',
    'Recharge those batteries, stat!',
    'Rest those weary bones!',
    'Take five and have some fun!',
    'Breathe easy and enjoy a break!',
    'Pause for a moment and unwind!',
    'Stretch those legs and relax!',
    'Refresh that mind, it deserves it!',
    "Unwind for a bit, you've earned it!",
    'Get some fresh air, you deserve it!',
    "Relax and recharge, it's important!",
    'Have a mini vacation, you deserve it!',
  ];
  longBreak = [
    'Long rest.',
    'Extended break.',
    'Time off.',
    'Vacation time.',
    'Get away.',
    'Relax and recharge.',
    'Take a breather.',
    'Escape for a while.',
    'Unwind and enjoy.',
    'Take a timeout.',
    'Vacation mode.',
    'Take a trip.',
    'Enjoy a sabbatical.',
    'Take a holiday.',
    'Long break time.',
    'Step away for a bit.',
    'Get some distance.',
    'Take some time off.',
    'Go on an adventure.',
    'Enjoy some downtime.',
  ];
  longBreakFunny = [
    'Long rest, party time!',
    'Extended break, here we go!',
    'Time off, woo hoo!',
    'Vacation time, yippee!',
    'Get away, adventure awaits!',
    "Relax and recharge, let's do this!",
    "Take a breather, you've earned it!",
    'Escape for a while, you deserve it!',
    "Unwind and enjoy, you've earned it!",
    "Take a timeout, let's have some fun!",
    'Vacation mode, activate!',
    'Take a trip, the world awaits!',
    "Enjoy a sabbatical, you've earned it!",
    "Take a holiday, it's time!",
    "Long break time, let's do this!",
    'Step away for a bit, you deserve it!',
    'Get some distance, you need it!',
    'Take some time off, you deserve it!',
    'Go on an adventure, live a little!',
    "Enjoy some downtime, you've earned it!",
  ];
  getRandomString(strings: string[]): string {
    return strings[Math.floor(Math.random() * strings.length)];
  }
  getWorkPhrase() {
    return this.getRandomString(this.workPhrasesFunny);
  }
  getShortBreakPhrase() {
    return this.getRandomString(this.shortBreakFunny);
  }
  getLongBreakPhrase() {
    return this.getRandomString(this.longBreakFunny);
  }
}
