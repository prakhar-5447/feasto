import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button.html',
  styleUrl: './button.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {

  @Input()
  variant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'text'
    | 'danger'
    | 'icon' = 'primary';

  @Input()
  size:
    | 'sm'
    | 'md'
    | 'lg' = 'md';

  @Input()
  weight:
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold' = 'semibold';

  @Input()
  tone:
    | 'default'
    | 'muted' = 'default';

  @Input()
  type:
    | 'button'
    | 'submit'
    | 'reset' = 'button';

  @Input()
  icon?: IconDefinition;

  @Input()
  iconPosition:
    | 'left'
    | 'right' = 'left';

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Input()
  fullWidth = false;

  @Input()
  disableHover = false;

  @Input()
  ariaLabel?: string;

  @Output()
  clicked = new EventEmitter<MouseEvent>();


  onClick(event: MouseEvent): void {

    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    this.clicked.emit(event);
  }

  get buttonClasses(): string {
    return [
      'button',
      `button-${this.variant}`,
      `button-${this.size}`,
      `button-weight-${this.weight}`,
      `button-tone-${this.tone}`,
      this.fullWidth ? 'button-full-width' : '',
      this.disableHover ? 'button-no-hover' : '',
      this.loading ? 'button-loading' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }
}