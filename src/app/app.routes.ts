import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { GoalsComponent } from './components/goals/goals.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'nutrition', component: NutritionComponent },
      { path: 'goals', component: GoalsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
