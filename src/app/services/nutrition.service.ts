import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Meal, DailyNutrition } from '../models/nutrition.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private mockMeals: Meal[] = [
    {
      id: '1',
      userId: '1',
      name: 'Breakfast',
      date: new Date(),
      calories: 450,
      protein: 20,
      carbs: 60,
      fat: 15,
      type: 'breakfast'
    },
    {
      id: '2',
      userId: '1',
      name: 'Lunch',
      date: new Date(),
      calories: 650,
      protein: 35,
      carbs: 70,
      fat: 20,
      type: 'lunch'
    },
    {
      id: '3',
      userId: '1',
      name: 'Snack',
      date: new Date(),
      calories: 200,
      protein: 5,
      carbs: 25,
      fat: 10,
      type: 'snack'
    },
    {
      id: '4',
      userId: '1',
      name: 'Dinner',
      date: new Date(),
      calories: 700,
      protein: 40,
      carbs: 65,
      fat: 25,
      type: 'dinner'
    }
  ];

  constructor() { }

  getMeals(): Observable<Meal[]> {
    // In a real app, this would fetch from an API
    return of(this.mockMeals);
  }

  getTodayMeals(): Observable<Meal[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMeals = this.mockMeals.filter(meal => {
      const mealDate = new Date(meal.date);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    });
    
    return of(todayMeals);
  }

  getDailyNutrition(): Observable<DailyNutrition> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMeals = this.mockMeals.filter(meal => {
      const mealDate = new Date(meal.date);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate.getTime() === today.getTime();
    });
    
    const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFat = todayMeals.reduce((sum, meal) => sum + meal.fat, 0);
    
    const dailyNutrition: DailyNutrition = {
      date: today,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      meals: todayMeals
    };
    
    return of(dailyNutrition);
  }

  addMeal(meal: Meal): Observable<Meal> {
    // In a real app, this would add via an API
    const newMeal = {
      ...meal,
      id: (this.mockMeals.length + 1).toString()
    };
    
    this.mockMeals.push(newMeal);
    return of(newMeal);
  }
}
