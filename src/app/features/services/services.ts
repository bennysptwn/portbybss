import { Component, inject, computed, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../shared/services/language.service';
import { ServiceConfigService } from '../../shared/services/service-config.service';
import type { AvailabilityStatus } from '../../shared/models';
import gsap from 'gsap';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly lang = inject(LanguageService);
  private readonly configService = inject(ServiceConfigService);

  // Read from cached service signal — no re-fetch on navigation
  protected readonly config       = this.configService.data;
  protected readonly availability = this.lang.availabilityStatus;
  protected readonly schedulingLink = this.lang.schedulingLink;
  protected readonly email        = computed(() => this.lang.personalInfo().email);
  protected readonly contactEmail = 'bennysptwn@gmail.com';
  protected readonly calendarIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon('calendar'));
  protected readonly arrowIcon: SafeHtml    = this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon('arrow-up-right'));

  protected readonly availabilityLabel: Record<AvailabilityStatus, string> = {
    available: 'Open for work',
    limited: 'Limited availability',
    unavailable: 'Not available'
  };

  ngOnInit(): void {
    this.titleService.setTitle('Services — Benny Septiawan Salim');
    this.metaService.updateTag({ name: 'description', content: 'Software engineering and AI services by Benny Septiawan Salim. Currently open for work. Based in Indonesia.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Services — Benny Septiawan Salim' });
    this.metaService.updateTag({ property: 'og:description', content: 'Software engineering and AI services by Benny Septiawan Salim. Currently open for work.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://portbybss.netlify.app/services' });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.svc__header', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.svc__top-grid > *', { opacity: 0, y: 16, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.svc__stats-grid > *', { opacity: 0, y: 12, duration: 0.35, stagger: 0.07, delay: 0.4, ease: 'power3.out' });
    gsap.from('.svc__bottom-grid > *', { opacity: 0, y: 12, duration: 0.4, stagger: 0.1, delay: 0.5, ease: 'power3.out' });
    gsap.from('.svc__interest-card', { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, delay: 0.6, ease: 'power3.out' });
    gsap.from('.svc__contact-section', { opacity: 0, y: 16, duration: 0.4, delay: 0.7, ease: 'power3.out' });
  }
}
