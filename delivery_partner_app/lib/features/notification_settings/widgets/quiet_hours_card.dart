import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/core/theme/app_radius.dart';
import 'package:delivery_partner_app/core/theme/app_spacing.dart';
import 'package:delivery_partner_app/core/theme/app_typography.dart';

class QuietHoursCard extends StatelessWidget {
  const QuietHoursCard({
    super.key,
    required this.enabled,
    required this.start,
    required this.end,
    required this.onToggle,
    required this.onStartChanged,
    required this.onEndChanged,
  });

  final bool enabled;
  final String start;
  final String end;
  final VoidCallback onToggle;
  final ValueChanged<String> onStartChanged;
  final ValueChanged<String> onEndChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: 14,
            ),
            child: Row(
              children: [
                Container(
                  width: 36,
                  height: 36,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.secondary,
                    borderRadius: BorderRadius.circular(AppRadius.md),
                  ),
                  child: const Text('🌙', style: TextStyle(fontSize: 16)),
                ),

                const SizedBox(width: AppSpacing.md),

                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Enable Quiet Hours',
                        style: AppTypography.bodyMedium.copyWith(
                          color: AppColors.foreground,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Mute non-critical alerts during set hours',
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ),

                _Toggle(enabled: enabled, onTap: onToggle),
              ],
            ),
          ),

          if (enabled) ...[
            const Divider(
              height: 1,
              indent: 16,
              endIndent: 16,
              color: AppColors.border,
            ),

            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Expanded(
                    child: _TimeField(
                      label: 'From',
                      value: start,
                      onChanged: onStartChanged,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: _TimeField(
                      label: 'Until',
                      value: end,
                      onChanged: onEndChanged,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _TimeField extends StatelessWidget {
  const _TimeField({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTypography.bodySmall.copyWith(
            color: AppColors.mutedForeground,
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        InkWell(
          onTap: () async {
            final parts = value.split(':');

            final initialTime = TimeOfDay(
              hour: int.tryParse(parts.first) ?? 22,
              minute: int.tryParse(parts.last) ?? 0,
            );

            final selectedTime = await showTimePicker(
              context: context,
              initialTime: initialTime,
            );

            if (selectedTime == null) {
              return;
            }

            final formatted =
                '${selectedTime.hour.toString().padLeft(2, '0')}:'
                '${selectedTime.minute.toString().padLeft(2, '0')}';

            onChanged(formatted);
          },
          borderRadius: BorderRadius.circular(AppRadius.md),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: 12,
            ),
            decoration: BoxDecoration(
              color: AppColors.secondary,
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: AppColors.border),
            ),
            child: Text(
              value,
              style: AppTypography.titleMedium.copyWith(
                color: AppColors.foreground,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _Toggle extends StatelessWidget {
  const _Toggle({required this.enabled, required this.onTap});

  final bool enabled;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        width: 44,
        height: 24,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: enabled ? AppColors.primary : AppColors.muted,
          borderRadius: BorderRadius.circular(AppRadius.pill),
        ),
        child: AnimatedAlign(
          duration: const Duration(milliseconds: 180),
          alignment: enabled ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 20,
            height: 20,
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
            ),
          ),
        ),
      ),
    );
  }
}
