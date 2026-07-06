import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  readonly phoneDisplay = BUSINESS.phoneDisplay;
  readonly telHref = `tel:+${BUSINESS.phone}`;
  readonly email = BUSINESS.email;
  readonly mailHref =
    `mailto:${BUSINESS.email}` +
    `?subject=${encodeURIComponent(`Enquiry from ${BUSINESS.name} website`)}` +
    `&body=${encodeURIComponent(`Hey ${BUSINESS.name} 👋, I'd like to get in touch about your products.`)}`;

  readonly name = signal('');
  readonly phone = signal('');
  readonly place = signal('');
  readonly message = signal('');
  readonly sent = signal(false);
  /** Errors surface only after a submit attempt, then update live. */
  readonly submitted = signal(false);

  readonly nameError = computed(() =>
    this.submitted() && !this.name().trim() ? 'Please enter your name.' : '',
  );

  readonly phoneError = computed(() => {
    if (!this.submitted()) return '';
    const digits = this.phone().replace(/\D/g, '');
    if (!digits) return 'Please enter your phone number.';
    // Accept an optional 91 country code, then require a valid Indian mobile.
    const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(local)) {
      return 'Enter a valid 10-digit Indian mobile number.';
    }
    return '';
  });

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
    this.submitted.set(true);
    if (this.nameError() || this.phoneError()) return;
    this.orders.contactForm({
      name: this.name(),
      phone: this.phone(),
      place: this.place(),
      message: this.message(),
    });
    this.sent.set(true);
  }

  chat(): void {
    this.orders.lead();
  }
}
