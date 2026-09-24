enum MapType { standard, satellite }

class AppSettings {
  const AppSettings({
    this.darkMode = true,
    this.compactView = false,
    this.locationAlways = true,
    this.dataSync = true,
    this.analytics = false,
    this.haptics = true,
    this.soundFx = true,
    this.autoAccept = false,
    this.mapType = MapType.standard,
  });

  final bool darkMode;
  final bool compactView;
  final bool locationAlways;
  final bool dataSync;
  final bool analytics;
  final bool haptics;
  final bool soundFx;
  final bool autoAccept;
  final MapType mapType;

  AppSettings copyWith({
    bool? darkMode,
    bool? compactView,
    bool? locationAlways,
    bool? dataSync,
    bool? analytics,
    bool? haptics,
    bool? soundFx,
    bool? autoAccept,
    MapType? mapType,
  }) {
    return AppSettings(
      darkMode: darkMode ?? this.darkMode,
      compactView: compactView ?? this.compactView,
      locationAlways: locationAlways ?? this.locationAlways,
      dataSync: dataSync ?? this.dataSync,
      analytics: analytics ?? this.analytics,
      haptics: haptics ?? this.haptics,
      soundFx: soundFx ?? this.soundFx,
      autoAccept: autoAccept ?? this.autoAccept,
      mapType: mapType ?? this.mapType,
    );
  }
}
