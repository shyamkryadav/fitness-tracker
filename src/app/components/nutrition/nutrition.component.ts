import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Nutrition</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <p class="text-gray-600 dark:text-gray-400">This page is under construction. Check back soon for nutrition tracking features!</p>
      </div>
    </div>
  `,
  styles: ``
})
export class NutritionComponent {

}
