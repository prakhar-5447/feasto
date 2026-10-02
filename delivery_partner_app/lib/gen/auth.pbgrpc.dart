// This is a generated file - do not edit.
//
// Generated from auth.proto.

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

import 'auth.pb.dart' as $0;

export 'auth.pb.dart';

@$pb.GrpcServiceName('auth.AuthService')
class AuthServiceClient extends $grpc.Client {
  /// The hostname for this service.
  static const $core.String defaultHost = '';

  /// OAuth scopes needed for the client.
  static const $core.List<$core.String> oauthScopes = [
    '',
  ];

  AuthServiceClient(super.channel, {super.options, super.interceptors});

  $grpc.ResponseFuture<$0.SendLoginOTPResponse> sendLoginOTP(
    $0.SendLoginOTPRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$sendLoginOTP, request, options: options);
  }

  $grpc.ResponseFuture<$0.VerifyLoginOTPResponse> verifyLoginOTP(
    $0.VerifyLoginOTPRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$verifyLoginOTP, request, options: options);
  }

  $grpc.ResponseFuture<$0.CompleteProfileResponse> completeProfile(
    $0.CompleteProfileRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$completeProfile, request, options: options);
  }

  $grpc.ResponseFuture<$0.GetProfileResponse> getProfile(
    $0.GetProfileRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$getProfile, request, options: options);
  }

  $grpc.ResponseFuture<$0.RefreshTokenResponse> refreshToken(
    $0.RefreshTokenRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$refreshToken, request, options: options);
  }

  // method descriptors

  static final _$sendLoginOTP =
      $grpc.ClientMethod<$0.SendLoginOTPRequest, $0.SendLoginOTPResponse>(
          '/auth.AuthService/SendLoginOTP',
          ($0.SendLoginOTPRequest value) => value.writeToBuffer(),
          $0.SendLoginOTPResponse.fromBuffer);
  static final _$verifyLoginOTP =
      $grpc.ClientMethod<$0.VerifyLoginOTPRequest, $0.VerifyLoginOTPResponse>(
          '/auth.AuthService/VerifyLoginOTP',
          ($0.VerifyLoginOTPRequest value) => value.writeToBuffer(),
          $0.VerifyLoginOTPResponse.fromBuffer);
  static final _$completeProfile =
      $grpc.ClientMethod<$0.CompleteProfileRequest, $0.CompleteProfileResponse>(
          '/auth.AuthService/CompleteProfile',
          ($0.CompleteProfileRequest value) => value.writeToBuffer(),
          $0.CompleteProfileResponse.fromBuffer);
  static final _$getProfile =
      $grpc.ClientMethod<$0.GetProfileRequest, $0.GetProfileResponse>(
          '/auth.AuthService/GetProfile',
          ($0.GetProfileRequest value) => value.writeToBuffer(),
          $0.GetProfileResponse.fromBuffer);
  static final _$refreshToken =
      $grpc.ClientMethod<$0.RefreshTokenRequest, $0.RefreshTokenResponse>(
          '/auth.AuthService/RefreshToken',
          ($0.RefreshTokenRequest value) => value.writeToBuffer(),
          $0.RefreshTokenResponse.fromBuffer);
}

@$pb.GrpcServiceName('auth.AuthService')
abstract class AuthServiceBase extends $grpc.Service {
  $core.String get $name => 'auth.AuthService';

  AuthServiceBase() {
    $addMethod(
        $grpc.ServiceMethod<$0.SendLoginOTPRequest, $0.SendLoginOTPResponse>(
            'SendLoginOTP',
            sendLoginOTP_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.SendLoginOTPRequest.fromBuffer(value),
            ($0.SendLoginOTPResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.VerifyLoginOTPRequest,
            $0.VerifyLoginOTPResponse>(
        'VerifyLoginOTP',
        verifyLoginOTP_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.VerifyLoginOTPRequest.fromBuffer(value),
        ($0.VerifyLoginOTPResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.CompleteProfileRequest,
            $0.CompleteProfileResponse>(
        'CompleteProfile',
        completeProfile_Pre,
        false,
        false,
        ($core.List<$core.int> value) =>
            $0.CompleteProfileRequest.fromBuffer(value),
        ($0.CompleteProfileResponse value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.GetProfileRequest, $0.GetProfileResponse>(
        'GetProfile',
        getProfile_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.GetProfileRequest.fromBuffer(value),
        ($0.GetProfileResponse value) => value.writeToBuffer()));
    $addMethod(
        $grpc.ServiceMethod<$0.RefreshTokenRequest, $0.RefreshTokenResponse>(
            'RefreshToken',
            refreshToken_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.RefreshTokenRequest.fromBuffer(value),
            ($0.RefreshTokenResponse value) => value.writeToBuffer()));
  }

  $async.Future<$0.SendLoginOTPResponse> sendLoginOTP_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.SendLoginOTPRequest> $request) async {
    return sendLoginOTP($call, await $request);
  }

  $async.Future<$0.SendLoginOTPResponse> sendLoginOTP(
      $grpc.ServiceCall call, $0.SendLoginOTPRequest request);

  $async.Future<$0.VerifyLoginOTPResponse> verifyLoginOTP_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.VerifyLoginOTPRequest> $request) async {
    return verifyLoginOTP($call, await $request);
  }

  $async.Future<$0.VerifyLoginOTPResponse> verifyLoginOTP(
      $grpc.ServiceCall call, $0.VerifyLoginOTPRequest request);

  $async.Future<$0.CompleteProfileResponse> completeProfile_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.CompleteProfileRequest> $request) async {
    return completeProfile($call, await $request);
  }

  $async.Future<$0.CompleteProfileResponse> completeProfile(
      $grpc.ServiceCall call, $0.CompleteProfileRequest request);

  $async.Future<$0.GetProfileResponse> getProfile_Pre($grpc.ServiceCall $call,
      $async.Future<$0.GetProfileRequest> $request) async {
    return getProfile($call, await $request);
  }

  $async.Future<$0.GetProfileResponse> getProfile(
      $grpc.ServiceCall call, $0.GetProfileRequest request);

  $async.Future<$0.RefreshTokenResponse> refreshToken_Pre(
      $grpc.ServiceCall $call,
      $async.Future<$0.RefreshTokenRequest> $request) async {
    return refreshToken($call, await $request);
  }

  $async.Future<$0.RefreshTokenResponse> refreshToken(
      $grpc.ServiceCall call, $0.RefreshTokenRequest request);
}
