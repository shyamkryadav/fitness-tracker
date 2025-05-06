export interface Meal {
  id: string;
  userId: string;
  name: string;
  date: Date;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  portion?: string; // Optional portion size
}

export interface DailyNutrition {
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
}
