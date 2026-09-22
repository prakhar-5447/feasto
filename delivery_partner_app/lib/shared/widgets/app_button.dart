import 'package:flutter/material.dart';

import '../../core/theme/app_colors.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.loading = false,
    this.loadingLabel,
    this.enabled = true,
    this.height = 56,
    this.borderRadius = 14,
    this.backgroundColor,
    this.foregroundColor,
    this.disabledBackgroundColor,
    this.disabledForegroundColor,
  });

  final String label;
  final VoidCallback? onPressed;

  final IconData? icon;

  final bool loading;
  final String? loadingLabel;
  final bool enabled;

  final double height;
  final double borderRadius;

  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? disabledBackgroundColor;
  final Color? disabledForegroundColor;

  @override
  Widget build(BuildContext context) {
    final isEnabled = enabled && !loading;

    return SizedBox(
      width: double.infinity,
      height: height,
      child: ElevatedButton(
        onPressed: isEnabled ? onPressed : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor ?? AppColors.primary,
          foregroundColor: foregroundColor ?? AppColors.primaryForeground,

          disabledBackgroundColor: disabledBackgroundColor ?? AppColors.muted,

          disabledForegroundColor:
              disabledForegroundColor ?? AppColors.mutedForeground,

          elevation: 0,

          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadius),
          ),
        ),
        child: loading ? _buildLoadingContent() : _buildContent(),
      ),
    );
  }

  Widget _buildContent() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          label,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),

        if (icon != null) ...[const SizedBox(width: 8), Icon(icon, size: 18)],
      ],
    );
  }

  Widget _buildLoadingContent() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(
          width: 18,
          height: 18,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            valueColor: AlwaysStoppedAnimation<Color>(
              AppColors.primaryForeground,
            ),
          ),
        ),

        const SizedBox(width: 8),

        Text(
          loadingLabel ?? label,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
}
