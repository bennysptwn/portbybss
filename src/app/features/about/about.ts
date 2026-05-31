import { Component, signal, AfterViewInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { BIOGRAPHY, WORKING_FIELDS, QUOTES } from '../../shared/constants/portfolio-data';
import type { WorkingField, Quote } from '../../shared/models';
import gsap from 'gsap';

type AboutTab = 'description' | 'working-fields' | 'quotes';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit {
  protected readonly activeTab = signal<AboutTab>('description');
  protected readonly selectedField = signal<WorkingField | null>(WORKING_FIELDS[0]);
  protected readonly biography: string[] = BIOGRAPHY;
  protected readonly workingFields: WorkingField[] = WORKING_FIELDS;
  protected readonly quotes: Quote[] = QUOTES;

  selectTab(tab: AboutTab): void {
    this.activeTab.set(tab);
    if (tab === 'working-fields' && !this.selectedField()) {
      this.selectedField.set(WORKING_FIELDS[0]);
    }
  }

  selectField(field: WorkingField): void {
    this.selectedField.set(field);
    gsap.from('.field-detail', { opacity: 0, x: 10, duration: 0.25, ease: 'power2.out' });
  }

  ngAfterViewInit(): void {
    gsap.from('.about__header-block', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    gsap.from('.tab-bar', { opacity: 0, y: 10, duration: 0.4, delay: 0.2, ease: 'power3.out' });
  }
}
