import 'package:get/get.dart';

import 'package:delivery_partner_app/features/notifications/models/notification.dart';
import 'package:delivery_partner_app/features/notifications/models/notification_type.dart';
import 'package:delivery_partner_app/features/notifications/services/notifications_service.dart';

class NotificationsController extends GetxController {
  NotificationsController({required this.notificationsService});

  final NotificationsService notificationsService;

  final notifications = <AppNotification>[].obs;

  final selectedType = Rxn<NotificationType>();

  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadNotifications();
  }

  Future<void> loadNotifications() async {
    try {
      isLoading.value = true;

      final result = await notificationsService.getNotifications();

      notifications.assignAll(result);
    } finally {
      isLoading.value = false;
    }
  }

  List<AppNotification> get filteredNotifications {
    final type = selectedType.value;

    if (type == null) {
      return notifications.toList();
    }

    return notifications
        .where((notification) => notification.type == type)
        .toList();
  }

  List<AppNotification> get todayNotifications {
    return filteredNotifications
        .where((notification) => notification.group == NotificationGroup.today)
        .toList();
  }

  List<AppNotification> get earlierNotifications {
    return filteredNotifications
        .where(
          (notification) => notification.group == NotificationGroup.earlier,
        )
        .toList();
  }

  int get unreadCount {
    return notifications.where((notification) => notification.unread).length;
  }

  void selectType(NotificationType? type) {
    selectedType.value = type;
  }

  Future<void> markAllAsRead() async {
    if (unreadCount == 0) {
      return;
    }

    await notificationsService.markAllAsRead();

    notifications.assignAll(
      notifications.map((notification) => notification.copyWith(unread: false)),
    );
  }
}
