import { Component, inject, signal, computed, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../services/language.service';
import type { NavLink } from '../../models';

interface SanitizedNavLink extends NavLink {
  safeSvgIcon: SafeHtml;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class NavigationComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly langService = inject(LanguageService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly collapsed = signal(false);
  readonly collapsedChange = output<boolean>();

  protected readonly navLinks = computed(() => this.langService.navLinks().map(link => ({
    ...link,
    safeSvgIcon: this.sanitizer.bypassSecurityTrustHtml(link.svgIcon)
  })));

  toggleCollapse(): void {
    const next = !this.collapsed();
    this.collapsed.set(next);
    this.collapsedChange.emit(next);
  }
}
