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

  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'icon' = 'primary';

  @Input() size:
    | 'sm'
    | 'md'
    | 'lg' = 'md';

  @Input() type:
    | 'button'
    | 'submit'
    | 'reset' = 'button';

  @Input() icon?: IconDefinition;

  @Input() iconPosition:
    | 'left'
    | 'right' = 'left';

  @Input() disabled = false;

  @Input() loading = false;

  @Output() clicked = new EventEmitter<MouseEvent>();


  onClick(event: MouseEvent): void {

    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    this.clicked.emit(event);
  }
}