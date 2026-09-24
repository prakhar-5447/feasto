import 'package:delivery_partner_app/features/notification_settings/models/notification_setting.dart';
import 'package:delivery_partner_app/features/notification_settings/models/notification_sound.dart';

class NotificationSettingsService {
  Future<List<NotificationSetting>> getSettings() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return const [
      NotificationSetting(
        id: 'new-orders',
        icon: '📦',
        label: 'New Order Requests',
        subtitle: 'Alert when a new order is assigned',
        enabled: true,
      ),
      NotificationSetting(
        id: 'order-updates',
        icon: '🔄',
        label: 'Order Updates',
        subtitle: 'Status changes and confirmations',
        enabled: true,
      ),
      NotificationSetting(
        id: 'earnings',
        icon: '💰',
        label: 'Earnings Credited',
        subtitle: 'When payments are added to your account',
        enabled: true,
      ),
      NotificationSetting(
        id: 'incentives',
        icon: '🎯',
        label: 'Incentives & Bonuses',
        subtitle: 'New challenges and bonus unlocks',
        enabled: true,
      ),
      NotificationSetting(
        id: 'payout',
        icon: '💳',
        label: 'Weekly Payouts',
        subtitle: 'Settlement and bank transfer alerts',
        enabled: true,
      ),
      NotificationSetting(
        id: 'documents',
        icon: '📋',
        label: 'Document Alerts',
        subtitle: 'Expiry warnings and verification updates',
        enabled: true,
      ),
      NotificationSetting(
        id: 'ratings',
        icon: '⭐',
        label: 'Customer Ratings',
        subtitle: 'When a customer rates your delivery',
        enabled: false,
      ),
      NotificationSetting(
        id: 'promotional',
        icon: '📣',
        label: 'Promotions & Offers',
        subtitle: 'App offers and campaign announcements',
        enabled: false,
      ),
      NotificationSetting(
        id: 'tips',
        icon: '💡',
        label: 'App Tips',
        subtitle: 'Feature tips and how-to guides',
        enabled: false,
      ),
    ];
  }

  Future<void> saveSetting(NotificationSetting setting) async {
    await Future.delayed(const Duration(milliseconds: 100));
  }

  Future<void> saveSound(NotificationSound sound) async {
    await Future.delayed(const Duration(milliseconds: 100));
  }

  Future<void> saveQuietHours({
    required bool enabled,
    required String start,
    required String end,
  }) async {
    await Future.delayed(const Duration(milliseconds: 100));
  }
}
