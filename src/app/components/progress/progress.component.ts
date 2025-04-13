import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Progress</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-600">This page is under construction. Check back soon for progress tracking features!</p>
      </div>
    </div>
  `,
  styles: ``
})
export class ProgressComponent {

}
