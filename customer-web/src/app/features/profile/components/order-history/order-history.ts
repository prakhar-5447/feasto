import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '@/app/features/profile/models/profile.models';
import { LucideChevronRight, LucideRotateCwClock } from '@lucide/angular';


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, LucideRotateCwClock, LucideChevronRight],
  templateUrl: './order-history.html',
  styleUrl: './order-history.sass',
})
export class OrderHistory {
  @Input({ required: true }) orders!: Order[];
  @Output() viewOrder = new EventEmitter<Order>();

  getItemCount(order: Order): number {
    return order.items.reduce((total, item) => total + item.qty, 0);
  }
}
