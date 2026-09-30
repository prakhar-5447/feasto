// This is a generated file - do not edit.
//
// Generated from proto/delivery.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:grpc/service_api.dart' as $grpc;
import 'package:protobuf/protobuf.dart' as $pb;

import 'delivery.pb.dart' as $0;

export 'delivery.pb.dart';

@$pb.GrpcServiceName('delivery.DeliveryService')
class DeliveryServiceClient extends $grpc.Client {
  /// The hostname for this service.
  static const $core.String defaultHost = '';

  /// OAuth scopes needed for the client.
  static const $core.List<$core.String> oauthScopes = [
    '',
  ];

  DeliveryServiceClient(super.channel, {super.options, super.interceptors});

  $grpc.ResponseFuture<$0.GetAvailableOrdersResponse> getAvailableOrders(
    $0.GetAvailableOrdersRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$getAvailableOrders, request, options: options);
  }

  $grpc.ResponseFuture<$0.AcceptOrderResponse> acceptOrder(
    $0.AcceptOrderRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$acceptOrder, request, options: options);
  }

  $grpc.ResponseFuture<$0.RejectOrderResponse> rejectOrder(
    $0.RejectOrderRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$rejectOrder, request, options: options);
  }

  $grpc.ResponseFuture<$0.PickupOrderResponse> pickupOrder(
    $0.PickupOrderRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$pickupOrder, request, options: options);
  }

  $grpc.ResponseFuture<$0.RequestDeliveryOTPResponse> requestDeliveryOTP(
    $0.RequestDeliveryOTPRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$requestDeliveryOTP, request, options: options);
  }

  $grpc.ResponseFuture<$0.VerifyDeliveryOTPResponse> verifyDeliveryOTP(
    $0.VerifyDeliveryOTPRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$verifyDeliveryOTP, request, options: options);
  }

  $grpc.ResponseFuture<$0.GetCurrentOrderResponse> getCurrentOrder(
    $0.GetCurrentOrderRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$getCurrentOrder, request, options: options);
  }

  $grpc.ResponseFuture<$0.GetDeliveryHistoryResponse> getDeliveryHistory(
    $0.GetDeliveryHistoryRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$getDeliveryHistory, request, options: options);
  }

  // method descriptors

  static final _$getAvailableOrders = $grpc.ClientMethod<
          $0.GetAvailableOrdersRequest, $0.GetAvailableOrdersResponse>(
      '/delivery.DeliveryService/GetAvailableOrders',
      ($0.GetAvailableOrdersRequest value) => value.writeToBuffer(),
      $0.GetAvailableOrdersResponse.fromBuffer);
  static final _$acceptOrder =
      $grpc.ClientMethod<$0.AcceptOrderRequest, $0.AcceptOrderResponse>(
          '/delivery.DeliveryService/AcceptOrder',
          ($0.AcceptOrderRequest value) => value.writeToBuffer(),
          $0.AcceptOrderResponse.fromBuffer);
  static final _$rejectOrder =
      $grpc.ClientMethod<$0.RejectOrderRequest, $0.RejectOrderResponse>(
          '/delivery.DeliveryService/RejectOrder',
          ($0.RejectOrderRequest value) => value.writeToBuffer(),
          $0.RejectOrderResponse.fromBuffer);
  static final _$pickupOrder =
      $grpc.ClientMethod<$0.PickupOrderRequest, $0.PickupOrderResponse>(
          '/delivery.DeliveryService/PickupOrder',
          ($0.PickupOrderRequest value) => value.writeToBuffer(),
          $0.PickupOrderResponse.fromBuffer);
  static final _$requestDeliveryOTP = $grpc.ClientMethod<
          $0.RequestDeliveryOTPRequest, $0.RequestDeliveryOTPResponse>(
      '/delivery.DeliveryService/RequestDeliveryOTP',
      ($0.RequestDeliveryOTPRequest value) => value.writeToBuffer(),
      $0.RequestDeliveryOTPResponse.fromBuffer);
  static final _$verifyDeliveryOTP = $grpc.ClientMethod<
          $0.VerifyDeliveryOTPRequest, $0.VerifyDeliveryOTPResponse>(
      '/delivery.DeliveryService/VerifyDeliveryOTP',
      ($0.VerifyDeliveryOTPRequest value) => value.writeToBuffer(),
      $0.VerifyDeliveryOTPResponse.fromBuffer);
  static final _$getCurrentOrder =
      $grpc.ClientMethod<$0.GetCurrentOrderRequest, $0.GetCurrentOrderResponse>(
          '/delivery.DeliveryService/GetCurrentOrder',
          ($0.GetCurrentOrderRequest value) => value.writeToBuffer(),
          $0.GetCurrentOrderResponse.fromBuffer);
  static final _$getDeliveryHistory = $grpc.ClientMethod<
          $0.GetDeliveryHistoryRequest, $0.GetDeliveryHistoryResponse>(
      '/delivery.DeliveryService/GetDeliveryHistory',
      ($0.GetDeliveryHistoryRequest value) => value.writeToBuffer(),
      $0.GetDeliveryHistoryResponse.fromBuffer);
}

@$pb.GrpcServiceName('delivery.DeliveryService')
abstract class DeliveryServiceBase extends $grpc.Service {
  $core.String get $name => 'delivery.DeliveryService';

  DeliveryServiceBase() {
    $addMethod($grpc.ServiceMethod<$0.GetAvailableOrdersRequest,
            $0.GetAvailableOrdersResponse>(
        'GetAvailableOrders',
        getAvailableOrders_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.GetAvailableOrdersRequest.fromBuffer(value),
        ($0.GetAvailableOrdersResponse value) => value.writeToBuffer()));
    $addMethod(
        $grpc.ServiceMethod<$0.AcceptOrderRequest, $0.AcceptOrderResponse>(
            'AcceptOrder',
            acceptOrder_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.AcceptOrderRequest.fromBuffer(value),
            ($0.AcceptOrderResponse value) => value.writeToBuffer()));
    $addMethod(
        $grpc.ServiceMethod<$0.RejectOrderRequest, $0.RejectOrderResponse>(
            'RejectOrder',
            rejectOrder_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.RejectOrderRequest.fromBuffer(value),
            ($0.RejectOrderResponse value) => value.writeToBuffer()));
    $addMethod(
        $grpc.ServiceMethod<$0.PickupOrderRequest, $0.PickupOrderResponse>(
            'PickupOrder',
            pickupOrder_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.PickupOrderRequest.fromBuffer(value),
            ($0.PickupOrderResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.RequestDeliveryOTPRequest,
            $0.RequestDeliveryOTPResponse>(
        'RequestDeliveryOTP',
        requestDeliveryOTP_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.RequestDeliveryOTPRequest.fromBuffer(value),
        ($0.RequestDeliveryOTPResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.VerifyDeliveryOTPRequest,
            $0.VerifyDeliveryOTPResponse>(
        'VerifyDeliveryOTP',
        verifyDeliveryOTP_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.VerifyDeliveryOTPRequest.fromBuffer(value),
        ($0.VerifyDeliveryOTPResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.GetCurrentOrderRequest,
            $0.GetCurrentOrderResponse>(
        'GetCurrentOrder',
        getCurrentOrder_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.GetCurrentOrderRequest.fromBuffer(value),
        ($0.GetCurrentOrderResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.GetDeliveryHistoryRequest,
            $0.GetDeliveryHistoryResponse>(
        'GetDeliveryHistory',
        getDeliveryHistory_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.GetDeliveryHistoryRequest.fromBuffer(value),
        ($0.GetDeliveryHistoryResponse value) => value.writeToBuffer()));
  }

  $async.Future<$0.GetAvailableOrdersResponse> getAvailableOrders_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.GetAvailableOrdersRequest> $request) async {
    return getAvailableOrders($call, await $request);
  }

  $async.Future<$0.GetAvailableOrdersResponse> getAvailableOrders(
      $grpc.ServiceCall call, $0.GetAvailableOrdersRequest request);

  $async.Future<$0.AcceptOrderResponse> acceptOrder_Pre($grpc.ServiceCall $call,
      $async.Future<$0.AcceptOrderRequest> $request) async {
    return acceptOrder($call, await $request);
  }

  $async.Future<$0.AcceptOrderResponse> acceptOrder(
      $grpc.ServiceCall call, $0.AcceptOrderRequest request);

  $async.Future<$0.RejectOrderResponse> rejectOrder_Pre($grpc.ServiceCall $call,
      $async.Future<$0.RejectOrderRequest> $request) async {
    return rejectOrder($call, await $request);
  }

  $async.Future<$0.RejectOrderResponse> rejectOrder(
      $grpc.ServiceCall call, $0.RejectOrderRequest request);

  $async.Future<$0.PickupOrderResponse> pickupOrder_Pre($grpc.ServiceCall $call,
      $async.Future<$0.PickupOrderRequest> $request) async {
    return pickupOrder($call, await $request);
  }

  $async.Future<$0.PickupOrderResponse> pickupOrder(
      $grpc.ServiceCall call, $0.PickupOrderRequest request);

  $async.Future<$0.RequestDeliveryOTPResponse> requestDeliveryOTP_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.RequestDeliveryOTPRequest> $request) async {
    return requestDeliveryOTP($call, await $request);
  }

  $async.Future<$0.RequestDeliveryOTPResponse> requestDeliveryOTP(
      $grpc.ServiceCall call, $0.RequestDeliveryOTPRequest request);

  $async.Future<$0.VerifyDeliveryOTPResponse> verifyDeliveryOTP_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.VerifyDeliveryOTPRequest> $request) async {
    return verifyDeliveryOTP($call, await $request);
  }

  $async.Future<$0.VerifyDeliveryOTPResponse> verifyDeliveryOTP(
      $grpc.ServiceCall call, $0.VerifyDeliveryOTPRequest request);

  $async.Future<$0.GetCurrentOrderResponse> getCurrentOrder_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.GetCurrentOrderRequest> $request) async {
    return getCurrentOrder($call, await $request);
  }

  $async.Future<$0.GetCurrentOrderResponse> getCurrentOrder(
      $grpc.ServiceCall call, $0.GetCurrentOrderRequest request);

  $async.Future<$0.GetDeliveryHistoryResponse> getDeliveryHistory_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.GetDeliveryHistoryRequest> $request) async {
    return getDeliveryHistory($call, await $request);
  }

  $async.Future<$0.GetDeliveryHistoryResponse> getDeliveryHistory(
      $grpc.ServiceCall call, $0.GetDeliveryHistoryRequest request);
}
