import { Component, signal, inject, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ExperienceService } from '../../shared/services/experience.service';
import { DataStateComponent } from '../../shared/components/data-state/data-state';
import gsap from 'gsap';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [DataStateComponent],
  templateUrl: './experiences.html',
  styleUrl: './experiences.css'
})
export class ExperiencesComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly experienceService = inject(ExperienceService);

  // Read from cached service signal — no re-fetch on navigation
  protected readonly experiences = this.experienceService.data;
  protected readonly isLoading   = this.experienceService.isLoading;
  protected readonly error       = this.experienceService.error;
  protected readonly openIndex   = signal<number>(0);

  ngOnInit(): void {
    this.titleService.setTitle('Experiences — Benny Septiawan Salim');
    this.metaService.updateTag({ name: 'description', content: 'Professional work history and experience of Benny Septiawan Salim, Software Engineer & AI specialist based in Indonesia.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Experiences — Benny Septiawan Salim' });
    this.metaService.updateTag({ property: 'og:description', content: 'Professional work history and experience of Benny Septiawan Salim, Software Engineer & AI.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://portbybss.netlify.app/experiences' });
  }

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.exp-row', {
      opacity: 0,
      y: 16,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }
}
