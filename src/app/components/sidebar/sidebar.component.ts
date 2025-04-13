import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems = [
    { icon: '📊', label: 'Dashboard', active: true, route: '/dashboard' },
    { icon: '👟', label: 'Activities', active: false, route: '/activities' },
    { icon: '🍎', label: 'Nutrition', active: false, route: '/nutrition' },
    { icon: '🏆', label: 'Goals', active: false, route: '/goals' },
    { icon: '📈', label: 'Progress', active: false, route: '/progress' },
    { icon: '⚙️', label: 'Settings', active: false, route: '/settings' }
  ];

  isLargeScreen = true;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768;
  }

  setActiveItem(index: number) {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
  }
}
