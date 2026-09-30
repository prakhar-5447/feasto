import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

import { Loader } from '../loader/loader';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [Loader],
  templateUrl: './button.html',
  styleUrl: './button.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {

  readonly variant =
    input<
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'ghost'
      | 'text'
      | 'danger'
    >('primary');

  readonly size =
    input<
      | 'sm'
      | 'md'
      | 'lg'
    >('md');

  readonly weight =
    input<
      | 'regular'
      | 'medium'
      | 'semibold'
      | 'bold'
    >('semibold');

  readonly tone =
    input<
      | 'default'
      | 'muted'
    >('default');

  readonly type =
    input<
      | 'button'
      | 'submit'
      | 'reset'
    >('button');

  readonly disabled =
    input(false);

  readonly loading =
    input(false);

  readonly fullWidth =
    input(false);

  readonly disableHover =
    input(false);

  readonly ariaLabel =
    input<string | undefined>();


  @Output()
  readonly clicked =
    new EventEmitter<MouseEvent>();


  onClick(event: MouseEvent): void {

    if (
      this.disabled() ||
      this.loading()
    ) {
      event.preventDefault();
      return;
    }

    this.clicked.emit(event);
  }


  get buttonClasses(): string {

    return [
      'button',

      `button-${this.variant()}`,

      `button-${this.size()}`,

      `button-weight-${this.weight()}`,

      `button-tone-${this.tone()}`,

      this.fullWidth()
        ? 'button-full-width'
        : '',

      this.disableHover()
        ? 'button-no-hover'
        : '',

      this.loading()
        ? 'button-loading'
        : ''

    ]
      .filter(Boolean)
      .join(' ');
  }
}