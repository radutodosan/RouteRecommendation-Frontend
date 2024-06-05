import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {UvtRewardsService} from "../../services/uvt-rewards.service";

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  // @ts-ignore
  private subscription: Subscription;
  // @ts-ignore
  public timeLeft: string;
  // @ts-ignore
  private targetDate: Date;

  constructor(
    private uvtRewardsService: UvtRewardsService
  ) {}

  ngOnInit(): void {
    this.setTargetDate();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setTargetDate(): void {
    const now = new Date();
    const nextMonth = (now.getMonth() + 1) % 12;
    const year = nextMonth === 0 ? now.getFullYear() + 1 : now.getFullYear();
    this.targetDate = new Date(year, nextMonth, 1, 0, 0, 0);
  }

  private startCountdown(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.updateTimeLeft();
    });
  }

  private updateTimeLeft(): void {
    const now = new Date();
    const timeDiff = this.targetDate.getTime() - now.getTime();
    if (timeDiff <= 0) {
      this.onCountdownComplete();
      this.setTargetDate();
    } else {
      this.timeLeft = this.formatTime(timeDiff);
    }
  }

  private formatTime(timeDiff: number): string {
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  private onCountdownComplete(): void {
    console.log('Countdown complete! Resetting timer and calling function.');
    this.rewardUsers();
  }

  private rewardUsers(): void {
    this.uvtRewardsService.addRewards().subscribe(response => {
      console.log(response)
    }, error => {
      throw error;
    });
  }
}
