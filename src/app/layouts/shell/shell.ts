import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/components/navigation/navigation';
import { ThemeService } from '../../core/services/theme.service';
import { BgCanvasComponent } from '../../shared/components/bg-canvas/bg-canvas';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet, BgCanvasComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.css'
})
export class ShellComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly navCollapsed = signal(false);

  onNavCollapsed(collapsed: boolean): void {
    this.navCollapsed.set(collapsed);
  }
}
