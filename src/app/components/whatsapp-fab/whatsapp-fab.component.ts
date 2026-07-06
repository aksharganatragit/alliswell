import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { OrderService } from '../../services/order.service';
import { BUSINESS } from '../../config/business';

/**
 * Persistent floating contact stack (bottom-right, every page):
 * a phone "call us" button above the WhatsApp lead-gen button.
 */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <div class="fab-stack">
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
export class WhatsappFabComponent {
  private readonly orders = inject(OrderService);

  readonly telHref = `tel:+${BUSINESS.phone}`;

  connect(): void {
    this.orders.lead();
  }
}
