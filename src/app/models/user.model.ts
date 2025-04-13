export interface User {
  id: string;
  name: string;
  email: string;
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: 'male' | 'female' | 'other';
  dailyStepGoal: number;
  dailyCalorieGoal: number;
}
