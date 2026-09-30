import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '@/app/features/profile/models/profile.models';
import { LucideArrowLeft, LucideBike, LucideCircleCheck, LucideMapPin, LucidePackage, LucideRotateCwClock, LucideStar } from '@lucide/angular';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, LucideArrowLeft, LucideBike, LucideCircleCheck, LucideMapPin, LucidePackage, LucideRotateCwClock, LucideStar],
  templateUrl: './order-details.html',
  styleUrl: './order-details.sass',
})
export class OrderDetails {
  @Input({ required: true }) order!: Order;
  @Output() back = new EventEmitter<void>();

  getItemTotal(order: Order): number {
    return order.items.reduce((total, item) => total + item.price * item.qty, 0);
  }
}
