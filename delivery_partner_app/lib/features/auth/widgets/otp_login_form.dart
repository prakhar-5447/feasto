import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../shared/widgets/app_button.dart';
import 'otp_input.dart';

class OtpLoginForm extends StatelessWidget {
  const OtpLoginForm({
    super.key,
    required this.phone,
    required this.otp,
    required this.otpControllers,
    required this.otpFocusNodes,
    required this.resendTimer,
    required this.loading,
    required this.onOtpChanged,
    required this.onVerify,
    required this.onResend,
    required this.onBack,
  });

  final String phone;

  final List<String> otp;

  final List<TextEditingController> otpControllers;

  final List<FocusNode> otpFocusNodes;

  final int resendTimer;

  final bool loading;

  final void Function(int index, String value) onOtpChanged;

  final VoidCallback onVerify;
  final VoidCallback onResend;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    final otpComplete = otp.every((digit) => digit.isNotEmpty);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextButton.icon(
          onPressed: loading ? null : onBack,
          style: TextButton.styleFrom(
            padding: EdgeInsets.zero,
            foregroundColor: AppColors.mutedForeground,
          ),
          icon: const Icon(Icons.arrow_back_rounded, size: 18),
          label: const Text('Back'),
        ),

        const SizedBox(height: 16),

        Text('Enter OTP', style: Theme.of(context).textTheme.headlineSmall),

        const SizedBox(height: 4),

        RichText(
          text: TextSpan(
            style: Theme.of(context).textTheme.bodyMedium
                ?.copyWith(color: AppColors.mutedForeground),
            children: [
              const TextSpan(text: 'Sent to '),
              TextSpan(
                text: '+91 $phone',
                style: const TextStyle(
                  color: AppColors.foreground,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 32),

        _buildOtpInputs(),

        const SizedBox(height: 24),

        _buildResendButton(),

        const SizedBox(height: 24),

        AppButton(
          label: 'Verify & Login',
          loadingLabel: 'Verifying...',
          icon: Icons.arrow_forward_rounded,
          loading: loading,
          enabled: otpComplete,
          onPressed: onVerify,
        ),
      ],
    );
  }

  Widget _buildOtpInputs() {
    return Row(
      children: List.generate(6, (index) {
        return Expanded(
          child: Padding(
            padding: EdgeInsets.only(right: index == 5 ? 0 : 8),
            child: OtpInput(
              controller: otpControllers[index],
              focusNode: otpFocusNodes[index],
              hasValue: otp[index].isNotEmpty,
              onChanged: (value) {
                onOtpChanged(index, value);
              },
            ),
          ),
        );
      }),
    );
  }

  Widget _buildResendButton() {
    return TextButton(
      onPressed: resendTimer > 0 ? null : onResend,
      style: TextButton.styleFrom(
        padding: EdgeInsets.zero,
        foregroundColor: resendTimer > 0
            ? AppColors.mutedForeground
            : AppColors.primary,
      ),
      child: resendTimer > 0
          ? Text('Resend OTP in ${resendTimer}s')
          : const Text('Resend OTP'),
    );
  }
}
