import 'notification_type.dart';

enum NotificationGroup { today, earlier }

class AppNotification {
  const AppNotification({
    required this.id,
    required this.type,
    required this.icon,
    required this.title,
    required this.body,
    required this.time,
    required this.unread,
    required this.group,
  });

  final int id;
  final NotificationType type;
  final String icon;
  final String title;
  final String body;
  final String time;
  final bool unread;
  final NotificationGroup group;

  AppNotification copyWith({bool? unread}) {
    return AppNotification(
      id: id,
      type: type,
      icon: icon,
      title: title,
      body: body,
      time: time,
      unread: unread ?? this.unread,
      group: group,
    );
  }
}
