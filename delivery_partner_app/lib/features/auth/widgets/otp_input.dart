import 'package:flutter/material.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';

class OtpInput extends StatelessWidget {
  const OtpInput({
    super.key,
    required this.controller,
    required this.focusNode,
    required this.hasValue,
    required this.onChanged,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final bool hasValue;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final borderColor = hasValue ? AppColors.primary : AppColors.border;

    return SizedBox(
      height: 58,
      child: TextField(
        controller: controller,
        focusNode: focusNode,
        keyboardType: TextInputType.number,
        textAlign: TextAlign.center,
        maxLength: 1,

        style: const TextStyle(
          color: AppColors.foreground,
          fontSize: 24,
          fontWeight: FontWeight.w700,
        ),

        decoration: InputDecoration(
          counterText: '',
          filled: true,
          fillColor: AppColors.secondary,
          contentPadding: EdgeInsets.zero,

          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: borderColor),
          ),

          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: borderColor),
          ),

          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
          ),
        ),

        onChanged: onChanged,
      ),
    );
  }
}
