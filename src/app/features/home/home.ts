import { Component, inject, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PERSONAL_INFO, SOCIAL_LINKS, getIcon } from '../../shared/constants/portfolio-data';
import type { PersonalInfo, SocialLink } from '../../shared/models';
import gsap from 'gsap';

interface SanitizedSocialLink extends SocialLink {
  safeIcon: SafeHtml;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeRef') homeRef!: ElementRef;

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly personalInfo: PersonalInfo = PERSONAL_INFO;
  protected readonly socialLinks: SanitizedSocialLink[] = SOCIAL_LINKS.map(link => ({
    ...link,
    safeIcon: this.sanitizer.bypassSecurityTrustHtml(getIcon(link.iconIdentifier))
  }));
  protected readonly avatarError = signal(false);
  protected readonly arrowIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(getIcon('arrow-up-right'));
  protected readonly downloadIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(getIcon('download'));

  onAvatarError(): void {
    this.avatarError.set(true);
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.home__tag', { opacity: 0, y: -10, duration: 0.4 })
      .from('.home__name', { opacity: 0, y: 20, duration: 0.6 }, '-=0.1')
      .from('.home__meta-grid', { opacity: 0, y: 16, duration: 0.5 }, '-=0.2')
      .from('.home__actions', { opacity: 0, y: 12, duration: 0.4 }, '-=0.2')
      .from('.home__social-row', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
      .from('.home__avatar-col', { opacity: 0, x: 20, duration: 0.6 }, '<-0.4');
  }
}
