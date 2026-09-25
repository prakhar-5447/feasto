enum IssueCategory { restaurant, customer, order, navigation, vehicle, safety }

extension IssueCategoryExtension on IssueCategory {
  String get label {
    switch (this) {
      case IssueCategory.restaurant:
        return 'Restaurant Issue';

      case IssueCategory.customer:
        return 'Customer Issue';

      case IssueCategory.order:
        return 'Order Issue';

      case IssueCategory.navigation:
        return 'Navigation Issue';

      case IssueCategory.vehicle:
        return 'Vehicle Problem';

      case IssueCategory.safety:
        return 'Safety Issue';
    }
  }

  String get icon {
    switch (this) {
      case IssueCategory.restaurant:
        return '🍽';

      case IssueCategory.customer:
        return '👤';

      case IssueCategory.order:
        return '📦';

      case IssueCategory.navigation:
        return '🗺';

      case IssueCategory.vehicle:
        return '🏍';

      case IssueCategory.safety:
        return '🚨';
    }
  }

  List<String> get options {
    switch (this) {
      case IssueCategory.restaurant:
        return [
          'Restaurant is closed',
          "Order isn't ready",
          "Restaurant can't find the order",
          'Long waiting time',
          'Restaurant refuses order',
          'Other',
        ];

      case IssueCategory.customer:
        return [
          'Customer unavailable',
          'Incorrect address',
          'Cannot access building',
          'Customer refuses order',
          'Customer requested cancellation',
          'Other',
        ];

      case IssueCategory.order:
        return [
          'Missing item',
          'Wrong order',
          'Damaged order',
          'Order not prepared',
          'Order information incorrect',
          'Other',
        ];

      case IssueCategory.navigation:
        return [
          'Wrong route',
          'Address cannot be found',
          'Road blocked',
          'GPS inaccurate',
          'Other',
        ];

      case IssueCategory.vehicle:
        return [
          'Flat tyre',
          'Vehicle breakdown',
          'Fuel problem',
          'Accident',
          'Other',
        ];

      case IssueCategory.safety:
        return [
          'Unsafe area',
          'Threatening behaviour',
          'Accident involving rider',
          'Road hazard',
          'Other',
        ];
    }
  }
}
