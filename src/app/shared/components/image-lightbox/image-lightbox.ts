import {
  Component,
  input,
  output,
  signal,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  templateUrl: './image-lightbox.html',
  styleUrl: './image-lightbox.css',
})
export class ImageLightboxComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly images     = input.required<string[]>();
  readonly startIndex = input<number>(0);
  readonly close      = output<void>();

  protected readonly currentIndex = signal(0);

  protected readonly currentImage = computed(
    () => this.images()[this.currentIndex()] ?? ''
  );
  protected readonly total = computed(() => this.images().length);
  protected readonly hasPrev = computed(() => this.currentIndex() > 0);
  protected readonly hasNext = computed(() => this.currentIndex() < this.total() - 1);

  ngOnInit(): void {
    this.currentIndex.set(this.startIndex());
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  prev(): void {
    if (this.hasPrev()) this.currentIndex.update(i => i - 1);
  }

  next(): void {
    if (this.hasNext()) this.currentIndex.update(i => i + 1);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  onClose(): void {
    this.close.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':     this.onClose(); break;
      case 'ArrowLeft':  this.prev();    break;
      case 'ArrowRight': this.next();    break;
    }
  }
}
