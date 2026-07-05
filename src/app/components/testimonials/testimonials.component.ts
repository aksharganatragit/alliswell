import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

interface Testimonial {
  name: string;
  initials: string;
  quote: string;
  rating: number;
  stars: boolean[];
}

/** 4 or 5 stars, picked at random — never fewer. */
function randomRating(): number {
  return Math.random() < 0.5 ? 4 : 5;
}

function makeTestimonial(t: Omit<Testimonial, 'rating' | 'stars'>): Testimonial {
  const rating = randomRating();
  return { ...t, rating, stars: Array.from({ length: 5 }, (_, i) => i < rating) };
}

/**
 * Auto-advancing testimonials rail. Shows 2 cards on desktop / 1 on mobile and
 * gently slides to the next every ~4s using native scroll-snap (so it's also
 * swipeable). Pauses on hover/focus and respects reduced-motion.
 */
@Component({
  selector: 'app-testimonials',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rail') rail!: ElementRef<HTMLDivElement>;

  private timer: ReturnType<typeof setInterval> | null = null;

  readonly testimonials: Testimonial[] = [
    makeTestimonial({
      name: 'Akshar Ganatra',
      initials: 'AG',
      quote: 'Genuine products and honestly quick delivery. Ayuska is part of our family’s daily routine now.',
    }),
    makeTestimonial({
      name: 'Nishit Radhanpura',
      initials: 'NR',
      quote: 'Ordering on WhatsApp couldn’t be simpler. Neatly packed and delivered right on time.',
    }),
    makeTestimonial({
      name: 'Saurabh Mota',
      initials: 'SM',
      quote: 'You can feel the quality is authentic. Skeensudha worked wonderfully for us.',
    }),
    makeTestimonial({
      name: 'Shoaib Sheikh',
      initials: 'SS',
      quote: 'A brand you can actually trust for real herbal care. The team is so helpful on WhatsApp.',
    }),
    makeTestimonial({
      name: 'Shweta Singh',
      initials: 'SS',
      quote: 'Finally a herbal wellness store I can rely on for my family. Highly recommend Gausudha.',
    }),
    makeTestimonial({
      name: 'Vishal Agarwal',
      initials: 'VA',
      quote: 'Great products at fair prices, and pan-India delivery made the whole thing effortless.',
    }),
  ];

  ngAfterViewInit(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    this.stop();
    this.timer = setInterval(() => this.advance(), 4000);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private advance(): void {
    const el = this.rail?.nativeElement;
    if (!el) return;
    const cards = el.children;
    if (cards.length < 2) return;
    // step = distance between two cards (card width + gap)
    const step = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  }
}
