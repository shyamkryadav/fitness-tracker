import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalService } from '../../services/goal.service';
import { UserService } from '../../services/user.service';
import { ActivityService } from '../../services/activity.service';
import { Goal } from '../../models/goal.model';
import { User } from '../../models/user.model';
import { DailyActivity } from '../../models/activity.model';
import { GoalProgressComponent } from '../goal-progress/goal-progress.component';

interface GoalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  goals: Goal[];
}

interface GoalTemplate {
  id: string;
  type: 'steps' | 'calories' | 'weight' | 'workout';
  name: string;
  description: string;
  defaultTarget: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  benefits: string[];
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, GoalProgressComponent],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit {
  user: User | null = null;
  dailyActivity: DailyActivity | null = null;
  allGoals: Goal[] = [];
  activeGoals: Goal[] = [];
  completedGoals: Goal[] = [];
  upcomingGoals: Goal[] = [];
  loading = true;
  today = new Date();

  // Goal categories
  goalCategories: GoalCategory[] = [];

  // Goal templates for creating new goals
  goalTemplates: GoalTemplate[] = [
    {
      id: '1',
      type: 'steps',
      name: 'Daily 10K Steps',
      description: 'Walk 10,000 steps every day for better cardiovascular health',
      defaultTarget: 10000,
      icon: '👟',
      difficulty: 'medium',
      category: 'fitness',
      benefits: ['Improved cardiovascular health', 'Weight management', 'Better mood and energy levels']
    },
    {
      id: '2',
      type: 'calories',
      name: 'Calorie Deficit',
      description: 'Maintain a daily calorie deficit to achieve weight loss goals',
      defaultTarget: 500,
      icon: '🔥',
      difficulty: 'hard',
      category: 'nutrition',
      benefits: ['Weight loss', 'Improved metabolic health', 'Better energy management']
    },
    {
      id: '3',
      type: 'weight',
      name: 'Weight Loss Goal',
      description: 'Reach your target weight through consistent exercise and nutrition',
      defaultTarget: 70,
      icon: '⚖️',
      difficulty: 'hard',
      category: 'health',
      benefits: ['Reduced health risks', 'Improved mobility', 'Better self-confidence']
    },
    {
      id: '4',
      type: 'workout',
      name: 'Weekly Workouts',
      description: 'Complete a set number of workouts each week for consistency',
      defaultTarget: 5,
      icon: '💪',
      difficulty: 'medium',
      category: 'fitness',
      benefits: ['Increased strength', 'Improved endurance', 'Better overall fitness']
    },
    {
      id: '5',
      type: 'steps',
      name: 'Step Streak Challenge',
      description: 'Maintain a streak of days with at least 8,000 steps',
      defaultTarget: 8000,
      icon: '🏃',
      difficulty: 'easy',
      category: 'challenges',
      benefits: ['Build consistent habits', 'Gradual fitness improvement', 'Daily motivation']
    },
    {
      id: '6',
      type: 'calories',
      name: 'Weekly Burn Goal',
      description: 'Burn a target number of calories each week through exercise',
      defaultTarget: 3500,
      icon: '🔥',
      difficulty: 'medium',
      category: 'fitness',
      benefits: ['Weight management', 'Increased metabolism', 'Cardiovascular health']
    }
  ];

  // Goal insights
  goalInsights = [
    {
      title: 'Most Consistent Goal',
      message: 'You ve been most consistent with your Daily Steps goal. Great job!',
      type: 'success',
      icon: '👟'
    },
    {
      title: 'Goal Suggestion',
      message: 'Based on your activity, you might enjoy a Weekly Workout goal.',
      type: 'info',
      icon: '💪'
    },
    {
      title: 'Goal At Risk',
      message: 'Your Weight Loss goal is behind schedule. Need help getting back on track?',
      type: 'warning',
      icon: '⚖️'
    }
  ];

  // Achievement badges
  achievementBadges = [
    {
      id: '1',
      name: 'Step Master',
      description: 'Completed 10 step goals',
      icon: '🏆',
      earned: true,
      date: new Date(2023, 4, 15)
    },
    {
      id: '2',
      name: 'Weight Warrior',
      description: 'Reached a weight goal',
      icon: '🥇',
      earned: true,
      date: new Date(2023, 3, 22)
    },
    {
      id: '3',
      name: 'Consistency King',
      description: 'Completed goals for 30 days straight',
      icon: '👑',
      earned: false
    },
    {
      id: '4',
      name: 'Calorie Crusher',
      description: 'Burned 50,000 total calories',
      icon: '🔥',
      earned: false
    }
  ];

  constructor(
    private goalService: GoalService,
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Get user data
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      // Get all goals
      this.goalService.getGoals().subscribe(goals => {
        this.allGoals = goals;
        this.categorizeGoals();

        // Get daily activity
        this.activityService.getDailyActivity().subscribe(activity => {
          this.dailyActivity = activity;
          this.loading = false;
        });
      });
    });
  }

  categorizeGoals(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Reset goal arrays
    this.activeGoals = [];
    this.completedGoals = [];
    this.upcomingGoals = [];

    // Categorize goals
    this.allGoals.forEach(goal => {
      const startDate = new Date(goal.startDate);
      const endDate = new Date(goal.endDate);

      if (goal.completed) {
        this.completedGoals.push(goal);
      } else if (startDate <= today && endDate >= today) {
        this.activeGoals.push(goal);
      } else if (startDate > today) {
        this.upcomingGoals.push(goal);
      }
    });

    // Organize goals by category
    this.organizeGoalsByCategory();
  }

  organizeGoalsByCategory(): void {
    // Define categories
    this.goalCategories = [
      {
        id: 'fitness',
        name: 'Fitness Goals',
        description: 'Goals related to physical activity and exercise',
        icon: '💪',
        color: 'blue',
        goals: []
      },
      {
        id: 'nutrition',
        name: 'Nutrition Goals',
        description: 'Goals related to diet and calorie management',
        icon: '🥗',
        color: 'green',
        goals: []
      },
      {
        id: 'health',
        name: 'Health Goals',
        description: 'Goals related to overall health and wellness',
        icon: '❤️',
        color: 'red',
        goals: []
      },
      {
        id: 'challenges',
        name: 'Challenges',
        description: 'Special time-limited challenges',
        icon: '🏆',
        color: 'purple',
        goals: []
      }
    ];

    // Categorize active goals
    this.activeGoals.forEach(goal => {
      switch (goal.type) {
        case 'steps':
        case 'workout':
          this.goalCategories.find(c => c.id === 'fitness')?.goals.push(goal);
          break;
        case 'calories':
          this.goalCategories.find(c => c.id === 'nutrition')?.goals.push(goal);
          break;
        case 'weight':
          this.goalCategories.find(c => c.id === 'health')?.goals.push(goal);
          break;
      }
    });
  }

  getGoalProgress(goal: Goal): number {
    if (goal.type === 'weight' && goal.target < goal.current) {
      // For weight loss goals, we invert the calculation
      const totalToLose = goal.current - goal.target;
      const lost = goal.current - goal.current; // This would be updated with actual current weight
      return Math.min(100, (lost / totalToLose) * 100);
    } else {
      return Math.min(100, (goal.current / goal.target) * 100);
    }
  }

  getDaysRemaining(goal: Goal): number {
    const today = new Date();
    const endDate = new Date(goal.endDate);
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }

  getGoalIcon(type: string): string {
    switch (type) {
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

  getGoalTitle(type: string): string {
    switch (type) {
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

  getGoalCategoryColor(categoryId: string): string {
    const category = this.goalCategories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  }

  getCompletedGoalsCount(): number {
    return this.completedGoals.length;
  }

  getActiveGoalsCount(): number {
    return this.activeGoals.length;
  }

  getAverageGoalCompletion(): number {
    if (this.activeGoals.length === 0) return 0;

    const totalProgress = this.activeGoals.reduce((sum, goal) => sum + this.getGoalProgress(goal), 0);
    return Math.round(totalProgress / this.activeGoals.length);
  }
}
