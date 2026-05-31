import { Component, signal, computed, inject, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PROJECTS, getIcon } from '../../shared/constants/portfolio-data';
import type { Project } from '../../shared/models';
import gsap from 'gsap';

type ProjectCategory = 'personal' | 'open-client' | 'official';

@Component({
  selector: 'app-work-samples',
  standalone: true,
  templateUrl: './work-samples.html',
  styleUrl: './work-samples.css'
})
export class WorkSamplesComponent implements AfterViewInit {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly activeCategory = signal<ProjectCategory>('personal');
  protected readonly arrowIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(getIcon('arrow-up-right'));

  protected readonly categories: { key: ProjectCategory; label: string }[] = [
    { key: 'personal', label: 'Personal' },
    { key: 'open-client', label: 'Open Client' },
    { key: 'official', label: 'Official' }
  ];

  protected readonly filteredProjects = computed(() =>
    PROJECTS.filter(p => p.category === this.activeCategory())
  );

  protected countFor(cat: ProjectCategory): number {
    return PROJECTS.filter(p => p.category === cat).length;
  }

  setCategory(cat: ProjectCategory): void {
    this.activeCategory.set(cat);
    setTimeout(() => {
      gsap.from('.project-row', { opacity: 0, y: 10, duration: 0.3, stagger: 0.06, ease: 'power2.out' });
    }, 0);
  }

  ngAfterViewInit(): void {
    gsap.from('.ws__header', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.project-row', { opacity: 0, y: 12, duration: 0.4, stagger: 0.07, delay: 0.2, ease: 'power3.out' });
  }
}
