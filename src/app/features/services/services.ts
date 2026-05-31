import { Component, inject, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SERVICE_CONFIG, AVAILABILITY_STATUS, SCHEDULING_LINK, PERSONAL_INFO, getIcon } from '../../shared/constants/portfolio-data';
import type { AvailabilityStatus, ServiceConfig } from '../../shared/models';
import gsap from 'gsap';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements AfterViewInit {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly config: ServiceConfig = SERVICE_CONFIG;
  protected readonly availability: AvailabilityStatus = AVAILABILITY_STATUS;
  protected readonly schedulingLink: string = SCHEDULING_LINK;
  protected readonly email: string = PERSONAL_INFO.email;
  protected readonly contactEmail = 'bennysptwn@gmail.com';
  protected readonly calendarIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(getIcon('calendar'));
  protected readonly arrowIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(getIcon('arrow-up-right'));

  protected readonly availabilityLabel: Record<AvailabilityStatus, string> = {
    available: 'Open for work',
    limited: 'Limited availability',
    unavailable: 'Not available'
  };

  ngAfterViewInit(): void {
    gsap.from('.svc__header', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.svc__top-grid > *', { opacity: 0, y: 16, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.svc__stats-grid > *', { opacity: 0, y: 12, duration: 0.35, stagger: 0.07, delay: 0.4, ease: 'power3.out' });
    gsap.from('.svc__bottom-grid > *', { opacity: 0, y: 12, duration: 0.4, stagger: 0.1, delay: 0.5, ease: 'power3.out' });
    gsap.from('.svc__interest-card', { opacity: 0, y: 16, duration: 0.4, stagger: 0.08, delay: 0.6, ease: 'power3.out' });
    gsap.from('.svc__contact-section', { opacity: 0, y: 16, duration: 0.4, delay: 0.7, ease: 'power3.out' });
  }
}
