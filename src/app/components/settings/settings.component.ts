import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

interface ThemeOption {
  id: string;
  name: string;
  icon: string;
  preview: string;
}

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  loading = true;
  activeTab = 'account';
  isDarkMode = false;
  saveSuccess = false;
  saveError = false;

  // Theme settings
  themeOptions: ThemeOption[] = [
    {
      id: 'light',
      name: 'Light',
      icon: '☀️',
      preview: 'bg-white'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: '🌙',
      preview: 'bg-gray-900'
    },
    {
      id: 'system',
      name: 'System',
      icon: '💻',
      preview: 'bg-gradient-to-r from-white to-gray-900'
    }
  ];
  selectedTheme = 'system';

  // Units settings
  units = {
    weight: 'kg',
    height: 'cm',
    distance: 'km'
  };

  // Notification settings
  notificationSettings: NotificationSetting[] = [
    {
      id: 'daily_summary',
      name: 'Daily Summary',
      description: 'Receive a summary of your daily activity and nutrition',
      enabled: true
    },
    {
      id: 'goal_reminders',
      name: 'Goal Reminders',
      description: 'Get reminders about your fitness goals',
      enabled: true
    },
    {
      id: 'achievement_alerts',
      name: 'Achievement Alerts',
      description: 'Be notified when you earn new achievements',
      enabled: true
    },
    {
      id: 'inactivity_alerts',
      name: 'Inactivity Alerts',
      description: 'Get alerts when you\'ve been inactive for too long',
      enabled: false
    }
  ];

  // Privacy settings
  privacySettings: PrivacySetting[] = [
    {
      id: 'share_activity',
      name: 'Share Activity Data',
      description: 'Allow the app to share your activity data with third-party services',
      enabled: false
    },
    {
      id: 'share_nutrition',
      name: 'Share Nutrition Data',
      description: 'Allow the app to share your nutrition data with third-party services',
      enabled: false
    },
    {
      id: 'location_tracking',
      name: 'Location Tracking',
      description: 'Allow the app to track your location during workouts',
      enabled: true
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Allow the app to collect anonymous usage data to improve the service',
      enabled: true
    }
  ];

  // Goal settings
  goalSettings = {
    dailyStepGoal: 10000,
    dailyCalorieGoal: 2500,
    weeklyWorkoutGoal: 5,
    waterIntakeGoal: 8
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.checkDarkMode();
  }

  loadUserData(): void {
    this.loading = true;
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.goalSettings.dailyStepGoal = user.dailyStepGoal;
        this.goalSettings.dailyCalorieGoal = user.dailyCalorieGoal;
      }
      this.loading = false;
    });
  }

  checkDarkMode(): void {
    // Check if dark mode is enabled in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Check system preference
      this.selectedTheme = 'system';
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  setTheme(theme: string): void {
    this.selectedTheme = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      this.isDarkMode = false;
    } else {
      // System theme
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', systemDarkMode);
      this.isDarkMode = systemDarkMode;
    }
  }

  toggleNotification(setting: NotificationSetting): void {
    setting.enabled = !setting.enabled;
  }

  togglePrivacySetting(setting: PrivacySetting): void {
    setting.enabled = !setting.enabled;
  }

  saveSettings(): void {
    this.loading = true;

    // In a real app, you would save all settings to a backend
    setTimeout(() => {
      this.loading = false;
      this.saveSuccess = true;

      // Reset success message after 3 seconds
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    }, 1000);
  }

  resetSettings(): void {
    // Reset to default settings
    this.selectedTheme = 'system';
    this.units = {
      weight: 'kg',
      height: 'cm',
      distance: 'km'
    };
    this.goalSettings = {
      dailyStepGoal: 10000,
      dailyCalorieGoal: 2500,
      weeklyWorkoutGoal: 5,
      waterIntakeGoal: 8
    };

    // Reset notifications and privacy settings
    this.notificationSettings.forEach(setting => {
      if (setting.id === 'daily_summary' || setting.id === 'goal_reminders' || setting.id === 'achievement_alerts') {
        setting.enabled = true;
      } else {
        setting.enabled = false;
      }
    });

    this.privacySettings.forEach(setting => {
      if (setting.id === 'location_tracking' || setting.id === 'analytics') {
        setting.enabled = true;
      } else {
        setting.enabled = false;
      }
    });

    // Apply theme
    this.setTheme('system');
  }

  exportData(): void {
    // In a real app, this would generate a data export
    alert('Your data export has been prepared and will be emailed to you.');
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would delete the user's account
      alert('Your account has been scheduled for deletion. You will receive a confirmation email.');
    }
  }
}
