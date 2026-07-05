import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PRODUCTS } from '../../data/products';
import { BUSINESS } from '../../config/business';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, ProductCardComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly products = PRODUCTS;
  readonly address = BUSINESS.addressShort;

  readonly steps = [
    { icon: 'search', label: 'Browse' },
    { icon: 'cart', label: 'Add to cart' },
    { icon: 'whatsapp', label: 'Confirm on WhatsApp' },
  ];

  readonly trust = [
    { icon: 'shield-check', label: 'Crafted with natural-origin ingredients' },
    { icon: 'truck', label: 'Pan India delivery' },
    { icon: 'heart', label: 'Family-safe formulas' },
    { icon: 'coins', label: 'Cash or online payment' },
  ];
}
