import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyActivity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.css'
})
export class ActivityChartComponent implements OnChanges {
  @Input() weeklyData: DailyActivity[] = [];

  chartData: any[] = [];
  maxSteps: number = 0;
  maxCalories: number = 0;

  ngOnChanges(): void {
    if (this.weeklyData.length > 0) {
      this.processChartData();
    }
  }

  processChartData(): void {
    this.chartData = this.weeklyData.map(day => {
      const date = new Date(day.date);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        steps: day.totalSteps,
        calories: day.totalCaloriesBurned
      };
    });

    this.maxSteps = Math.max(...this.chartData.map(item => item.steps));
    this.maxCalories = Math.max(...this.chartData.map(item => item.calories));
  }

  getStepBarHeight(steps: number): number {
    return this.maxSteps > 0 ? (steps / this.maxSteps) * 100 : 0;
  }

  getCalorieBarHeight(calories: number): number {
    return this.maxCalories > 0 ? (calories / this.maxCalories) * 100 : 0;
  }

  getAverageDailySteps(): string {
    if (this.chartData.length === 0) return '0';
    const total = this.chartData.reduce((sum: number, item: any) => sum + item.steps, 0);
    return (total / this.chartData.length).toFixed(0);
  }

  getAverageCaloriesBurned(): string {
    if (this.chartData.length === 0) return '0';
    const total = this.chartData.reduce((sum: number, item: any) => sum + item.calories, 0);
    return (total / this.chartData.length).toFixed(0);
  }

  getTotalWeeklySteps(): number {
    if (this.chartData.length === 0) return 0;
    return this.chartData.reduce((sum: number, item: any) => sum + item.steps, 0);
  }

  getAreaChartPath(): string {
    if (this.chartData.length === 0) return '';

    const totalPoints = this.chartData.length;
    const pointWidth = 100 / (totalPoints - 1);

    return this.chartData.map((item, index) => {
      const x = index * pointWidth;
      const y = 100 - this.getStepBarHeight(item.steps);
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }
}
