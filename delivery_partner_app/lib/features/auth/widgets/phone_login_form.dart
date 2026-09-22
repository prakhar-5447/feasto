import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../shared/widgets/app_button.dart';

class PhoneLoginForm extends StatelessWidget {
  const PhoneLoginForm({
    super.key,
    required this.phoneController,
    required this.phoneError,
    required this.loading,
    required this.onPhoneChanged,
    required this.onSendOtp,
  });

  final TextEditingController phoneController;
  final String phoneError;

  final bool loading;

  final ValueChanged<String> onPhoneChanged;
  final VoidCallback onSendOtp;

  @override
  Widget build(BuildContext context) {
    final phoneValid = phoneController.text.length == 10;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Welcome back, rider',
          style: Theme.of(context).textTheme.titleLarge,
        ),

        const SizedBox(height: 4),

        Text(
          'Enter your registered mobile number to continue',
          style: Theme.of(context).textTheme.bodyMedium
              ?.copyWith(color: AppColors.mutedForeground),
        ),

        const SizedBox(height: 32),

        Text(
          'MOBILE NUMBER',
          style: Theme.of(context).textTheme.labelSmall?.copyWith(
            color: AppColors.mutedForeground,
            letterSpacing: 1.2,
            fontWeight: FontWeight.w600,
          ),
        ),

        const SizedBox(height: 8),

        _buildPhoneInput(),

        if (phoneError.isNotEmpty) ...[
          const SizedBox(height: 6),

          Text(
            phoneError,
            style: const TextStyle(color: AppColors.danger, fontSize: 12),
          ),
        ],

        const SizedBox(height: 28),

        Text(
          "We'll send a 6-digit OTP to verify your identity",
          style: Theme.of(context).textTheme.bodySmall
              ?.copyWith(color: AppColors.mutedForeground),
        ),

        const SizedBox(height: 28),

        AppButton(
          label: 'Get OTP',
          loadingLabel: 'Sending OTP...',
          icon: Icons.arrow_forward_rounded,
          loading: loading,
          enabled: phoneValid,
          onPressed: onSendOtp,
        ),

        const SizedBox(height: 24),

        _buildInfoMessage(context),
      ],
    );
  }

  Widget _buildPhoneInput() {
    return Container(
      height: 58,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: phoneError.isNotEmpty ? AppColors.danger : AppColors.border,
        ),
      ),
      child: Row(
        children: [
          const Text('🇮🇳', style: TextStyle(fontSize: 18)),

          const SizedBox(width: 8),

          const Text(
            '+91',
            style: TextStyle(
              color: AppColors.foreground,
              fontWeight: FontWeight.w600,
            ),
          ),

          const SizedBox(width: 12),

          Container(width: 1, height: 26, color: AppColors.border),

          const SizedBox(width: 12),

          Expanded(
            child: TextField(
              controller: phoneController,
              keyboardType: TextInputType.phone,
              maxLength: 10,
              style: const TextStyle(color: AppColors.foreground, fontSize: 16),
              decoration: const InputDecoration(
                hintText: '98765 43210',
                hintStyle: TextStyle(color: AppColors.mutedForeground),
                border: InputBorder.none,
                counterText: '',
              ),
              onChanged: onPhoneChanged,
              onSubmitted: (_) => onSendOtp(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoMessage(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.muted,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.info_outline_rounded,
            size: 16,
            color: AppColors.mutedForeground,
          ),

          const SizedBox(width: 8),

          Expanded(
            child: Text(
              'Only registered delivery partners can log in. '
              'Contact support if you need assistance.',
              style: Theme.of(context).textTheme.bodySmall
                  ?.copyWith(color: AppColors.mutedForeground),
            ),
          ),
        ],
      ),
    );
  }
}
