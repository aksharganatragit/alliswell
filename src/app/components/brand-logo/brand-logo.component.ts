import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { BUSINESS } from '../../config/business';

/**
 * Brand lockup: rounded-square forest-green mark with a leaf, the "All is well"
 * wordmark in Fraunces, and the sage sub-label. `tone="light"` renders it for
 * dark surfaces (footer band).
 */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <span class="lockup" [class.lockup--light]="tone === 'light'">
      <span class="mark" aria-hidden="true">
        <app-icon name="leaf" [size]="20"></app-icon>
      </span>
      <span class="words">
        <span class="wordmark">{{ name }}</span>
        <span class="sublabel">{{ sublabel }}</span>
      </span>
    </span>
  `,
  styleUrl: './brand-logo.component.scss',
})
export class BrandLogoComponent {
  @Input() tone: 'dark' | 'light' = 'dark';
  readonly name = BUSINESS.name;
  readonly sublabel = BUSINESS.subLabel;
}
