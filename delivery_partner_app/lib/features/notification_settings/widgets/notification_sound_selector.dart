import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

import 'package:delivery_partner_app/features/notification_settings/models/notification_sound.dart';

class NotificationSoundSelector extends StatelessWidget {
  const NotificationSoundSelector({
    super.key,
    required this.selected,
    required this.onChanged,
  });

  final NotificationSound selected;
  final ValueChanged<NotificationSound> onChanged;

  static const options = [
    (sound: NotificationSound.loud, label: 'Loud', icon: '🔔'),
    (sound: NotificationSound.defaultSound, label: 'Default', icon: '🔕'),
    (sound: NotificationSound.silent, label: 'Silent', icon: '🔇'),
  ];

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        for (int i = 0; i < options.length; i++) ...[
          Expanded(
            child: _SoundOption(
              label: options[i].label,
              icon: options[i].icon,
              selected: selected == options[i].sound,
              onTap: () => onChanged(options[i].sound),
            ),
          ),
          if (i < options.length - 1) const SizedBox(width: AppSpacing.sm),
        ],
      ],
    );
  }
}

class _SoundOption extends StatelessWidget {
  const _SoundOption({
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final String icon;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.xl),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primary.withValues(alpha: 0.08)
              : AppColors.card,
          borderRadius: BorderRadius.circular(AppRadius.xl),
          border: Border.all(
            color: selected
                ? AppColors.primary.withValues(alpha: 0.35)
                : AppColors.border,
            width: selected ? 1.5 : 1,
          ),
        ),
        child: Column(
          children: [
            Text(icon, style: const TextStyle(fontSize: 20)),
            const SizedBox(height: 6),
            Text(
              label,
              style: AppTypography.labelMedium.copyWith(
                color: selected ? AppColors.primary : AppColors.mutedForeground,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
