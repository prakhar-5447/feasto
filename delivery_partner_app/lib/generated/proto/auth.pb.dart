// This is a generated file - do not edit.
//
// Generated from proto/auth.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class SendLoginOTPRequest extends $pb.GeneratedMessage {
  factory SendLoginOTPRequest({
    $core.String? phone,
  }) {
    final result = SendLoginOTPRequest._();
    if (phone != null) result.phone = phone;
    return result;
  }

  SendLoginOTPRequest._();

  factory SendLoginOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPRequest()..mergeFromBuffer(data, registry);
  factory SendLoginOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'SendLoginOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: SendLoginOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'phone')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPRequest copyWith(void Function(SendLoginOTPRequest) updates) =>
      super.copyWith((message) => updates(message as SendLoginOTPRequest))
          as SendLoginOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use SendLoginOTPRequest() / SendLoginOTPRequest.new instead')
  static SendLoginOTPRequest create() => SendLoginOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() => SendLoginOTPRequest._();
  @$core.override
  SendLoginOTPRequest createEmptyInstance() => SendLoginOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static SendLoginOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<SendLoginOTPRequest>(
          SendLoginOTPRequest.$_createMessage);
  static SendLoginOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get phone => $_getSZ(0);
  @$pb.TagNumber(1)
  set phone($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasPhone() => $_has(0);
  @$pb.TagNumber(1)
  void clearPhone() => $_clearField(1);
}

class SendLoginOTPResponse extends $pb.GeneratedMessage {
  factory SendLoginOTPResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = SendLoginOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  SendLoginOTPResponse._();

  factory SendLoginOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPResponse()..mergeFromBuffer(data, registry);
  factory SendLoginOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      SendLoginOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'SendLoginOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: SendLoginOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  SendLoginOTPResponse copyWith(void Function(SendLoginOTPResponse) updates) =>
      super.copyWith((message) => updates(message as SendLoginOTPResponse))
          as SendLoginOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use SendLoginOTPResponse() / SendLoginOTPResponse.new instead')
  static SendLoginOTPResponse create() => SendLoginOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() => SendLoginOTPResponse._();
  @$core.override
  SendLoginOTPResponse createEmptyInstance() => SendLoginOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static SendLoginOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<SendLoginOTPResponse>(
          SendLoginOTPResponse.$_createMessage);
  static SendLoginOTPResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);
}

class VerifyLoginOTPRequest extends $pb.GeneratedMessage {
  factory VerifyLoginOTPRequest({
    $core.String? phone,
    $core.String? otp,
  }) {
    final result = VerifyLoginOTPRequest._();
    if (phone != null) result.phone = phone;
    if (otp != null) result.otp = otp;
    return result;
  }

  VerifyLoginOTPRequest._();

  factory VerifyLoginOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPRequest()..mergeFromBuffer(data, registry);
  factory VerifyLoginOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyLoginOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: VerifyLoginOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'phone')
    ..aOS(2, _omitFieldNames ? '' : 'otp')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPRequest copyWith(
          void Function(VerifyLoginOTPRequest) updates) =>
      super.copyWith((message) => updates(message as VerifyLoginOTPRequest))
          as VerifyLoginOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyLoginOTPRequest() / VerifyLoginOTPRequest.new instead')
  static VerifyLoginOTPRequest create() => VerifyLoginOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() => VerifyLoginOTPRequest._();
  @$core.override
  VerifyLoginOTPRequest createEmptyInstance() => VerifyLoginOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static VerifyLoginOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyLoginOTPRequest>(
          VerifyLoginOTPRequest.$_createMessage);
  static VerifyLoginOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get phone => $_getSZ(0);
  @$pb.TagNumber(1)
  set phone($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasPhone() => $_has(0);
  @$pb.TagNumber(1)
  void clearPhone() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get otp => $_getSZ(1);
  @$pb.TagNumber(2)
  set otp($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasOtp() => $_has(1);
  @$pb.TagNumber(2)
  void clearOtp() => $_clearField(2);
}

class VerifyLoginOTPResponse extends $pb.GeneratedMessage {
  factory VerifyLoginOTPResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? accessToken,
    $core.String? refreshToken,
  }) {
    final result = VerifyLoginOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (accessToken != null) result.accessToken = accessToken;
    if (refreshToken != null) result.refreshToken = refreshToken;
    return result;
  }

  VerifyLoginOTPResponse._();

  factory VerifyLoginOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPResponse()..mergeFromBuffer(data, registry);
  factory VerifyLoginOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyLoginOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyLoginOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'auth'),
      createEmptyInstance: VerifyLoginOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'accessToken')
    ..aOS(4, _omitFieldNames ? '' : 'refreshToken')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyLoginOTPResponse copyWith(
          void Function(VerifyLoginOTPResponse) updates) =>
      super.copyWith((message) => updates(message as VerifyLoginOTPResponse))
          as VerifyLoginOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyLoginOTPResponse() / VerifyLoginOTPResponse.new instead')
  static VerifyLoginOTPResponse create() => VerifyLoginOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() => VerifyLoginOTPResponse._();
  @$core.override
  VerifyLoginOTPResponse createEmptyInstance() => VerifyLoginOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static VerifyLoginOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyLoginOTPResponse>(
          VerifyLoginOTPResponse.$_createMessage);
  static VerifyLoginOTPResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.String get accessToken => $_getSZ(2);
  @$pb.TagNumber(3)
  set accessToken($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasAccessToken() => $_has(2);
  @$pb.TagNumber(3)
  void clearAccessToken() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get refreshToken => $_getSZ(3);
  @$pb.TagNumber(4)
  set refreshToken($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasRefreshToken() => $_has(3);
  @$pb.TagNumber(4)
  void clearRefreshToken() => $_clearField(4);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
