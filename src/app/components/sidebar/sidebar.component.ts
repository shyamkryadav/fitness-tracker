import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👟', label: 'Activities', active: false },
    { icon: '🍎', label: 'Nutrition', active: false },
    { icon: '🏆', label: 'Goals', active: false },
    { icon: '📈', label: 'Progress', active: false },
    { icon: '⚙️', label: 'Settings', active: false }
  ];
}
