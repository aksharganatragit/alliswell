import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  private readonly orders = inject(OrderService);

  /** Index of the currently open question, or -1 for none. */
  readonly open = signal(0);

  readonly faqs = [
    {
      q: 'How long does delivery take?',
      a: 'Within Rajkot, orders usually arrive in 1–3 days after we confirm them on WhatsApp. Elsewhere in India it typically takes a few days. We’ll share timing when you order.',
    },
    {
      q: 'Do you deliver outside Rajkot?',
      a: 'Yes — we deliver pan India. Wherever you are in the country, order on WhatsApp and we’ll arrange delivery to you.',
    },
    {
      q: 'Can I pay cash on delivery?',
      a: 'Yes. Cash on delivery is available across our delivery area.',
    },
    {
      q: 'Do you accept online payment?',
      a: 'Yes — you can pay online as well. We’ll share the details when we confirm your order.',
    },
    {
      q: 'Are these genuine / authentic products?',
      a: 'Every product is a genuine herbal formulation, made with care and sourced with integrity.',
    },
    {
      q: 'Can I return or exchange a product?',
      a: 'If something isn’t right, message us on WhatsApp and we’ll help. (Full returns policy to be finalised.)',
    },
    {
      q: 'How does WhatsApp ordering work?',
      a: 'Add items to your cart, then tap “Order on WhatsApp”. A pre-filled message opens with your items and total — send it, and we confirm and deliver.',
    },
    {
      q: 'What if I don’t have WhatsApp?',
      a: 'Use the contact form on our Contact page, or call us. We’ll take your order directly.',
    },
    {
      q: 'How do I know my order is confirmed?',
      a: 'We reply on WhatsApp to confirm availability, total and delivery. Your order is confirmed once we’ve replied.',
    },
  ];

  toggle(i: number): void {
    this.open.update((cur) => (cur === i ? -1 : i));
  }

  contact(): void {
    this.orders.contact();
  }
}
