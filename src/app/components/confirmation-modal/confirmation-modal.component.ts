import { Component, OnInit } from '@angular/core';
import { PomodoroService } from 'src/services/pomodoro.service';
import { fadeIn } from '../../../animations/fadeIn-animation';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  animations: [fadeIn],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(private pomodoroService: PomodoroService) {}
  ngOnInit(): void {}

  stopPomo() {
    this.pomodoroService.resetPomo();
  }
}
