import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  // Sample data for the progress page
  weeklyStepsProgress: number = 75;
  weeklyCaloriesProgress: number = 60;
  weeklyWorkoutsProgress: number = 40;

  // Comparison data
  stepsComparison: number = 12;
  caloriesComparison: number = 8;
  workoutsComparison: number = -20;
  activeTimeComparison: number = 15;

  // Achievements data
  achievements = [
    {
      name: '7-Day Streak',
      description: 'Completed workouts for 7 days in a row',
      icon: '🔥',
      unlocked: true,
      color: 'yellow'
    },
    {
      name: 'Step Master',
      description: 'Reached 10,000 steps in a day',
      icon: '👟',
      unlocked: true,
      color: 'blue'
    },
    {
      name: 'Strength Builder',
      description: 'Completed 5 strength workouts',
      icon: '💪',
      unlocked: true,
      color: 'green'
    },
    {
      name: 'Calorie Crusher',
      description: 'Burn 5,000 calories in a week',
      icon: '🔒',
      unlocked: false,
      color: 'gray'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real application, you would fetch the user's progress data here
    this.loadProgressData();
  }

  loadProgressData(): void {
    // This would be replaced with actual API calls in a real application
    console.log('Loading progress data...');
    // Simulate loading data
    setTimeout(() => {
      console.log('Progress data loaded');
    }, 1000);
  }
}
