import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-container bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <app-header [user]="user" class="z-20"></app-header>

      <div class="content-container">
        <!-- Fixed sidebar for md screens and above -->
        <div class="sidebar-container hidden md:block">
          <app-sidebar></app-sidebar>
        </div>

        <!-- Mobile sidebar at the bottom -->
        <div class="mobile-sidebar-container md:hidden">
          <app-sidebar></app-sidebar>
        </div>

        <!-- Main content with padding to account for sidebar -->
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }
}
