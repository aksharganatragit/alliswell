import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { BUSINESS } from '../../config/business';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, BrandLogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly address = BUSINESS.addressShort;

  readonly trust = [
    { icon: 'shield-check', title: 'Herb-infused', sub: 'formulas' },
    { icon: 'truck', title: 'Pan India', sub: 'delivery' },
    { icon: 'heart', title: 'Family', sub: 'safe' },
    { icon: 'coins', title: 'Pay in', sub: 'advance' },
  ];

  readonly links = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'How it works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];
}
