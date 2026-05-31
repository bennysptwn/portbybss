import { Component, signal, AfterViewInit } from '@angular/core';
import { EXPERIENCES } from '../../shared/constants/portfolio-data';
import type { Experience } from '../../shared/models';
import gsap from 'gsap';

@Component({
  selector: 'app-experiences',
  standalone: true,
  templateUrl: './experiences.html',
  styleUrl: './experiences.css'
})
export class ExperiencesComponent implements AfterViewInit {
  protected readonly experiences: Experience[] = EXPERIENCES;
  protected readonly openIndex = signal<number>(0);

  toggle(index: number): void {
    if (this.openIndex() === index) {
      this.openIndex.set(-1);
    } else {
      this.openIndex.set(index);
    }
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }

  ngAfterViewInit(): void {
    gsap.from('.exp-row', {
      opacity: 0,
      y: 16,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }
}
