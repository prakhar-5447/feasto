import 'package:delivery_partner_app/core/theme/app_typography.dart';
import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppTheme {
  // static ThemeData light = ThemeData(
  //   useMaterial3: true,

  //   fontFamily: 'Poppins',

  //   colorScheme: ColorScheme.fromSeed(
  //     seedColor: AppColors.primary,
  //     primary: AppColors.primary,
  //     surface: AppColors.surface,
  //   ),

  //   scaffoldBackgroundColor: AppColors.background,

  //   textTheme: TextTheme(
  //     headlineLarge: AppTypography.headingLarge.copyWith(
  //       color: AppColors.textPrimary,
  //     ),

  //     headlineMedium: AppTypography.headingMedium.copyWith(
  //       color: AppColors.textPrimary,
  //     ),

  //     titleLarge: AppTypography.title.copyWith(color: AppColors.textPrimary),

  //     bodyLarge: AppTypography.body.copyWith(color: AppColors.textPrimary),

  //     bodyMedium: AppTypography.bodyMedium.copyWith(
  //       color: AppColors.textSecondary,
  //     ),

  //     bodySmall: AppTypography.caption.copyWith(color: AppColors.textSecondary),
  //   ),
  // );

  static ThemeData dark = ThemeData(
    useMaterial3: true,

    brightness: Brightness.dark,

    fontFamily: 'Poppins',

    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.dark,
      primary: AppColors.primary,
      surface: AppColors.surface,
    ),

    scaffoldBackgroundColor: AppColors.background,

    textTheme: TextTheme(
      // Headings
      headlineLarge: AppTypography.headingLarge.copyWith(
        color: AppColors.textPrimary,
      ),

      headlineMedium: AppTypography.headingMedium.copyWith(
        color: AppColors.textPrimary,
      ),

      headlineSmall: AppTypography.headingSmall.copyWith(
        color: AppColors.textPrimary,
      ),

      // Titles
      titleLarge: AppTypography.titleLarge.copyWith(
        color: AppColors.textPrimary,
      ),

      titleMedium: AppTypography.titleMedium.copyWith(
        color: AppColors.textPrimary,
      ),

      // Body
      bodyLarge: AppTypography.bodyLarge.copyWith(color: AppColors.textPrimary),

      bodyMedium: AppTypography.bodyMedium.copyWith(
        color: AppColors.textSecondary,
      ),

      bodySmall: AppTypography.bodySmall.copyWith(color: AppColors.textMuted),

      // Labels
      labelLarge: AppTypography.labelLarge.copyWith(
        color: AppColors.textPrimary,
      ),

      labelMedium: AppTypography.labelMedium.copyWith(
        color: AppColors.textSecondary,
      ),

      labelSmall: AppTypography.labelSmall.copyWith(color: AppColors.textMuted),
    ),
  );
}
