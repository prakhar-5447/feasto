enum DeliveryPhase {
  goingToRestaurant,
  arrivedAtRestaurant,
  orderPickedUp,
  goingToCustomer,
  arrivedAtCustomer,
  pinVerification,
  delivered,
}

extension DeliveryPhaseExtension on DeliveryPhase {
  String get label {
    switch (this) {
      case DeliveryPhase.goingToRestaurant:
        return 'Going to Restaurant';

      case DeliveryPhase.arrivedAtRestaurant:
        return 'At Restaurant';

      case DeliveryPhase.orderPickedUp:
        return 'Order Picked Up';

      case DeliveryPhase.goingToCustomer:
        return 'Going to Customer';

      case DeliveryPhase.arrivedAtCustomer:
        return 'At Customer';

      case DeliveryPhase.pinVerification:
        return 'Verifying Delivery';

      case DeliveryPhase.delivered:
        return 'Delivery Completed';
    }
  }
}
