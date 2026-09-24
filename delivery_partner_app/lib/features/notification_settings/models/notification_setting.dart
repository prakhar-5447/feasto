class NotificationSetting {
  const NotificationSetting({
    required this.id,
    required this.icon,
    required this.label,
    required this.subtitle,
    required this.enabled,
  });

  final String id;
  final String icon;
  final String label;
  final String subtitle;
  final bool enabled;

  NotificationSetting copyWith({bool? enabled}) {
    return NotificationSetting(
      id: id,
      icon: icon,
      label: label,
      subtitle: subtitle,
      enabled: enabled ?? this.enabled,
    );
  }
}
