import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionService } from '../../services/nutrition.service';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { User } from '../../models/user.model';
import { DailyNutrition } from '../../models/nutrition.model';
import { DailyActivity } from '../../models/activity.model';

interface NutrientProgress {
  name: string;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  color: string;
  icon: string;
}

interface NutritionTrend {
  nutrient: string;
  values: number[];
  dates: string[];
  color: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  // User and data models
  user: User | null = null;
  dailyNutrition: DailyNutrition | null = null;
  dailyActivity: DailyActivity | null = null;
  loading = true;

  // Sample data for the progress page
  weeklyStepsProgress: number = 75;
  weeklyCaloriesProgress: number = 60;
  weeklyWorkoutsProgress: number = 40;

  // Comparison data
  stepsComparison: number = 12;
  caloriesComparison: number = 8;
  workoutsComparison: number = -20;
  activeTimeComparison: number = 15;

  // Nutrition progress data
  nutrientProgress: NutrientProgress[] = [];
  macroDistribution = {
    protein: 25,
    carbs: 50,
    fat: 25
  };

  // Water tracking
  waterIntake = 5;
  waterGoal = 8;
  waterPercentage = 62.5;

  // Nutrition trends (last 7 days)
  nutritionTrends: NutritionTrend[] = [
    {
      nutrient: 'Protein',
      values: [65, 70, 62, 80, 75, 68, 72],
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: 'blue'
    },
    {
      nutrient: 'Carbs',
      values: [220, 205, 230, 240, 215, 225, 235],
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: 'yellow'
    },
    {
      nutrient: 'Fat',
      values: [55, 60, 50, 65, 58, 62, 60],
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      color: 'red'
    }
  ];

  // Meal quality scores (out of 10)
  mealScores = {
    breakfast: 8.5,
    lunch: 7.2,
    dinner: 9.0,
    snacks: 6.5
  };

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
    },
    {
      name: 'Nutrition Pro',
      description: 'Maintain balanced macros for 5 days',
      icon: '🥗',
      unlocked: true,
      color: 'green'
    },
    {
      name: 'Hydration Hero',
      description: 'Drink 8 glasses of water for 3 days',
      icon: '💧',
      unlocked: false,
      color: 'blue'
    }
  ];

  constructor(
    private nutritionService: NutritionService,
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.loadProgressData();
  }

  loadProgressData(): void {
    this.loading = true;

    // Get user data
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      // Get nutrition data
      this.nutritionService.getDailyNutrition().subscribe(nutrition => {
        this.dailyNutrition = nutrition;

        // Get activity data
        this.activityService.getDailyActivity().subscribe(activity => {
          this.dailyActivity = activity;

          // Setup nutrient progress
          this.setupNutrientProgress();

          // Calculate water percentage
          this.waterPercentage = this.getWaterPercentage();

          this.loading = false;
        });
      });
    });
  }

  setupNutrientProgress(): void {
    if (!this.dailyNutrition || !this.user) return;

    const { totalProtein, totalCarbs, totalFat } = this.dailyNutrition;
    const totalCalories = this.dailyNutrition.totalCalories;

    // Calculate recommended daily values (simplified)
    const recommendedProtein = this.user.weight * 0.8; // 0.8g per kg of body weight
    const recommendedCarbs = 275; // Average recommendation
    const recommendedFat = 78; // Average recommendation

    this.nutrientProgress = [
      {
        name: 'Protein',
        current: totalProtein,
        target: recommendedProtein,
        unit: 'g',
        percentage: Math.min(100, (totalProtein / recommendedProtein) * 100),
        color: 'blue',
        icon: '🍗'
      },
      {
        name: 'Carbs',
        current: totalCarbs,
        target: recommendedCarbs,
        unit: 'g',
        percentage: Math.min(100, (totalCarbs / recommendedCarbs) * 100),
        color: 'yellow',
        icon: '🍞'
      },
      {
        name: 'Fat',
        current: totalFat,
        target: recommendedFat,
        unit: 'g',
        percentage: Math.min(100, (totalFat / recommendedFat) * 100),
        color: 'red',
        icon: '🥑'
      },
      {
        name: 'Calories',
        current: totalCalories,
        target: this.user.dailyCalorieGoal || 2500,
        unit: 'kcal',
        percentage: Math.min(100, (totalCalories / (this.user.dailyCalorieGoal || 2500)) * 100),
        color: 'green',
        icon: '🔥'
      }
    ];

    // Update macro distribution
    if (totalCalories > 0) {
      const proteinCalories = totalProtein * 4;
      const carbsCalories = totalCarbs * 4;
      const fatCalories = totalFat * 9;

      this.macroDistribution = {
        protein: Math.round((proteinCalories / totalCalories) * 100),
        carbs: Math.round((carbsCalories / totalCalories) * 100),
        fat: Math.round((fatCalories / totalCalories) * 100)
      };
    }
  }

  getWaterPercentage(): number {
    return (this.waterIntake / this.waterGoal) * 100;
  }

  getMealQualityColor(score: number): string {
    if (score >= 8) return 'green';
    if (score >= 6) return 'yellow';
    return 'red';
  }
}
