import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { DailyActivity } from '../../models/activity.model';
import { Goal } from '../../models/goal.model';
import { DailyNutrition } from '../../models/nutrition.model';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { GoalService } from '../../services/goal.service';
import { NutritionService } from '../../services/nutrition.service';
import { StepCounterComponent } from '../step-counter/step-counter.component';
import { CalorieTrackerComponent } from '../calorie-tracker/calorie-tracker.component';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';
import { GoalProgressComponent } from '../goal-progress/goal-progress.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    StepCounterComponent,
    CalorieTrackerComponent,
    ActivityChartComponent,
    GoalProgressComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  dailyActivity: DailyActivity | null = null;
  activeGoals: Goal[] = [];
  dailyNutrition: DailyNutrition | null = null;
  weeklyActivities: DailyActivity[] = [];
  loading = true;
  today: Date = new Date();

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private goalService: GoalService,
    private nutritionService: NutritionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Returns a time-appropriate greeting based on the current hour
   */
  getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  loadData(): void {
    this.loading = true;

    // Get user data
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      // Get daily activity data
      this.activityService.getDailyActivity().subscribe(activity => {
        this.dailyActivity = activity;

        // Add mock data for the new properties if they don't exist
        if (this.dailyActivity) {
          if (!this.dailyActivity.activeMinutes) {
            this.dailyActivity.activeMinutes = 45;
          }
          if (!this.dailyActivity.totalDistance) {
            this.dailyActivity.totalDistance = 3.2;
          }
          if (!this.dailyActivity.averageHeartRate) {
            this.dailyActivity.averageHeartRate = 72;
          }
          if (!this.dailyActivity.sleepHours) {
            this.dailyActivity.sleepHours = 7.5;
          }
        }

        // Get active goals
        this.goalService.getActiveGoals().subscribe(goals => {
          this.activeGoals = goals;

          // Get nutrition data
          this.nutritionService.getDailyNutrition().subscribe(nutrition => {
            this.dailyNutrition = nutrition;

            // Get weekly activities for charts
            this.activityService.getWeeklyActivities().subscribe(weeklyData => {
              this.weeklyActivities = weeklyData;
              this.loading = false;
            });
          });
        });
      });
    });
  }
}
