import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }
  
  private getInitialTheme(): Theme {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light theme
    return 'light';
  }
  
  private initTheme(): void {
    const theme = this.themeSubject.value;
    this.applyTheme(theme);
  }
  
  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }
  
  getTheme(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }
  
  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
  
  setTheme(theme: Theme): void {
    if (theme !== this.themeSubject.value) {
      this.themeSubject.next(theme);
      this.applyTheme(theme);
    }
  }
  
  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
