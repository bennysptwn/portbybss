import { Component, signal, computed, inject, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { BiographyService } from '../../shared/services/biography.service';
import { WorkingFieldService } from '../../shared/services/working-field.service';
import { QuoteService } from '../../shared/services/quote.service';
import gsap from 'gsap';

type AboutTab = 'description' | 'working-fields' | 'manifesto';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly biographyService = inject(BiographyService);
  private readonly workingFieldService = inject(WorkingFieldService);
  private readonly quoteService = inject(QuoteService);

  protected readonly activeTab = signal<AboutTab>('description');
  protected readonly selectedFieldIndex = signal<number>(0);

  // Read from cached service signals — no re-fetch on navigation
  protected readonly biography     = this.biographyService.data;
  protected readonly workingFields = this.workingFieldService.data;
  protected readonly quotes        = this.quoteService.data;

  protected readonly selectedField = computed(() => this.workingFields()[this.selectedFieldIndex()]);

  ngOnInit(): void {
    this.titleService.setTitle('About — Benny Septiawan Salim');
    this.metaService.updateTag({ name: 'description', content: 'Learn about Benny Septiawan Salim — a Software Engineer & AI specialist from Indonesia, with a focus on automation, data pipelines, and secure systems.' });
    this.metaService.updateTag({ property: 'og:title', content: 'About — Benny Septiawan Salim' });
    this.metaService.updateTag({ property: 'og:description', content: 'Software Engineer & AI specialist. Bachelor of Informatics from Universitas Multimedia Nusantara.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://portbybss.netlify.app/about' });
  }

  selectTab(tab: AboutTab): void {
    this.activeTab.set(tab);
  }

  selectField(index: number): void {
    this.selectedFieldIndex.set(index);
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.field-detail', { opacity: 0, x: 10, duration: 0.25, ease: 'power2.out' });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.about__header-block', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.tab-bar', { opacity: 0, y: 10, duration: 0.4, delay: 0.2, ease: 'power3.out' });
  }
}
