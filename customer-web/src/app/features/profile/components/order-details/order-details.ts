import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faBiking,
  faCheckCircle,
  faMapMarkerAlt,
  faBoxesPacking,
  faRotateLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Order } from '@/app/features/profile/models/profile.models';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.sass',
})
export class OrderDetails {
  @Input({ required: true }) order!: Order;
  @Output() back = new EventEmitter<void>();

  readonly faArrowLeft = faArrowLeft;
  readonly faBike = faBiking;
  readonly faCheckCircle = faCheckCircle;
  readonly faMapMarkerAlt = faMapMarkerAlt;
  readonly faPackage = faBoxesPacking;
  readonly faRotateLeft = faRotateLeft;
  readonly faStar = faStar;

  getItemTotal(order: Order): number {
    return order.items.reduce((total, item) => total + item.price * item.qty, 0);
  }
}
