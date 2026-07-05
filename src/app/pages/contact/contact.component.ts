import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { OrderService } from '../../services/order.service';
import { BUSINESS } from '../../config/business';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly orders = inject(OrderService);

  readonly address = BUSINESS.address;

  readonly name = signal('');
  readonly phone = signal('');
  readonly message = signal('');
  readonly sent = signal(false);

  readonly terms = [
    'Orders are placed and confirmed over WhatsApp. Prices are in INR and may change without notice.',
    'We deliver pan India; delivery times are estimates, not guarantees.',
    'Returns or exchanges are handled case by case — message us and we’ll make it right.',
    'Our herbal products are not a substitute for medical advice; consult a physician where needed.',
  ];

  readonly privacy = [
    'We collect only what we need to fulfil your order: your name, phone number and delivery details.',
    'Ordering happens through WhatsApp, so your message is handled under WhatsApp’s own privacy terms.',
    'We do not sell or share your details with any third party for marketing.',
    'You can ask us to delete your details at any time by messaging us.',
  ];

  /**
   * Placeholder submit — no backend yet. For now it hands the enquiry to the
   * order service, which opens a pre-filled WhatsApp chat. Wire to a real
   * endpoint later without touching the template.
   */
  submit(event: Event): void {
    event.preventDefault();
    this.orders.contactForm({
      name: this.name(),
      phone: this.phone(),
      message: this.message(),
    });
    this.sent.set(true);
  }

  chat(): void {
    this.orders.contact('Hi 👋, I’d like to get in touch with *All is well*.');
  }
}
