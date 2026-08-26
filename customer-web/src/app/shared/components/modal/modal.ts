import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Modal {

  @Input()
  size:
    | 'sm'
    | 'md'
    | 'lg' = 'md';
}