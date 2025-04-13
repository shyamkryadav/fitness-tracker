import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-counter.component.html',
  styleUrl: './step-counter.component.css'
})
export class StepCounterComponent implements OnChanges {
  @Input() steps: number = 0;
  @Input() goal: number = 10000;
  
  progressPercentage: number = 0;
  
  ngOnChanges(): void {
    this.calculateProgress();
  }
  
  calculateProgress(): void {
    this.progressPercentage = Math.min(100, (this.steps / this.goal) * 100);
  }
}
