import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { OrderService } from '../../services/order.service';
import { BUSINESS } from '../../config/business';

/**
 * Persistent floating contact stack (bottom-right, every page):
 * a phone "call us" button above the WhatsApp lead-gen button.
 * Hides while the page is actively scrolling; reappears when scrolling stops.
 */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="fab-stack" [class.is-hidden]="hidden()">
      <a class="fab-btn fab-btn--call" [href]="telHref" aria-label="Call us">
        <app-icon name="phone" [size]="24"></app-icon>
      </a>
      <button class="fab-btn fab-btn--wa" (click)="connect()" aria-label="Chat with us on WhatsApp">
        <app-icon name="whatsapp" [size]="28"></app-icon>
      </button>
    </div>
  `,
  styleUrl: './whatsapp-fab.component.scss',
})
export class WhatsappFabComponent implements OnDestroy {
  private readonly orders = inject(OrderService);

  readonly telHref = `tel:+${BUSINESS.phone}`;
  readonly hidden = signal(false);

  private idleTimer: ReturnType<typeof setTimeout> | undefined;

  connect(): void {
    this.orders.lead();
  }

  /** Hide while scrolling; show again ~200ms after the last scroll event. */
  @HostListener('window:scroll')
  onScroll(): void {
    this.hidden.set(true);
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.hidden.set(false), 200);
  }

  ngOnDestroy(): void {
    clearTimeout(this.idleTimer);
  }
}
