import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {

  readonly id = input.required<string>();
  readonly name = input.required<string>();

  readonly label = input('');
  readonly type = input('text');
  readonly placeholder = input('');

  readonly value = model('');

  readonly autocomplete = input('');
  readonly inputmode = input('');
  readonly spellcheck = input(false);

  readonly digitsOnly = input(false);

  readonly pattern = input('');
  readonly sanitizePattern = input<RegExp | null>(null);
  readonly minlength = input<number>();
  readonly maxlength = input<number>();

  readonly required = input(false);
  readonly disabled = input(false);

  readonly prefix = input('');
  readonly suffix = input('');

  readonly error = input('');
  readonly hint = input('');

  onInput(event: Event): void {

    const inputElement = event.target as HTMLInputElement;

    let value = inputElement.value;

    if (this.digitsOnly()) {
      value = value.replace(/\D/g, '');
    }

    const sanitizePattern = this.sanitizePattern();

    if (sanitizePattern) {
      value = [...value]
        .filter(char => sanitizePattern.test(char))
        .join('');
    }

    const maxLength = this.maxlength();

    if (maxLength !== undefined) {
      value = value.slice(0, maxLength);
    }

    inputElement.value = value;

    this.value.set(value);
  }


  onBeforeInput(event: InputEvent): void {

    if (!this.digitsOnly() && !this.sanitizePattern())
      return;


    if (event.inputType !== 'insertText' || !event.data)
      return;


    if (
      this.digitsOnly() &&
      /\D/.test(event.data)
    ) {
      event.preventDefault();
      return;
    }

    const pattern = this.sanitizePattern();

    if (
      pattern &&
      [...event.data].some(
        char => !pattern.test(char)
      )
    ) {
      event.preventDefault();
    }
  }
}