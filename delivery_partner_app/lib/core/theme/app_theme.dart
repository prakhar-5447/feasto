import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppTheme {
  static ThemeData light = ThemeData(
    useMaterial3: true,

    fontFamily: 'Poppins',

    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      primary: AppColors.primary,
      surface: AppColors.surface,
    ),

    scaffoldBackgroundColor: AppColors.background,

    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 28,
        fontWeight: FontWeight.w600,
        color: AppColors.textPrimary,
      ),

      headlineMedium: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: AppColors.textPrimary,
      ),

      titleLarge: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: AppColors.textPrimary,
      ),

      bodyLarge: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 16,
        color: AppColors.textPrimary,
      ),

      bodyMedium: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 14,
        color: AppColors.textSecondary,
      ),

      bodySmall: TextStyle(
        fontFamily: 'Poppins',
        fontSize: 12,
        color: AppColors.textSecondary,
      ),
    ),
  );
}
