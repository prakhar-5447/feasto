import 'package:grpc/grpc.dart';

import '../config/app_config.dart';

class GrpcClient {
  GrpcClient._();

  static final GrpcClient instance = GrpcClient._();

  ClientChannel? _channel;

  ClientChannel get channel {
    _channel ??= ClientChannel(
      AppConfig.backendHost,
      port: AppConfig.backendPort,
      options: const ChannelOptions(credentials: ChannelCredentials.insecure()),
    );

    return _channel!;
  }

  Future<void> close() async {
    await _channel?.shutdown();
    _channel = null;
  }
}
