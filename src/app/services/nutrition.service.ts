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
      name: 'Oatmeal with Berries',
      date: new Date(),
      calories: 450,
      protein: 20,
      carbs: 60,
      fat: 15,
      type: 'breakfast',
      portion: '1 bowl (300g)'
    },
    {
      id: '2',
      userId: '1',
      name: 'Grilled Chicken Salad',
      date: new Date(),
      calories: 650,
      protein: 35,
      carbs: 70,
      fat: 20,
      type: 'lunch',
      portion: '1 plate (350g)'
    },
    {
      id: '3',
      userId: '1',
      name: 'Greek Yogurt with Honey',
      date: new Date(),
      calories: 200,
      protein: 5,
      carbs: 25,
      fat: 10,
      type: 'snack',
      portion: '1 cup (150g)'
    },
    {
      id: '4',
      userId: '1',
      name: 'Salmon with Roasted Vegetables',
      date: new Date(),
      calories: 700,
      protein: 40,
      carbs: 65,
      fat: 25,
      type: 'dinner',
      portion: '1 serving (400g)'
    },
    {
      id: '5',
      userId: '1',
      name: 'Protein Smoothie',
      date: new Date(),
      calories: 320,
      protein: 25,
      carbs: 30,
      fat: 10,
      type: 'breakfast',
      portion: '1 glass (350ml)'
    },
    {
      id: '6',
      userId: '1',
      name: 'Quinoa Bowl',
      date: new Date(),
      calories: 550,
      protein: 18,
      carbs: 75,
      fat: 15,
      type: 'lunch',
      portion: '1 bowl (320g)'
    },
    {
      id: '7',
      userId: '1',
      name: 'Mixed Nuts',
      date: new Date(),
      calories: 180,
      protein: 6,
      carbs: 8,
      fat: 16,
      type: 'snack',
      portion: '1 handful (30g)'
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
