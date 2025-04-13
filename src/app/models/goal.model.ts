export interface Goal {
  id: string;
  userId: string;
  type: 'steps' | 'calories' | 'weight' | 'workout';
  target: number;
  current: number;
  startDate: Date;
  endDate: Date;
  completed: boolean;
}
