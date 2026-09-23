import 'package:flutter/material.dart';

import 'package:delivery_partner_app/features/orders/models/order.dart';

class OrderDetailPage extends StatelessWidget {
  const OrderDetailPage({super.key, required this.order});

  final Order order;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text("This is Order Detail Page"),
      // your route,
      // earnings,
      // cancellation reason,
      // etc.
    );
  }
}
