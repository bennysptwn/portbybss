import { Component, signal, computed, inject, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../shared/services/language.service';
import { ProjectService } from '../../shared/services/project.service';
import { ImageLightboxComponent } from '../../shared/components/image-lightbox/image-lightbox';
import { DataStateComponent } from '../../shared/components/data-state/data-state';
import type { Project } from '../../shared/models';
import gsap from 'gsap';

type ProjectCategory = 'personal' | 'open-client' | 'official';

@Component({
  selector: 'app-work-samples',
  standalone: true,
  imports: [ImageLightboxComponent, DataStateComponent],
  templateUrl: './work-samples.html',
  styleUrl: './work-samples.css'
})
export class WorkSamplesComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly lang = inject(LanguageService);
  private readonly projectService = inject(ProjectService);

  protected readonly activeCategory = signal<ProjectCategory>('personal');
  protected readonly arrowIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.lang.getIcon('arrow-up-right'));

  protected readonly categories: { key: ProjectCategory; label: string }[] = [
    { key: 'personal', label: 'Personal' },
    { key: 'open-client', label: 'Open Client' },
    { key: 'official', label: 'Official' }
  ];

  // Read from cached service signal — no re-fetch on navigation
  private readonly allProjects = this.projectService.data;
  protected readonly isLoading = this.projectService.isLoading;
  protected readonly error = this.projectService.error;

  protected readonly filteredProjects = computed(() =>
    this.allProjects().filter((p: Project) => p.category === this.activeCategory())
  );

  // ── Lightbox state ─────────────────────────────────────────
  protected readonly lightboxImages = signal<string[]>([]);
  protected readonly lightboxStartIndex = signal<number>(0);

  openLightbox(project: Project, startIndex: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.lightboxImages.set(project.attachmentUrls);
    this.lightboxStartIndex.set(startIndex);
  }

  closeLightbox(): void {
    this.lightboxImages.set([]);
  }

  // ──────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.titleService.setTitle('Work Samples — Benny Septiawan Salim');
    this.metaService.updateTag({ name: 'description', content: 'Personal projects, open client work, and official projects by Benny Septiawan Salim — Software Engineer & AI specialist.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Work Samples — Benny Septiawan Salim' });
    this.metaService.updateTag({ property: 'og:description', content: 'Personal projects, open client work, and official projects by Benny Septiawan Salim.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://portbybss.netlify.app/work-samples' });
  }

  countFor(cat: ProjectCategory): number {
    return this.allProjects().filter((p: Project) => p.category === cat).length;
  }

  setCategory(cat: ProjectCategory): void {
    this.activeCategory.set(cat);
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      gsap.from('.project-row', { opacity: 0, y: 10, duration: 0.3, stagger: 0.06, ease: 'power2.out' });
    }, 0);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.from('.ws__header', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.project-row', { opacity: 0, y: 12, duration: 0.4, stagger: 0.07, delay: 0.2, ease: 'power3.out' });
  }
}
