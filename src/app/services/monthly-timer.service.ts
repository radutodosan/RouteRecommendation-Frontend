import { Injectable } from '@angular/core';
import { timer, BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {UvtRewardsService} from "./uvt-rewards.service";

@Injectable({
  providedIn: 'root',
})
export class MonthlyTimerService {
  private countdown$ = new BehaviorSubject<number>(0);
  private countdownInterval: any;

  constructor(
    private uvtRewardsService: UvtRewardsService
  ) {
    this.initializeTimer();

  }

  initializeTimer() {
    const timeUntilNextMonth = this.calculateTimeUntilNextMonth();
    const monthlyTimer$ = timer(timeUntilNextMonth).pipe(
      switchMap(() => timer(0, this.calculateTimeUntilNextMonth()))
    );

    monthlyTimer$.subscribe(() => {
      this.resetFunction();
      this.startCountdown();
    });

    this.startCountdown();
  }

  calculateTimeUntilNextMonth(): number {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.getTime() - now.getTime();
  }

  startCountdown() {
    const timeUntilNextMonth = this.calculateTimeUntilNextMonth();
    this.updateCountdown(timeUntilNextMonth);
  }

  updateCountdown(duration: number) {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      if (duration >= 0) {
        this.countdown$.next(duration);
        duration -= 1000;
      } else {
        clearInterval(this.countdownInterval);
        this.countdown$.next(0); // Ensure countdown never emits null
      }
    }, 1000);
  }

  getCountdown(): Observable<number> {
    return this.countdown$.asObservable();
  }

  resetFunction() {
    console.log('Timer reset and function called');

    this.uvtRewardsService.addRewards().subscribe(error => {
      throw error;
    });
  }
}
