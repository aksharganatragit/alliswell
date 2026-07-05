import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

/**
 * Swipeable image carousel with dot indicators.
 *
 * Uses native CSS scroll-snap so touch/drag swiping works on mobile out of the
 * box; prev/next buttons and dots drive the same scroller for desktop. Renders
 * one slide per entry in `images`. Entries are icon-placeholder keys today and
 * will become real image URLs later — swap the slide template's <app-icon> for
 * an <img> when photography lands; the carousel logic is unchanged.
 */
@Component({
  selector: 'app-carousel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input({ required: true }) images!: string[];
  @Input() alt = '';

  @ViewChild('track') track!: ElementRef<HTMLDivElement>;

  readonly active = signal(0);

  onScroll(): void {
    const el = this.track.nativeElement;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== this.active()) this.active.set(index);
  }

  goTo(index: number): void {
    const el = this.track.nativeElement;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }

  prev(): void {
    this.goTo(Math.max(0, this.active() - 1));
  }
  next(): void {
    this.goTo(Math.min(this.images.length - 1, this.active() + 1));
  }
}
