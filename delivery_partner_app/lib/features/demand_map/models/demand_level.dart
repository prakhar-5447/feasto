enum DemandLevel { high, medium, low }

extension DemandLevelExtension on DemandLevel {
  String get label {
    switch (this) {
      case DemandLevel.high:
        return 'High';
      case DemandLevel.medium:
        return 'Medium';
      case DemandLevel.low:
        return 'Low';
    }
  }

  String get icon {
    switch (this) {
      case DemandLevel.high:
        return '🔥';
      case DemandLevel.medium:
        return '🟡';
      case DemandLevel.low:
        return '🔵';
    }
  }
}
