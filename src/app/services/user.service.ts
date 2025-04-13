import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    weight: 75,
    height: 180,
    age: 30,
    gender: 'male',
    dailyStepGoal: 10000,
    dailyCalorieGoal: 2500
  };

  constructor() { }

  getCurrentUser(): Observable<User> {
    // In a real app, this would fetch from an API
    return of(this.mockUser);
  }

  updateUser(user: User): Observable<User> {
    // In a real app, this would update via an API
    this.mockUser = { ...user };
    return of(this.mockUser);
  }
}
