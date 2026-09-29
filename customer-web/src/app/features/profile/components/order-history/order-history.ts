import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Order } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.sass',
})
export class OrderHistory {
  @Input({ required: true }) orders!: Order[];
  @Output() viewOrder = new EventEmitter<Order>();

  readonly faChevronRight = faChevronRight;
  readonly faRotateLeft = faRotateLeft;

  getItemCount(order: Order): number {
    return order.items.reduce((total, item) => total + item.qty, 0);
  }
}
