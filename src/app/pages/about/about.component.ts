import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { BUSINESS } from '../../config/business';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly address = BUSINESS.address;

  readonly trust = [
    { icon: 'shield-check', title: 'Herb-infused formulas', body: 'Genuine formulations you can trust for the whole family.' },
    { icon: 'sprout', title: 'Sourced with integrity', body: 'Ingredients chosen carefully and prepared in small batches.' },
    { icon: 'truck', title: 'Pan India delivery', body: 'Delivered across India, with careful packing and tracking.' },
    { icon: 'coins', title: 'Pay in advance', body: 'Simple online or bank-transfer payment before we dispatch.' },
  ];
}
