import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  PERSONAL_INFO_EN,
  AVAILABILITY_STATUS_EN, SCHEDULING_LINK_EN, NAV_LINKS_EN, INQUIRY_FORM_EN, getIcon
} from '../constants/portfolio-data.en';

import {
  PERSONAL_INFO_ID,
  AVAILABILITY_STATUS_ID, SCHEDULING_LINK_ID, NAV_LINKS_ID, INQUIRY_FORM_ID
} from '../constants/portfolio-data.id';

export type Language = 'en' | 'id';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private currentLanguage = signal<Language>('en');

  // Expose current language (read-only)
  language = this.currentLanguage.asReadonly();

  // Computed data based on current language
  personalInfo    = computed(() => this.language() === 'en' ? PERSONAL_INFO_EN : PERSONAL_INFO_ID);
  availabilityStatus = computed(() => this.language() === 'en' ? AVAILABILITY_STATUS_EN : AVAILABILITY_STATUS_ID);
  schedulingLink  = computed(() => this.language() === 'en' ? SCHEDULING_LINK_EN : SCHEDULING_LINK_ID);
  navLinks        = computed(() => this.language() === 'en' ? NAV_LINKS_EN : NAV_LINKS_ID);
  inquiryForm     = computed(() => this.language() === 'en' ? INQUIRY_FORM_EN : INQUIRY_FORM_ID);

  getIcon = getIcon;

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLanguage() === 'en' ? 'id' : 'en');
  }
}
