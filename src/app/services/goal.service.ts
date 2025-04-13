import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private mockGoals: Goal[] = [
    {
      id: '1',
      userId: '1',
      type: 'steps',
      target: 10000,
      current: 7500,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 7),
      completed: false
    },
    {
      id: '2',
      userId: '1',
      type: 'calories',
      target: 3500,
      current: 2200,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 7),
      completed: false
    },
    {
      id: '3',
      userId: '1',
      type: 'weight',
      target: 70,
      current: 75,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 6, 1),
      completed: false
    },
    {
      id: '4',
      userId: '1',
      type: 'workout',
      target: 5,
      current: 3,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 7),
      completed: false
    }
  ];

  constructor() { }

  getGoals(): Observable<Goal[]> {
    // In a real app, this would fetch from an API
    return of(this.mockGoals);
  }

  getActiveGoals(): Observable<Goal[]> {
    const today = new Date();
    const activeGoals = this.mockGoals.filter(goal => 
      new Date(goal.startDate) <= today && 
      new Date(goal.endDate) >= today && 
      !goal.completed
    );
    
    return of(activeGoals);
  }

  updateGoal(goal: Goal): Observable<Goal> {
    // In a real app, this would update via an API
    const index = this.mockGoals.findIndex(g => g.id === goal.id);
    if (index !== -1) {
      this.mockGoals[index] = { ...goal };
    }
    
    return of(goal);
  }

  addGoal(goal: Goal): Observable<Goal> {
    // In a real app, this would add via an API
    const newGoal = {
      ...goal,
      id: (this.mockGoals.length + 1).toString()
    };
    
    this.mockGoals.push(newGoal);
    return of(newGoal);
  }
}
