import 'package:delivery_partner_app/features/notifications/models/notification.dart';
import 'package:delivery_partner_app/features/notifications/models/notification_type.dart';

class NotificationsService {
  Future<List<AppNotification>> getNotifications() async {
    await Future.delayed(const Duration(milliseconds: 250));

    return const [
      AppNotification(
        id: 1,
        type: NotificationType.orders,
        icon: '📦',
        title: 'New delivery assigned',
        body: 'Order #FST-29381 from Spice Garden Kitchen',
        time: '2 min ago',
        unread: true,
        group: NotificationGroup.today,
      ),
      AppNotification(
        id: 2,
        type: NotificationType.earnings,
        icon: '💰',
        title: 'Earnings credited',
        body: '₹842 has been added to your account',
        time: '1h ago',
        unread: true,
        group: NotificationGroup.today,
      ),
      AppNotification(
        id: 3,
        type: NotificationType.earnings,
        icon: '🎯',
        title: 'Incentive unlocked!',
        body: 'Weekend Challenge complete — ₹150 bonus added',
        time: '3h ago',
        unread: false,
        group: NotificationGroup.today,
      ),
      AppNotification(
        id: 4,
        type: NotificationType.orders,
        icon: '✓',
        title: 'Order delivered',
        body: 'Order #FST-29370 delivered to Indiranagar',
        time: '5h ago',
        unread: false,
        group: NotificationGroup.today,
      ),
      AppNotification(
        id: 5,
        type: NotificationType.account,
        icon: '📋',
        title: 'Document pending',
        body: 'Your Vehicle RC is under review. Upload a clearer photo.',
        time: 'Yesterday',
        unread: false,
        group: NotificationGroup.earlier,
      ),
      AppNotification(
        id: 6,
        type: NotificationType.earnings,
        icon: '💳',
        title: 'Weekly payout sent',
        body: '₹6,085 transferred to SBI ••••4321',
        time: 'Aug 29',
        unread: false,
        group: NotificationGroup.earlier,
      ),
      AppNotification(
        id: 7,
        type: NotificationType.orders,
        icon: '🎁',
        title: 'New incentive available',
        body: 'Monsoon Surge: ₹20 extra per delivery during rain',
        time: 'Aug 28',
        unread: false,
        group: NotificationGroup.earlier,
      ),
      AppNotification(
        id: 8,
        type: NotificationType.account,
        icon: '⭐',
        title: 'You got a 5-star rating!',
        body: 'Priya S. rated your delivery 5 stars',
        time: 'Aug 27',
        unread: false,
        group: NotificationGroup.earlier,
      ),
    ];
  }

  Future<void> markAllAsRead() async {
    await Future.delayed(const Duration(milliseconds: 100));
  }
}
