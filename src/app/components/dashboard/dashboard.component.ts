import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StepCounterComponent,
    CalorieTrackerComponent,
    ActivityChartComponent,
    GoalProgressComponent,
    HeaderComponent,
    SidebarComponent
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

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private goalService: GoalService,
    private nutritionService: NutritionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    // Get user data
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      
      // Get daily activity data
      this.activityService.getDailyActivity().subscribe(activity => {
        this.dailyActivity = activity;
        
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
