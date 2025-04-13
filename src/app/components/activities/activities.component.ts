import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Activity {
  id: number;
  type: string;
  name: string;
  date: string;
  duration: number;
  calories: number;
  distance?: number;
  steps?: number;
  heartRate?: {
    avg: number;
    max: number;
  };
  intensity: 'Low' | 'Medium' | 'High';
  completed: boolean;
  icon: string;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <!-- Header with actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Activities</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Track and manage your fitness activities</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <input type="text" placeholder="Search activities..."
                   class="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 w-full md:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>

          <button class="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg flex items-center transition-colors duration-200 shadow-md hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Activity
          </button>
        </div>
      </div>

      <!-- Activity filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap items-center gap-4">
          <div class="font-medium text-gray-700 dark:text-gray-300">Filter by:</div>

          <div class="flex flex-wrap gap-2">
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-sm">
              All Activities
            </button>
            <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              Running
            </button>
            <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              Cycling
            </button>
            <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              Swimming
            </button>
            <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              Gym
            </button>
          </div>

          <div class="ml-auto flex items-center gap-2">
            <span class="text-gray-600 dark:text-gray-400">Sort by:</span>
            <select class="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-700 dark:text-gray-300 py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Recent</option>
              <option>Duration</option>
              <option>Calories</option>
              <option>Distance</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Activity stats summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg shadow-blue-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total Activities</p>
              <p class="text-3xl font-bold mt-1">24</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="mt-4 text-blue-100 text-sm">+3 from last week</div>
        </div>

        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg shadow-green-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total Distance</p>
              <p class="text-3xl font-bold mt-1">48.5 km</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="mt-4 text-green-100 text-sm">+12.3 km from last week</div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg shadow-purple-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Calories Burned</p>
              <p class="text-3xl font-bold mt-1">4,832</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="mt-4 text-purple-100 text-sm">+856 from last week</div>
        </div>

        <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg shadow-orange-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium">Active Time</p>
              <p class="text-3xl font-bold mt-1">8h 24m</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="mt-4 text-orange-100 text-sm">+1h 12m from last week</div>
        </div>
      </div>

      <!-- Activity list -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Recent Activities</h2>
        </div>

        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <!-- Activity item -->
          <div *ngFor="let activity of activities" class="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
            <div class="flex items-start gap-4">
              <div [class]="'w-12 h-12 rounded-full flex items-center justify-center ' + getActivityIconClass(activity.type)">
                <i [class]="'text-xl ' + activity.icon"></i>
              </div>

              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ activity.name }}</h3>
                  <span [class]="'text-sm font-medium px-3 py-1 rounded-full ' + getIntensityClass(activity.intensity)">
                    {{ activity.intensity }}
                  </span>
                </div>

                <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">{{ activity.date }}</p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ formatDuration(activity.duration) }}</span>
                  </div>

                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ activity.calories }} cal</span>
                  </div>

                  <div *ngIf="activity.distance" class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ activity.distance }} km</span>
                  </div>

                  <div *ngIf="activity.heartRate" class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ activity.heartRate.avg }} bpm</span>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <button class="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button class="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div class="text-gray-600 dark:text-gray-400">Showing 1-10 of 24 activities</div>
          <div class="flex gap-2">
            <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50" disabled>
              Previous
            </button>
            <button class="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">
              1
            </button>
            <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              2
            </button>
            <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              3
            </button>
            <button class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class ActivitiesComponent {
  activities: Activity[] = [
    {
      id: 1,
      type: 'running',
      name: 'Morning Run',
      date: 'Today, 7:30 AM',
      duration: 35 * 60, // 35 minutes in seconds
      calories: 320,
      distance: 4.2,
      heartRate: {
        avg: 145,
        max: 175
      },
      intensity: 'Medium',
      completed: true,
      icon: 'fas fa-running'
    },
    {
      id: 2,
      type: 'cycling',
      name: 'Evening Bike Ride',
      date: 'Yesterday, 6:15 PM',
      duration: 60 * 60, // 60 minutes in seconds
      calories: 450,
      distance: 15.3,
      heartRate: {
        avg: 128,
        max: 155
      },
      intensity: 'Medium',
      completed: true,
      icon: 'fas fa-biking'
    },
    {
      id: 3,
      type: 'swimming',
      name: 'Pool Laps',
      date: 'Jun 10, 2023, 4:30 PM',
      duration: 45 * 60, // 45 minutes in seconds
      calories: 380,
      distance: 1.8,
      heartRate: {
        avg: 135,
        max: 160
      },
      intensity: 'High',
      completed: true,
      icon: 'fas fa-swimmer'
    },
    {
      id: 4,
      type: 'gym',
      name: 'Weight Training',
      date: 'Jun 9, 2023, 5:45 PM',
      duration: 75 * 60, // 75 minutes in seconds
      calories: 520,
      heartRate: {
        avg: 125,
        max: 145
      },
      intensity: 'High',
      completed: true,
      icon: 'fas fa-dumbbell'
    },
    {
      id: 5,
      type: 'yoga',
      name: 'Morning Yoga',
      date: 'Jun 8, 2023, 6:00 AM',
      duration: 40 * 60, // 40 minutes in seconds
      calories: 180,
      intensity: 'Low',
      completed: true,
      icon: 'fas fa-pray'
    }
  ];

  getActivityIconClass(type: string): string {
    switch(type) {
      case 'running':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400';
      case 'cycling':
        return 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400';
      case 'swimming':
        return 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400';
      case 'gym':
        return 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400';
      case 'yoga':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400';
    }
  }

  getIntensityClass(intensity: string): string {
    switch(intensity) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }
}
