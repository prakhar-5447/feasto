class DeliveryOrder {
  const DeliveryOrder({
    required this.id,
    required this.restaurant,
    required this.restaurantArea,
    required this.customerName,
    required this.deliveryArea,
    required this.distance,
    required this.earnings,
    required this.items,
  });

  final String id;
  final String restaurant;
  final String restaurantArea;
  final String customerName;
  final String deliveryArea;
  final String distance;
  final String earnings;
  final int items;
}
