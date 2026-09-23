class IncomingOrder {
  const IncomingOrder({
    required this.id,
    required this.restaurant,
    required this.restaurantArea,
    required this.pickupDistance,
    required this.customerName,
    required this.deliveryArea,
    required this.deliveryDistance,
    required this.totalDistance,
    required this.earnings,
    required this.items,
    required this.eta,
  });

  final String id;
  final String restaurant;
  final String restaurantArea;
  final String pickupDistance;
  final String customerName;
  final String deliveryArea;
  final String deliveryDistance;
  final String totalDistance;
  final String earnings;
  final int items;
  final String eta;
}
