import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity, DailyActivity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private mockActivities: Activity[] = [
    {
      id: '1',
      userId: '1',
      type: 'walking',
      date: new Date(2023, 5, 1),
      duration: 30,
      steps: 4500,
      distance: 3.2,
      caloriesBurned: 150
    },
    {
      id: '2',
      userId: '1',
      type: 'running',
      date: new Date(2023, 5, 2),
      duration: 45,
      steps: 6800,
      distance: 5.5,
      caloriesBurned: 450
    },
    {
      id: '3',
      userId: '1',
      type: 'cycling',
      date: new Date(2023, 5, 3),
      duration: 60,
      distance: 15,
      caloriesBurned: 400
    },
    {
      id: '4',
      userId: '1',
      type: 'swimming',
      date: new Date(2023, 5, 4),
      duration: 40,
      caloriesBurned: 350
    },
    {
      id: '5',
      userId: '1',
      type: 'workout',
      date: new Date(),
      duration: 50,
      caloriesBurned: 300
    },
    {
      id: '6',
      userId: '1',
      type: 'walking',
      date: new Date(),
      duration: 25,
      steps: 3200,
      distance: 2.1,
      caloriesBurned: 120
    }
  ];

  constructor() { }

  getActivities(): Observable<Activity[]> {
    // In a real app, this would fetch from an API
    return of(this.mockActivities);
  }

  getTodayActivities(): Observable<Activity[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayActivities = this.mockActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === today.getTime();
    });

    return of(todayActivities);
  }

  getDailyActivity(): Observable<DailyActivity> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayActivities = this.mockActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === today.getTime();
    });

    const totalSteps = todayActivities.reduce((sum, activity) => sum + (activity.steps || 0), 0);
    const totalCaloriesBurned = todayActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
    const totalDistance = todayActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);

    const dailyActivity: DailyActivity = {
      date: today,
      totalSteps,
      totalCaloriesBurned,
      totalCaloriesConsumed: 1800, // Mock data
      activities: todayActivities,
      activeMinutes: 45, // Mock data
      totalDistance: parseFloat(totalDistance.toFixed(1)),
      averageHeartRate: 72, // Mock data
      sleepHours: 7.5 // Mock data
    };

    return of(dailyActivity);
  }

  getWeeklyActivities(): Observable<DailyActivity[]> {
    const weeklyData: DailyActivity[] = [];
    const today = new Date();

    // Generate data for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayActivities = this.mockActivities.filter(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === date.getTime();
      });

      const totalSteps = dayActivities.reduce((sum, activity) => sum + (activity.steps || 0), 0);
      const totalCaloriesBurned = dayActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
      const totalDistance = dayActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);

      // Generate some random data for days without activities
      const randomSteps = Math.floor(Math.random() * 8000) + 2000;
      const randomCalories = Math.floor(Math.random() * 400) + 100;
      const randomDistance = parseFloat((Math.random() * 5 + 1).toFixed(1));
      const randomActiveMinutes = Math.floor(Math.random() * 60) + 15;
      const randomHeartRate = Math.floor(Math.random() * 20) + 65;
      const randomSleepHours = parseFloat((Math.random() * 2 + 6).toFixed(1));

      weeklyData.push({
        date,
        totalSteps: totalSteps || randomSteps,
        totalCaloriesBurned: totalCaloriesBurned || randomCalories,
        totalCaloriesConsumed: Math.floor(Math.random() * 1000) + 1200,
        activities: dayActivities,
        activeMinutes: randomActiveMinutes,
        totalDistance: totalDistance || randomDistance,
        averageHeartRate: randomHeartRate,
        sleepHours: randomSleepHours
      });
    }

    return of(weeklyData);
  }

  addActivity(activity: Activity): Observable<Activity> {
    // In a real app, this would add via an API
    const newActivity = {
      ...activity,
      id: (this.mockActivities.length + 1).toString()
    };

    this.mockActivities.push(newActivity);
    return of(newActivity);
  }
}
