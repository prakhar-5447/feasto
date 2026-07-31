import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.sass',
})
export class Modal {
  @Output() close = new EventEmitter<void>();
}
