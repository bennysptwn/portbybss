import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portbybss-theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly _theme = signal<'dark' | 'light'>(this.loadTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;
      const t = this._theme();
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${t}`);
    });
  }

  toggle(): void {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(next);
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.STORAGE_KEY, next);
      } catch {
        // storage blocked
      }
    }
  }

  private loadTheme(): 'dark' | 'light' {
    if (!this.isBrowser) return 'dark';
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored === 'dark' || stored === 'light' ? stored : 'dark';
    } catch {
      return 'dark';
    }
  }
}
