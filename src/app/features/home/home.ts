import { Component, inject, signal, computed, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../shared/services/language.service';
import { SocialLinkService } from '../../shared/services/social-link.service';
import type { SocialLink } from '../../shared/models';
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('homeRef') homeRef!: ElementRef;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly lang = inject(LanguageService);
  private readonly socialLinkService = inject(SocialLinkService);

  protected readonly personalInfo = this.lang.personalInfo;

  // Read from cached service signal — no re-fetch on navigation
  protected readonly socialLinks = computed<SanitizedSocialLink[]>(() =>
    this.socialLinkService.data().map(link => ({
      ...link,
      safeIcon: this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon(link.iconIdentifier))
    }))
  );

  protected readonly avatarError = signal(false);
  protected readonly arrowIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon('arrow-up-right'));
  protected readonly downloadIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon('download'));

  ngOnInit(): void {
    this.titleService.setTitle('Benny Septiawan Salim — Software Engineer & AI');
    this.metaService.updateTag({ name: 'description', content: 'Software Engineer & AI specialist based in Indonesia. Building reliable digital systems from automation tools and data pipelines to secure platforms.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Benny Septiawan Salim — Software Engineer & AI' });
    this.metaService.updateTag({ property: 'og:description', content: 'Building reliable digital systems—from automation tools and data pipelines to secure platforms.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://portbybss.netlify.app/home' });
  }

  onAvatarError(): void {
    this.avatarError.set(true);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.home__tag', { opacity: 0, y: -10, duration: 0.4 })
      .from('.home__name', { opacity: 0, y: 20, duration: 0.6 }, '-=0.1')
      .from('.home__meta-grid', { opacity: 0, y: 16, duration: 0.5 }, '-=0.2')
      .from('.home__actions', { opacity: 0, y: 12, duration: 0.4 }, '-=0.2')
      .from('.home__social-row', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
      .from('.home__avatar-col', { opacity: 0, x: 20, duration: 0.6 }, '<-0.4');
  }
}
