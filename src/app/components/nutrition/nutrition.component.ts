import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionService } from '../../services/nutrition.service';
import { UserService } from '../../services/user.service';
import { Meal, DailyNutrition } from '../../models/nutrition.model';
import { User } from '../../models/user.model';

interface NutrientInfo {
  name: string;
  value: number;
  unit: string;
  percentage: number;
  color: string;
  icon: string;
  description: string;
}

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  image: string;
  portion: string;
  favorite: boolean;
}

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nutrition.component.html',
})
export class NutritionComponent implements OnInit {
  dailyNutrition: DailyNutrition | null = null;
  user: User | null = null;
  loading = true;
  today = new Date();

  // Nutrient information
  nutrients: NutrientInfo[] = [];

  // Meal plan data
  mealPlan: { [key: string]: Meal[] } = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  };

  // Recommended foods
  recommendedFoods: FoodItem[] = [
    {
      id: '1',
      name: 'Greek Yogurt',
      calories: 100,
      protein: 10,
      carbs: 5,
      fat: 3,
      category: 'dairy',
      image: 'assets/images/greek-yogurt.jpg',
      portion: '100g',
      favorite: true
    },
    {
      id: '2',
      name: 'Grilled Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      category: 'protein',
      image: 'assets/images/chicken-breast.jpg',
      portion: '100g',
      favorite: false
    },
    {
      id: '3',
      name: 'Avocado',
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      category: 'fruit',
      image: 'assets/images/avocado.jpg',
      portion: '100g',
      favorite: true
    },
    {
      id: '4',
      name: 'Quinoa',
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      category: 'grain',
      image: 'assets/images/quinoa.jpg',
      portion: '100g',
      favorite: false
    },
    {
      id: '5',
      name: 'Salmon',
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      category: 'protein',
      image: 'assets/images/salmon.jpg',
      portion: '100g',
      favorite: true
    },
    {
      id: '6',
      name: 'Blueberries',
      calories: 57,
      protein: 0.7,
      carbs: 14.5,
      fat: 0.3,
      category: 'fruit',
      image: 'assets/images/blueberries.jpg',
      portion: '100g',
      favorite: false
    }
  ];

  // Water tracking
  waterIntake = 5;
  waterGoal = 8;
  waterPercentage = 62.5;

  // Nutrition insights
  nutritionInsights = [
    {
      title: 'Protein Intake',
      message: 'Your protein intake is on track. Keep it up!',
      type: 'success',
      icon: 'fas fa-check-circle'
    },
    {
      title: 'Carbohydrates',
      message: 'Consider reducing simple carbs and increasing complex carbs.',
      type: 'warning',
      icon: 'fas fa-exclamation-circle'
    },
    {
      title: 'Healthy Fats',
      message: 'Try to include more omega-3 rich foods like fish and nuts.',
      type: 'info',
      icon: 'fas fa-info-circle'
    }
  ];

  constructor(
    private nutritionService: NutritionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Get user data
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      // Get nutrition data
      this.nutritionService.getDailyNutrition().subscribe(nutrition => {
        this.dailyNutrition = nutrition;

        // Organize meals by type
        this.organizeMealsByType();

        // Setup nutrient information
        this.setupNutrientInfo();

        this.loading = false;
      });
    });
  }

  organizeMealsByType(): void {
    if (!this.dailyNutrition) return;

    // Reset meal plan
    this.mealPlan = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    };

    // Organize meals by type
    this.dailyNutrition.meals.forEach(meal => {
      if (this.mealPlan[meal.type]) {
        this.mealPlan[meal.type].push(meal);
      }
    });
  }

  setupNutrientInfo(): void {
    if (!this.dailyNutrition || !this.user) return;

    const { totalProtein, totalCarbs, totalFat } = this.dailyNutrition;
    const totalCalories = this.dailyNutrition.totalCalories;

    // Calculate recommended daily values (simplified)
    const recommendedProtein = this.user.weight * 0.8; // 0.8g per kg of body weight
    const recommendedCarbs = 275; // Average recommendation
    const recommendedFat = 78; // Average recommendation

    this.nutrients = [
      {
        name: 'Protein',
        value: totalProtein,
        unit: 'g',
        percentage: Math.min(100, (totalProtein / recommendedProtein) * 100),
        color: 'blue',
        icon: 'fas fa-drumstick-bite',
        description: 'Essential for muscle repair and growth'
      },
      {
        name: 'Carbs',
        value: totalCarbs,
        unit: 'g',
        percentage: Math.min(100, (totalCarbs / recommendedCarbs) * 100),
        color: 'yellow',
        icon: 'fas fa-bread-slice',
        description: 'Primary source of energy for your body'
      },
      {
        name: 'Fat',
        value: totalFat,
        unit: 'g',
        percentage: Math.min(100, (totalFat / recommendedFat) * 100),
        color: 'red',
        icon: 'fas fa-cheese',
        description: 'Important for hormone production and nutrient absorption'
      },
      {
        name: 'Calories',
        value: totalCalories,
        unit: 'kcal',
        percentage: Math.min(100, (totalCalories / (this.user.dailyCalorieGoal || 2500)) * 100),
        color: 'green',
        icon: 'fas fa-fire',
        description: 'Total energy intake for the day'
      }
    ];
  }

  getMacroPercentage(macroValue: number): number {
    if (!this.dailyNutrition || this.dailyNutrition.totalCalories === 0) return 0;

    const caloriesFromMacro = macroValue * (macroValue === this.dailyNutrition.totalProtein || macroValue === this.dailyNutrition.totalCarbs ? 4 : 9);
    return Math.round((caloriesFromMacro / this.dailyNutrition.totalCalories) * 100);
  }

  getProteinPercentage(): number {
    return this.dailyNutrition ? this.getMacroPercentage(this.dailyNutrition.totalProtein) : 0;
  }

  getCarbsPercentage(): number {
    return this.dailyNutrition ? this.getMacroPercentage(this.dailyNutrition.totalCarbs) : 0;
  }

  getFatPercentage(): number {
    return this.dailyNutrition ? this.getMacroPercentage(this.dailyNutrition.totalFat) : 0;
  }

  getWaterPercentage(): number {
    return (this.waterIntake / this.waterGoal) * 100;
  }

  getCalorieProgress(): number {
    if (!this.dailyNutrition || !this.user) return 0;
    return Math.min(100, (this.dailyNutrition.totalCalories / (this.user.dailyCalorieGoal || 2500)) * 100);
  }

  getRemainingCalories(): number {
    if (!this.dailyNutrition || !this.user) return 0;
    const remaining = (this.user.dailyCalorieGoal || 2500) - this.dailyNutrition.totalCalories;
    return remaining > 0 ? remaining : 0;
  }

  toggleFavorite(food: FoodItem): void {
    food.favorite = !food.favorite;
  }

  addWater(): void {
    if (this.waterIntake < this.waterGoal) {
      this.waterIntake++;
      this.waterPercentage = this.getWaterPercentage();
    }
  }

  removeWater(): void {
    if (this.waterIntake > 0) {
      this.waterIntake--;
      this.waterPercentage = this.getWaterPercentage();
    }
  }
}
