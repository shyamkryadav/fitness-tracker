import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calorie-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calorie-tracker.component.html',
  styleUrl: './calorie-tracker.component.css'
})
export class CalorieTrackerComponent implements OnChanges {
  @Input() caloriesBurned: number = 0;
  @Input() caloriesConsumed: number = 0;
  @Input() calorieGoal: number = 2500;
  
  netCalories: number = 0;
  caloriesRemaining: number = 0;
  progressPercentage: number = 0;
  
  ngOnChanges(): void {
    this.calculateCalories();
  }
  
  calculateCalories(): void {
    this.netCalories = this.caloriesConsumed - this.caloriesBurned;
    this.caloriesRemaining = this.calorieGoal - this.netCalories;
    this.progressPercentage = Math.min(100, (this.netCalories / this.calorieGoal) * 100);
  }
}
