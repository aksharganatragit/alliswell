import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { OrderService } from '../../services/order.service';

/** Persistent floating "Order on WhatsApp" button (bottom-right, every page). */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <button class="fab" (click)="order()" aria-label="Order on WhatsApp">
      <span class="fab__label" aria-hidden="true">Order on WhatsApp</span>
      <span class="fab__circle">
        <app-icon name="whatsapp" [size]="28"></app-icon>
      </span>
    </button>
  `,
  styleUrl: './whatsapp-fab.component.scss',
})
export class WhatsappFabComponent {
  private readonly orders = inject(OrderService);

  order(): void {
    this.orders.orderGeneric();
  }
}
