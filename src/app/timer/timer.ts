import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports:[MatIcon, CommonModule],
  templateUrl: './timer.html',
  styleUrls: ['./timer.scss']
})
export class Timer {
  timer: number = 0; // Timer in seconds
  isRunning: boolean = false; // To control timer state (running or paused)
  timerInterval: any; // Reference to the interval
  isStarted: boolean = false; // Flag to check if the timer is started

  // Start or pause the timer
  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  // Start the timer
  startTimer() {
    this.isRunning = true;
    this.isStarted = true;
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  // Pause the timer
  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  // Reset the timer
  resetTimer() {
    this.isRunning = false;
    this.timer = 0;
    clearInterval(this.timerInterval);
  }

  // Get timer display in mm:ss format
  getFormattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  // Helper method to ensure 2-digit time display
  formatTime(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }
}
