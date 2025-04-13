import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goal-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-progress.component.html',
  styleUrl: './goal-progress.component.css'
})
export class GoalProgressComponent implements OnChanges {
  @Input() goal!: Goal;
  
  progressPercentage: number = 0;
  daysRemaining: number = 0;
  
  ngOnChanges(): void {
    this.calculateProgress();
    this.calculateDaysRemaining();
  }
  
  calculateProgress(): void {
    if (this.goal.type === 'weight' && this.goal.target < this.goal.current) {
      // For weight loss goals, we invert the calculation
      const totalToLose = this.goal.current - this.goal.target;
      const lost = this.goal.current - this.goal.current; // This would be updated with actual current weight
      this.progressPercentage = Math.min(100, (lost / totalToLose) * 100);
    } else {
      this.progressPercentage = Math.min(100, (this.goal.current / this.goal.target) * 100);
    }
  }
  
  calculateDaysRemaining(): void {
    const today = new Date();
    const endDate = new Date(this.goal.endDate);
    const timeDiff = endDate.getTime() - today.getTime();
    this.daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }
  
  getGoalIcon(): string {
    switch (this.goal.type) {
      case 'steps':
        return '👟';
      case 'calories':
        return '🔥';
      case 'weight':
        return '⚖️';
      case 'workout':
        return '💪';
      default:
        return '🎯';
    }
  }
  
  getGoalTitle(): string {
    switch (this.goal.type) {
      case 'steps':
        return 'Daily Steps';
      case 'calories':
        return 'Calorie Burn';
      case 'weight':
        return 'Weight Goal';
      case 'workout':
        return 'Workout Sessions';
      default:
        return 'Goal';
    }
  }
}
