export interface Activity {
  id: string;
  userId: string;
  type: 'walking' | 'running' | 'cycling' | 'swimming' | 'workout' | 'other';
  date: Date;
  duration: number; // in minutes
  steps?: number;
  distance?: number; // in km
  caloriesBurned: number;
}

export interface DailyActivity {
  date: Date;
  totalSteps: number;
  totalCaloriesBurned: number;
  totalCaloriesConsumed: number;
  activities: Activity[];
  activeMinutes?: number;
  totalDistance?: number;
  averageHeartRate?: number;
  sleepHours?: number;
}
