import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  private readonly orders = inject(OrderService);

  readonly steps = [
    {
      icon: 'search',
      title: 'Browse',
      body: 'Explore our herbal range and add what you need to your cart. No account, no sign-up.',
    },
    {
      icon: 'cart',
      title: 'Review your cart',
      body: 'Check your items, quantities and total. Adjust anything before you confirm — nothing is final yet.',
    },
    {
      icon: 'whatsapp',
      title: 'Confirm on WhatsApp',
      body: 'Tap “Order on WhatsApp” to send your pre-filled order. We confirm availability and arrange delivery.',
    },
  ];

  order(): void {
    this.orders.orderGeneric();
  }
}
