import 'package:delivery_partner_app/features/orders/models/order_status.dart';

class Order {
  const Order({
    required this.id,
    required this.restaurant,
    required this.drop,
    required this.amount,
    required this.distance,
    required this.dateTime,
    required this.status,
    required this.items,
    this.cancelReason,
    this.duration,
    this.breakdown,
  });

  final String id;
  final String restaurant;
  final String drop;
  final String amount;
  final String distance;
  final String dateTime;
  final OrderStatus status;
  final String? cancelReason;
  final int items;
  final String? duration;
  final List<OrderEarning>? breakdown;
}

class OrderEarning {
  const OrderEarning({required this.label, required this.value});

  final String label;
  final String value;
}
