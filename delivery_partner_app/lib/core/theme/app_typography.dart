import 'package:flutter/material.dart';

abstract final class AppTypography {
  // Headings
  static const headingLarge = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 28,
    fontWeight: FontWeight.w600,
  );

  static const headingMedium = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: FontWeight.w600,
  );

  static const headingSmall = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: FontWeight.w600,
  );

  // Titles
  static const titleLarge = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );

  static const titleMedium = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: FontWeight.w600,
  );

  // Body
  static const bodyLarge = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: FontWeight.w400,
  );

  static const bodyMedium = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: FontWeight.w400,
  );

  static const bodySmall = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: FontWeight.w400,
  );

  // Labels
  static const labelLarge = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: FontWeight.w500,
  );

  static const labelMedium = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: FontWeight.w500,
  );

  static const labelSmall = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: FontWeight.w500,
  );
}
