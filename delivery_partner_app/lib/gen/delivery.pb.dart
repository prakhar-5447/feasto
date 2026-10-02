// This is a generated file - do not edit.
//
// Generated from delivery.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class GetUpcomingOrderRequest extends $pb.GeneratedMessage {
  factory GetUpcomingOrderRequest() => GetUpcomingOrderRequest._();

  GetUpcomingOrderRequest._();

  factory GetUpcomingOrderRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetUpcomingOrderRequest()..mergeFromBuffer(data, registry);
  factory GetUpcomingOrderRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetUpcomingOrderRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetUpcomingOrderRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetUpcomingOrderRequest.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetUpcomingOrderRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetUpcomingOrderRequest copyWith(
          void Function(GetUpcomingOrderRequest) updates) =>
      super.copyWith((message) => updates(message as GetUpcomingOrderRequest))
          as GetUpcomingOrderRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetUpcomingOrderRequest() / GetUpcomingOrderRequest.new instead')
  static GetUpcomingOrderRequest create() => GetUpcomingOrderRequest._();
  static $pb.GeneratedMessage $_createMessage() => GetUpcomingOrderRequest._();
  @$core.override
  GetUpcomingOrderRequest createEmptyInstance() => GetUpcomingOrderRequest._();
  @$core.pragma('dart2js:noInline')
  static GetUpcomingOrderRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetUpcomingOrderRequest>(
          GetUpcomingOrderRequest.$_createMessage);
  static GetUpcomingOrderRequest? _defaultInstance;
}

class GetUpcomingOrderResponse extends $pb.GeneratedMessage {
  factory GetUpcomingOrderResponse({
    $core.bool? success,
    $core.String? message,
    $core.bool? hasOrder,
    $core.String? orderId,
    $core.String? restaurant,
    $core.String? restaurantArea,
    $core.String? pickupDistance,
    $core.String? customerName,
    $core.String? deliveryArea,
    $core.String? deliveryDistance,
    $core.String? totalDistance,
    $core.String? earnings,
    $core.int? items,
    $core.String? eta,
  }) {
    final result = GetUpcomingOrderResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (hasOrder != null) result.hasOrder = hasOrder;
    if (orderId != null) result.orderId = orderId;
    if (restaurant != null) result.restaurant = restaurant;
    if (restaurantArea != null) result.restaurantArea = restaurantArea;
    if (pickupDistance != null) result.pickupDistance = pickupDistance;
    if (customerName != null) result.customerName = customerName;
    if (deliveryArea != null) result.deliveryArea = deliveryArea;
    if (deliveryDistance != null) result.deliveryDistance = deliveryDistance;
    if (totalDistance != null) result.totalDistance = totalDistance;
    if (earnings != null) result.earnings = earnings;
    if (items != null) result.items = items;
    if (eta != null) result.eta = eta;
    return result;
  }

  GetUpcomingOrderResponse._();

  factory GetUpcomingOrderResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetUpcomingOrderResponse()..mergeFromBuffer(data, registry);
  factory GetUpcomingOrderResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetUpcomingOrderResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetUpcomingOrderResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetUpcomingOrderResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOB(3, _omitFieldNames ? '' : 'hasOrder')
    ..aOS(4, _omitFieldNames ? '' : 'orderId')
    ..aOS(5, _omitFieldNames ? '' : 'restaurant')
    ..aOS(6, _omitFieldNames ? '' : 'restaurantArea')
    ..aOS(7, _omitFieldNames ? '' : 'pickupDistance')
    ..aOS(8, _omitFieldNames ? '' : 'customerName')
    ..aOS(9, _omitFieldNames ? '' : 'deliveryArea')
    ..aOS(10, _omitFieldNames ? '' : 'deliveryDistance')
    ..aOS(11, _omitFieldNames ? '' : 'totalDistance')
    ..aOS(12, _omitFieldNames ? '' : 'earnings')
    ..aI(13, _omitFieldNames ? '' : 'items')
    ..aOS(14, _omitFieldNames ? '' : 'eta')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetUpcomingOrderResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetUpcomingOrderResponse copyWith(
          void Function(GetUpcomingOrderResponse) updates) =>
      super.copyWith((message) => updates(message as GetUpcomingOrderResponse))
          as GetUpcomingOrderResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetUpcomingOrderResponse() / GetUpcomingOrderResponse.new instead')
  static GetUpcomingOrderResponse create() => GetUpcomingOrderResponse._();
  static $pb.GeneratedMessage $_createMessage() => GetUpcomingOrderResponse._();
  @$core.override
  GetUpcomingOrderResponse createEmptyInstance() =>
      GetUpcomingOrderResponse._();
  @$core.pragma('dart2js:noInline')
  static GetUpcomingOrderResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetUpcomingOrderResponse>(
          GetUpcomingOrderResponse.$_createMessage);
  static GetUpcomingOrderResponse? _defaultInstance;

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
  $core.bool get hasOrder => $_getBF(2);
  @$pb.TagNumber(3)
  set hasOrder($core.bool value) => $_setBool(2, value);
  @$pb.TagNumber(3)
  $core.bool hasHasOrder() => $_has(2);
  @$pb.TagNumber(3)
  void clearHasOrder() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.String get orderId => $_getSZ(3);
  @$pb.TagNumber(4)
  set orderId($core.String value) => $_setString(3, value);
  @$pb.TagNumber(4)
  $core.bool hasOrderId() => $_has(3);
  @$pb.TagNumber(4)
  void clearOrderId() => $_clearField(4);

  @$pb.TagNumber(5)
  $core.String get restaurant => $_getSZ(4);
  @$pb.TagNumber(5)
  set restaurant($core.String value) => $_setString(4, value);
  @$pb.TagNumber(5)
  $core.bool hasRestaurant() => $_has(4);
  @$pb.TagNumber(5)
  void clearRestaurant() => $_clearField(5);

  @$pb.TagNumber(6)
  $core.String get restaurantArea => $_getSZ(5);
  @$pb.TagNumber(6)
  set restaurantArea($core.String value) => $_setString(5, value);
  @$pb.TagNumber(6)
  $core.bool hasRestaurantArea() => $_has(5);
  @$pb.TagNumber(6)
  void clearRestaurantArea() => $_clearField(6);

  @$pb.TagNumber(7)
  $core.String get pickupDistance => $_getSZ(6);
  @$pb.TagNumber(7)
  set pickupDistance($core.String value) => $_setString(6, value);
  @$pb.TagNumber(7)
  $core.bool hasPickupDistance() => $_has(6);
  @$pb.TagNumber(7)
  void clearPickupDistance() => $_clearField(7);

  @$pb.TagNumber(8)
  $core.String get customerName => $_getSZ(7);
  @$pb.TagNumber(8)
  set customerName($core.String value) => $_setString(7, value);
  @$pb.TagNumber(8)
  $core.bool hasCustomerName() => $_has(7);
  @$pb.TagNumber(8)
  void clearCustomerName() => $_clearField(8);

  @$pb.TagNumber(9)
  $core.String get deliveryArea => $_getSZ(8);
  @$pb.TagNumber(9)
  set deliveryArea($core.String value) => $_setString(8, value);
  @$pb.TagNumber(9)
  $core.bool hasDeliveryArea() => $_has(8);
  @$pb.TagNumber(9)
  void clearDeliveryArea() => $_clearField(9);

  @$pb.TagNumber(10)
  $core.String get deliveryDistance => $_getSZ(9);
  @$pb.TagNumber(10)
  set deliveryDistance($core.String value) => $_setString(9, value);
  @$pb.TagNumber(10)
  $core.bool hasDeliveryDistance() => $_has(9);
  @$pb.TagNumber(10)
  void clearDeliveryDistance() => $_clearField(10);

  @$pb.TagNumber(11)
  $core.String get totalDistance => $_getSZ(10);
  @$pb.TagNumber(11)
  set totalDistance($core.String value) => $_setString(10, value);
  @$pb.TagNumber(11)
  $core.bool hasTotalDistance() => $_has(10);
  @$pb.TagNumber(11)
  void clearTotalDistance() => $_clearField(11);

  @$pb.TagNumber(12)
  $core.String get earnings => $_getSZ(11);
  @$pb.TagNumber(12)
  set earnings($core.String value) => $_setString(11, value);
  @$pb.TagNumber(12)
  $core.bool hasEarnings() => $_has(11);
  @$pb.TagNumber(12)
  void clearEarnings() => $_clearField(12);

  @$pb.TagNumber(13)
  $core.int get items => $_getIZ(12);
  @$pb.TagNumber(13)
  set items($core.int value) => $_setSignedInt32(12, value);
  @$pb.TagNumber(13)
  $core.bool hasItems() => $_has(12);
  @$pb.TagNumber(13)
  void clearItems() => $_clearField(13);

  @$pb.TagNumber(14)
  $core.String get eta => $_getSZ(13);
  @$pb.TagNumber(14)
  set eta($core.String value) => $_setString(13, value);
  @$pb.TagNumber(14)
  $core.bool hasEta() => $_has(13);
  @$pb.TagNumber(14)
  void clearEta() => $_clearField(14);
}

class GetRiderStatusRequest extends $pb.GeneratedMessage {
  factory GetRiderStatusRequest() => GetRiderStatusRequest._();

  GetRiderStatusRequest._();

  factory GetRiderStatusRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetRiderStatusRequest()..mergeFromBuffer(data, registry);
  factory GetRiderStatusRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetRiderStatusRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetRiderStatusRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetRiderStatusRequest.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetRiderStatusRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetRiderStatusRequest copyWith(
          void Function(GetRiderStatusRequest) updates) =>
      super.copyWith((message) => updates(message as GetRiderStatusRequest))
          as GetRiderStatusRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetRiderStatusRequest() / GetRiderStatusRequest.new instead')
  static GetRiderStatusRequest create() => GetRiderStatusRequest._();
  static $pb.GeneratedMessage $_createMessage() => GetRiderStatusRequest._();
  @$core.override
  GetRiderStatusRequest createEmptyInstance() => GetRiderStatusRequest._();
  @$core.pragma('dart2js:noInline')
  static GetRiderStatusRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetRiderStatusRequest>(
          GetRiderStatusRequest.$_createMessage);
  static GetRiderStatusRequest? _defaultInstance;
}

class GetRiderStatusResponse extends $pb.GeneratedMessage {
  factory GetRiderStatusResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? status,
  }) {
    final result = GetRiderStatusResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (status != null) result.status = status;
    return result;
  }

  GetRiderStatusResponse._();

  factory GetRiderStatusResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetRiderStatusResponse()..mergeFromBuffer(data, registry);
  factory GetRiderStatusResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetRiderStatusResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetRiderStatusResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetRiderStatusResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'status')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetRiderStatusResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetRiderStatusResponse copyWith(
          void Function(GetRiderStatusResponse) updates) =>
      super.copyWith((message) => updates(message as GetRiderStatusResponse))
          as GetRiderStatusResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetRiderStatusResponse() / GetRiderStatusResponse.new instead')
  static GetRiderStatusResponse create() => GetRiderStatusResponse._();
  static $pb.GeneratedMessage $_createMessage() => GetRiderStatusResponse._();
  @$core.override
  GetRiderStatusResponse createEmptyInstance() => GetRiderStatusResponse._();
  @$core.pragma('dart2js:noInline')
  static GetRiderStatusResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetRiderStatusResponse>(
          GetRiderStatusResponse.$_createMessage);
  static GetRiderStatusResponse? _defaultInstance;

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
  $core.String get status => $_getSZ(2);
  @$pb.TagNumber(3)
  set status($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasStatus() => $_has(2);
  @$pb.TagNumber(3)
  void clearStatus() => $_clearField(3);
}

class UpdateAvailabilityRequest extends $pb.GeneratedMessage {
  factory UpdateAvailabilityRequest({
    $core.String? status,
  }) {
    final result = UpdateAvailabilityRequest._();
    if (status != null) result.status = status;
    return result;
  }

  UpdateAvailabilityRequest._();

  factory UpdateAvailabilityRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      UpdateAvailabilityRequest()..mergeFromBuffer(data, registry);
  factory UpdateAvailabilityRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      UpdateAvailabilityRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'UpdateAvailabilityRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: UpdateAvailabilityRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'status')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UpdateAvailabilityRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UpdateAvailabilityRequest copyWith(
          void Function(UpdateAvailabilityRequest) updates) =>
      super.copyWith((message) => updates(message as UpdateAvailabilityRequest))
          as UpdateAvailabilityRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use UpdateAvailabilityRequest() / UpdateAvailabilityRequest.new instead')
  static UpdateAvailabilityRequest create() => UpdateAvailabilityRequest._();
  static $pb.GeneratedMessage $_createMessage() =>
      UpdateAvailabilityRequest._();
  @$core.override
  UpdateAvailabilityRequest createEmptyInstance() =>
      UpdateAvailabilityRequest._();
  @$core.pragma('dart2js:noInline')
  static UpdateAvailabilityRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<UpdateAvailabilityRequest>(
          UpdateAvailabilityRequest.$_createMessage);
  static UpdateAvailabilityRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get status => $_getSZ(0);
  @$pb.TagNumber(1)
  set status($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasStatus() => $_has(0);
  @$pb.TagNumber(1)
  void clearStatus() => $_clearField(1);
}

class UpdateAvailabilityResponse extends $pb.GeneratedMessage {
  factory UpdateAvailabilityResponse({
    $core.bool? success,
    $core.String? message,
    $core.String? status,
  }) {
    final result = UpdateAvailabilityResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (status != null) result.status = status;
    return result;
  }

  UpdateAvailabilityResponse._();

  factory UpdateAvailabilityResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      UpdateAvailabilityResponse()..mergeFromBuffer(data, registry);
  factory UpdateAvailabilityResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      UpdateAvailabilityResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'UpdateAvailabilityResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: UpdateAvailabilityResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'status')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UpdateAvailabilityResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  UpdateAvailabilityResponse copyWith(
          void Function(UpdateAvailabilityResponse) updates) =>
      super.copyWith(
              (message) => updates(message as UpdateAvailabilityResponse))
          as UpdateAvailabilityResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use UpdateAvailabilityResponse() / UpdateAvailabilityResponse.new instead')
  static UpdateAvailabilityResponse create() => UpdateAvailabilityResponse._();
  static $pb.GeneratedMessage $_createMessage() =>
      UpdateAvailabilityResponse._();
  @$core.override
  UpdateAvailabilityResponse createEmptyInstance() =>
      UpdateAvailabilityResponse._();
  @$core.pragma('dart2js:noInline')
  static UpdateAvailabilityResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<UpdateAvailabilityResponse>(
          UpdateAvailabilityResponse.$_createMessage);
  static UpdateAvailabilityResponse? _defaultInstance;

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
  $core.String get status => $_getSZ(2);
  @$pb.TagNumber(3)
  set status($core.String value) => $_setString(2, value);
  @$pb.TagNumber(3)
  $core.bool hasStatus() => $_has(2);
  @$pb.TagNumber(3)
  void clearStatus() => $_clearField(3);
}

class GetAvailableOrdersRequest extends $pb.GeneratedMessage {
  factory GetAvailableOrdersRequest() => GetAvailableOrdersRequest._();

  GetAvailableOrdersRequest._();

  factory GetAvailableOrdersRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetAvailableOrdersRequest()..mergeFromBuffer(data, registry);
  factory GetAvailableOrdersRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetAvailableOrdersRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetAvailableOrdersRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetAvailableOrdersRequest.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetAvailableOrdersRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetAvailableOrdersRequest copyWith(
          void Function(GetAvailableOrdersRequest) updates) =>
      super.copyWith((message) => updates(message as GetAvailableOrdersRequest))
          as GetAvailableOrdersRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetAvailableOrdersRequest() / GetAvailableOrdersRequest.new instead')
  static GetAvailableOrdersRequest create() => GetAvailableOrdersRequest._();
  static $pb.GeneratedMessage $_createMessage() =>
      GetAvailableOrdersRequest._();
  @$core.override
  GetAvailableOrdersRequest createEmptyInstance() =>
      GetAvailableOrdersRequest._();
  @$core.pragma('dart2js:noInline')
  static GetAvailableOrdersRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetAvailableOrdersRequest>(
          GetAvailableOrdersRequest.$_createMessage);
  static GetAvailableOrdersRequest? _defaultInstance;
}

class GetAvailableOrdersResponse extends $pb.GeneratedMessage {
  factory GetAvailableOrdersResponse({
    $core.bool? success,
    $core.String? message,
    $core.Iterable<DeliveryOrder>? orders,
  }) {
    final result = GetAvailableOrdersResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (orders != null) result.orders.addAll(orders);
    return result;
  }

  GetAvailableOrdersResponse._();

  factory GetAvailableOrdersResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetAvailableOrdersResponse()..mergeFromBuffer(data, registry);
  factory GetAvailableOrdersResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetAvailableOrdersResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetAvailableOrdersResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetAvailableOrdersResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..pPM<DeliveryOrder>(3, _omitFieldNames ? '' : 'orders',
        subBuilder: DeliveryOrder.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetAvailableOrdersResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetAvailableOrdersResponse copyWith(
          void Function(GetAvailableOrdersResponse) updates) =>
      super.copyWith(
              (message) => updates(message as GetAvailableOrdersResponse))
          as GetAvailableOrdersResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetAvailableOrdersResponse() / GetAvailableOrdersResponse.new instead')
  static GetAvailableOrdersResponse create() => GetAvailableOrdersResponse._();
  static $pb.GeneratedMessage $_createMessage() =>
      GetAvailableOrdersResponse._();
  @$core.override
  GetAvailableOrdersResponse createEmptyInstance() =>
      GetAvailableOrdersResponse._();
  @$core.pragma('dart2js:noInline')
  static GetAvailableOrdersResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetAvailableOrdersResponse>(
          GetAvailableOrdersResponse.$_createMessage);
  static GetAvailableOrdersResponse? _defaultInstance;

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
  $pb.PbList<DeliveryOrder> get orders => $_getList(2);
}

class AcceptOrderRequest extends $pb.GeneratedMessage {
  factory AcceptOrderRequest({
    $core.String? orderId,
  }) {
    final result = AcceptOrderRequest._();
    if (orderId != null) result.orderId = orderId;
    return result;
  }

  AcceptOrderRequest._();

  factory AcceptOrderRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      AcceptOrderRequest()..mergeFromBuffer(data, registry);
  factory AcceptOrderRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      AcceptOrderRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'AcceptOrderRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: AcceptOrderRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'orderId')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  AcceptOrderRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  AcceptOrderRequest copyWith(void Function(AcceptOrderRequest) updates) =>
      super.copyWith((message) => updates(message as AcceptOrderRequest))
          as AcceptOrderRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use AcceptOrderRequest() / AcceptOrderRequest.new instead')
  static AcceptOrderRequest create() => AcceptOrderRequest._();
  static $pb.GeneratedMessage $_createMessage() => AcceptOrderRequest._();
  @$core.override
  AcceptOrderRequest createEmptyInstance() => AcceptOrderRequest._();
  @$core.pragma('dart2js:noInline')
  static AcceptOrderRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<AcceptOrderRequest>(
          AcceptOrderRequest.$_createMessage);
  static AcceptOrderRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get orderId => $_getSZ(0);
  @$pb.TagNumber(1)
  set orderId($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasOrderId() => $_has(0);
  @$pb.TagNumber(1)
  void clearOrderId() => $_clearField(1);
}

class AcceptOrderResponse extends $pb.GeneratedMessage {
  factory AcceptOrderResponse({
    $core.bool? success,
    $core.String? message,
    DeliveryOrder? order,
  }) {
    final result = AcceptOrderResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (order != null) result.order = order;
    return result;
  }

  AcceptOrderResponse._();

  factory AcceptOrderResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      AcceptOrderResponse()..mergeFromBuffer(data, registry);
  factory AcceptOrderResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      AcceptOrderResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'AcceptOrderResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: AcceptOrderResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOM<DeliveryOrder>(3, _omitFieldNames ? '' : 'order',
        subBuilder: DeliveryOrder.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  AcceptOrderResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  AcceptOrderResponse copyWith(void Function(AcceptOrderResponse) updates) =>
      super.copyWith((message) => updates(message as AcceptOrderResponse))
          as AcceptOrderResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use AcceptOrderResponse() / AcceptOrderResponse.new instead')
  static AcceptOrderResponse create() => AcceptOrderResponse._();
  static $pb.GeneratedMessage $_createMessage() => AcceptOrderResponse._();
  @$core.override
  AcceptOrderResponse createEmptyInstance() => AcceptOrderResponse._();
  @$core.pragma('dart2js:noInline')
  static AcceptOrderResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<AcceptOrderResponse>(
          AcceptOrderResponse.$_createMessage);
  static AcceptOrderResponse? _defaultInstance;

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
  DeliveryOrder get order => $_getN(2);
  @$pb.TagNumber(3)
  set order(DeliveryOrder value) => $_setField(3, value);
  @$pb.TagNumber(3)
  $core.bool hasOrder() => $_has(2);
  @$pb.TagNumber(3)
  void clearOrder() => $_clearField(3);
  @$pb.TagNumber(3)
  DeliveryOrder ensureOrder() => $_ensure(2);
}

class RejectOrderRequest extends $pb.GeneratedMessage {
  factory RejectOrderRequest({
    $core.String? orderId,
    $core.String? reason,
  }) {
    final result = RejectOrderRequest._();
    if (orderId != null) result.orderId = orderId;
    if (reason != null) result.reason = reason;
    return result;
  }

  RejectOrderRequest._();

  factory RejectOrderRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RejectOrderRequest()..mergeFromBuffer(data, registry);
  factory RejectOrderRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RejectOrderRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RejectOrderRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: RejectOrderRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'orderId')
    ..aOS(2, _omitFieldNames ? '' : 'reason')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RejectOrderRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RejectOrderRequest copyWith(void Function(RejectOrderRequest) updates) =>
      super.copyWith((message) => updates(message as RejectOrderRequest))
          as RejectOrderRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use RejectOrderRequest() / RejectOrderRequest.new instead')
  static RejectOrderRequest create() => RejectOrderRequest._();
  static $pb.GeneratedMessage $_createMessage() => RejectOrderRequest._();
  @$core.override
  RejectOrderRequest createEmptyInstance() => RejectOrderRequest._();
  @$core.pragma('dart2js:noInline')
  static RejectOrderRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RejectOrderRequest>(
          RejectOrderRequest.$_createMessage);
  static RejectOrderRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get orderId => $_getSZ(0);
  @$pb.TagNumber(1)
  set orderId($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasOrderId() => $_has(0);
  @$pb.TagNumber(1)
  void clearOrderId() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get reason => $_getSZ(1);
  @$pb.TagNumber(2)
  set reason($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasReason() => $_has(1);
  @$pb.TagNumber(2)
  void clearReason() => $_clearField(2);
}

class RejectOrderResponse extends $pb.GeneratedMessage {
  factory RejectOrderResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = RejectOrderResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  RejectOrderResponse._();

  factory RejectOrderResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RejectOrderResponse()..mergeFromBuffer(data, registry);
  factory RejectOrderResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RejectOrderResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RejectOrderResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: RejectOrderResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RejectOrderResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RejectOrderResponse copyWith(void Function(RejectOrderResponse) updates) =>
      super.copyWith((message) => updates(message as RejectOrderResponse))
          as RejectOrderResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use RejectOrderResponse() / RejectOrderResponse.new instead')
  static RejectOrderResponse create() => RejectOrderResponse._();
  static $pb.GeneratedMessage $_createMessage() => RejectOrderResponse._();
  @$core.override
  RejectOrderResponse createEmptyInstance() => RejectOrderResponse._();
  @$core.pragma('dart2js:noInline')
  static RejectOrderResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RejectOrderResponse>(
          RejectOrderResponse.$_createMessage);
  static RejectOrderResponse? _defaultInstance;

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

class PickupOrderRequest extends $pb.GeneratedMessage {
  factory PickupOrderRequest({
    $core.String? orderId,
  }) {
    final result = PickupOrderRequest._();
    if (orderId != null) result.orderId = orderId;
    return result;
  }

  PickupOrderRequest._();

  factory PickupOrderRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      PickupOrderRequest()..mergeFromBuffer(data, registry);
  factory PickupOrderRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      PickupOrderRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'PickupOrderRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: PickupOrderRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'orderId')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  PickupOrderRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  PickupOrderRequest copyWith(void Function(PickupOrderRequest) updates) =>
      super.copyWith((message) => updates(message as PickupOrderRequest))
          as PickupOrderRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use PickupOrderRequest() / PickupOrderRequest.new instead')
  static PickupOrderRequest create() => PickupOrderRequest._();
  static $pb.GeneratedMessage $_createMessage() => PickupOrderRequest._();
  @$core.override
  PickupOrderRequest createEmptyInstance() => PickupOrderRequest._();
  @$core.pragma('dart2js:noInline')
  static PickupOrderRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<PickupOrderRequest>(
          PickupOrderRequest.$_createMessage);
  static PickupOrderRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get orderId => $_getSZ(0);
  @$pb.TagNumber(1)
  set orderId($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasOrderId() => $_has(0);
  @$pb.TagNumber(1)
  void clearOrderId() => $_clearField(1);
}

class PickupOrderResponse extends $pb.GeneratedMessage {
  factory PickupOrderResponse({
    $core.bool? success,
    $core.String? message,
    DeliveryOrder? order,
  }) {
    final result = PickupOrderResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (order != null) result.order = order;
    return result;
  }

  PickupOrderResponse._();

  factory PickupOrderResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      PickupOrderResponse()..mergeFromBuffer(data, registry);
  factory PickupOrderResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      PickupOrderResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'PickupOrderResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: PickupOrderResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOM<DeliveryOrder>(3, _omitFieldNames ? '' : 'order',
        subBuilder: DeliveryOrder.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  PickupOrderResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  PickupOrderResponse copyWith(void Function(PickupOrderResponse) updates) =>
      super.copyWith((message) => updates(message as PickupOrderResponse))
          as PickupOrderResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core
      .Deprecated('Use PickupOrderResponse() / PickupOrderResponse.new instead')
  static PickupOrderResponse create() => PickupOrderResponse._();
  static $pb.GeneratedMessage $_createMessage() => PickupOrderResponse._();
  @$core.override
  PickupOrderResponse createEmptyInstance() => PickupOrderResponse._();
  @$core.pragma('dart2js:noInline')
  static PickupOrderResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<PickupOrderResponse>(
          PickupOrderResponse.$_createMessage);
  static PickupOrderResponse? _defaultInstance;

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
  DeliveryOrder get order => $_getN(2);
  @$pb.TagNumber(3)
  set order(DeliveryOrder value) => $_setField(3, value);
  @$pb.TagNumber(3)
  $core.bool hasOrder() => $_has(2);
  @$pb.TagNumber(3)
  void clearOrder() => $_clearField(3);
  @$pb.TagNumber(3)
  DeliveryOrder ensureOrder() => $_ensure(2);
}

class RequestDeliveryOTPRequest extends $pb.GeneratedMessage {
  factory RequestDeliveryOTPRequest({
    $core.String? orderId,
  }) {
    final result = RequestDeliveryOTPRequest._();
    if (orderId != null) result.orderId = orderId;
    return result;
  }

  RequestDeliveryOTPRequest._();

  factory RequestDeliveryOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RequestDeliveryOTPRequest()..mergeFromBuffer(data, registry);
  factory RequestDeliveryOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RequestDeliveryOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RequestDeliveryOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: RequestDeliveryOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'orderId')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RequestDeliveryOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RequestDeliveryOTPRequest copyWith(
          void Function(RequestDeliveryOTPRequest) updates) =>
      super.copyWith((message) => updates(message as RequestDeliveryOTPRequest))
          as RequestDeliveryOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use RequestDeliveryOTPRequest() / RequestDeliveryOTPRequest.new instead')
  static RequestDeliveryOTPRequest create() => RequestDeliveryOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() =>
      RequestDeliveryOTPRequest._();
  @$core.override
  RequestDeliveryOTPRequest createEmptyInstance() =>
      RequestDeliveryOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static RequestDeliveryOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RequestDeliveryOTPRequest>(
          RequestDeliveryOTPRequest.$_createMessage);
  static RequestDeliveryOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get orderId => $_getSZ(0);
  @$pb.TagNumber(1)
  set orderId($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasOrderId() => $_has(0);
  @$pb.TagNumber(1)
  void clearOrderId() => $_clearField(1);
}

class RequestDeliveryOTPResponse extends $pb.GeneratedMessage {
  factory RequestDeliveryOTPResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = RequestDeliveryOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  RequestDeliveryOTPResponse._();

  factory RequestDeliveryOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RequestDeliveryOTPResponse()..mergeFromBuffer(data, registry);
  factory RequestDeliveryOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      RequestDeliveryOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'RequestDeliveryOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: RequestDeliveryOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RequestDeliveryOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  RequestDeliveryOTPResponse copyWith(
          void Function(RequestDeliveryOTPResponse) updates) =>
      super.copyWith(
              (message) => updates(message as RequestDeliveryOTPResponse))
          as RequestDeliveryOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use RequestDeliveryOTPResponse() / RequestDeliveryOTPResponse.new instead')
  static RequestDeliveryOTPResponse create() => RequestDeliveryOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() =>
      RequestDeliveryOTPResponse._();
  @$core.override
  RequestDeliveryOTPResponse createEmptyInstance() =>
      RequestDeliveryOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static RequestDeliveryOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<RequestDeliveryOTPResponse>(
          RequestDeliveryOTPResponse.$_createMessage);
  static RequestDeliveryOTPResponse? _defaultInstance;

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

class VerifyDeliveryOTPRequest extends $pb.GeneratedMessage {
  factory VerifyDeliveryOTPRequest({
    $core.String? orderId,
    $core.String? otp,
  }) {
    final result = VerifyDeliveryOTPRequest._();
    if (orderId != null) result.orderId = orderId;
    if (otp != null) result.otp = otp;
    return result;
  }

  VerifyDeliveryOTPRequest._();

  factory VerifyDeliveryOTPRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyDeliveryOTPRequest()..mergeFromBuffer(data, registry);
  factory VerifyDeliveryOTPRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyDeliveryOTPRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyDeliveryOTPRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: VerifyDeliveryOTPRequest.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'orderId')
    ..aOS(2, _omitFieldNames ? '' : 'otp')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyDeliveryOTPRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyDeliveryOTPRequest copyWith(
          void Function(VerifyDeliveryOTPRequest) updates) =>
      super.copyWith((message) => updates(message as VerifyDeliveryOTPRequest))
          as VerifyDeliveryOTPRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyDeliveryOTPRequest() / VerifyDeliveryOTPRequest.new instead')
  static VerifyDeliveryOTPRequest create() => VerifyDeliveryOTPRequest._();
  static $pb.GeneratedMessage $_createMessage() => VerifyDeliveryOTPRequest._();
  @$core.override
  VerifyDeliveryOTPRequest createEmptyInstance() =>
      VerifyDeliveryOTPRequest._();
  @$core.pragma('dart2js:noInline')
  static VerifyDeliveryOTPRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyDeliveryOTPRequest>(
          VerifyDeliveryOTPRequest.$_createMessage);
  static VerifyDeliveryOTPRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get orderId => $_getSZ(0);
  @$pb.TagNumber(1)
  set orderId($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasOrderId() => $_has(0);
  @$pb.TagNumber(1)
  void clearOrderId() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get otp => $_getSZ(1);
  @$pb.TagNumber(2)
  set otp($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasOtp() => $_has(1);
  @$pb.TagNumber(2)
  void clearOtp() => $_clearField(2);
}

class VerifyDeliveryOTPResponse extends $pb.GeneratedMessage {
  factory VerifyDeliveryOTPResponse({
    $core.bool? success,
    $core.String? message,
  }) {
    final result = VerifyDeliveryOTPResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    return result;
  }

  VerifyDeliveryOTPResponse._();

  factory VerifyDeliveryOTPResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyDeliveryOTPResponse()..mergeFromBuffer(data, registry);
  factory VerifyDeliveryOTPResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      VerifyDeliveryOTPResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'VerifyDeliveryOTPResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: VerifyDeliveryOTPResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyDeliveryOTPResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  VerifyDeliveryOTPResponse copyWith(
          void Function(VerifyDeliveryOTPResponse) updates) =>
      super.copyWith((message) => updates(message as VerifyDeliveryOTPResponse))
          as VerifyDeliveryOTPResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use VerifyDeliveryOTPResponse() / VerifyDeliveryOTPResponse.new instead')
  static VerifyDeliveryOTPResponse create() => VerifyDeliveryOTPResponse._();
  static $pb.GeneratedMessage $_createMessage() =>
      VerifyDeliveryOTPResponse._();
  @$core.override
  VerifyDeliveryOTPResponse createEmptyInstance() =>
      VerifyDeliveryOTPResponse._();
  @$core.pragma('dart2js:noInline')
  static VerifyDeliveryOTPResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<VerifyDeliveryOTPResponse>(
          VerifyDeliveryOTPResponse.$_createMessage);
  static VerifyDeliveryOTPResponse? _defaultInstance;

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

class GetCurrentOrderRequest extends $pb.GeneratedMessage {
  factory GetCurrentOrderRequest() => GetCurrentOrderRequest._();

  GetCurrentOrderRequest._();

  factory GetCurrentOrderRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetCurrentOrderRequest()..mergeFromBuffer(data, registry);
  factory GetCurrentOrderRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetCurrentOrderRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetCurrentOrderRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetCurrentOrderRequest.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetCurrentOrderRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetCurrentOrderRequest copyWith(
          void Function(GetCurrentOrderRequest) updates) =>
      super.copyWith((message) => updates(message as GetCurrentOrderRequest))
          as GetCurrentOrderRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetCurrentOrderRequest() / GetCurrentOrderRequest.new instead')
  static GetCurrentOrderRequest create() => GetCurrentOrderRequest._();
  static $pb.GeneratedMessage $_createMessage() => GetCurrentOrderRequest._();
  @$core.override
  GetCurrentOrderRequest createEmptyInstance() => GetCurrentOrderRequest._();
  @$core.pragma('dart2js:noInline')
  static GetCurrentOrderRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetCurrentOrderRequest>(
          GetCurrentOrderRequest.$_createMessage);
  static GetCurrentOrderRequest? _defaultInstance;
}

class GetCurrentOrderResponse extends $pb.GeneratedMessage {
  factory GetCurrentOrderResponse({
    $core.bool? success,
    $core.String? message,
    DeliveryOrder? order,
  }) {
    final result = GetCurrentOrderResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (order != null) result.order = order;
    return result;
  }

  GetCurrentOrderResponse._();

  factory GetCurrentOrderResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetCurrentOrderResponse()..mergeFromBuffer(data, registry);
  factory GetCurrentOrderResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetCurrentOrderResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetCurrentOrderResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetCurrentOrderResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOM<DeliveryOrder>(3, _omitFieldNames ? '' : 'order',
        subBuilder: DeliveryOrder.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetCurrentOrderResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetCurrentOrderResponse copyWith(
          void Function(GetCurrentOrderResponse) updates) =>
      super.copyWith((message) => updates(message as GetCurrentOrderResponse))
          as GetCurrentOrderResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetCurrentOrderResponse() / GetCurrentOrderResponse.new instead')
  static GetCurrentOrderResponse create() => GetCurrentOrderResponse._();
  static $pb.GeneratedMessage $_createMessage() => GetCurrentOrderResponse._();
  @$core.override
  GetCurrentOrderResponse createEmptyInstance() => GetCurrentOrderResponse._();
  @$core.pragma('dart2js:noInline')
  static GetCurrentOrderResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetCurrentOrderResponse>(
          GetCurrentOrderResponse.$_createMessage);
  static GetCurrentOrderResponse? _defaultInstance;

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
  DeliveryOrder get order => $_getN(2);
  @$pb.TagNumber(3)
  set order(DeliveryOrder value) => $_setField(3, value);
  @$pb.TagNumber(3)
  $core.bool hasOrder() => $_has(2);
  @$pb.TagNumber(3)
  void clearOrder() => $_clearField(3);
  @$pb.TagNumber(3)
  DeliveryOrder ensureOrder() => $_ensure(2);
}

class GetDeliveryHistoryRequest extends $pb.GeneratedMessage {
  factory GetDeliveryHistoryRequest({
    $core.int? page,
    $core.int? limit,
  }) {
    final result = GetDeliveryHistoryRequest._();
    if (page != null) result.page = page;
    if (limit != null) result.limit = limit;
    return result;
  }

  GetDeliveryHistoryRequest._();

  factory GetDeliveryHistoryRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetDeliveryHistoryRequest()..mergeFromBuffer(data, registry);
  factory GetDeliveryHistoryRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetDeliveryHistoryRequest()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetDeliveryHistoryRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetDeliveryHistoryRequest.$_createMessage)
    ..aI(1, _omitFieldNames ? '' : 'page')
    ..aI(2, _omitFieldNames ? '' : 'limit')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetDeliveryHistoryRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetDeliveryHistoryRequest copyWith(
          void Function(GetDeliveryHistoryRequest) updates) =>
      super.copyWith((message) => updates(message as GetDeliveryHistoryRequest))
          as GetDeliveryHistoryRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetDeliveryHistoryRequest() / GetDeliveryHistoryRequest.new instead')
  static GetDeliveryHistoryRequest create() => GetDeliveryHistoryRequest._();
  static $pb.GeneratedMessage $_createMessage() =>
      GetDeliveryHistoryRequest._();
  @$core.override
  GetDeliveryHistoryRequest createEmptyInstance() =>
      GetDeliveryHistoryRequest._();
  @$core.pragma('dart2js:noInline')
  static GetDeliveryHistoryRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetDeliveryHistoryRequest>(
          GetDeliveryHistoryRequest.$_createMessage);
  static GetDeliveryHistoryRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.int get page => $_getIZ(0);
  @$pb.TagNumber(1)
  set page($core.int value) => $_setSignedInt32(0, value);
  @$pb.TagNumber(1)
  $core.bool hasPage() => $_has(0);
  @$pb.TagNumber(1)
  void clearPage() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.int get limit => $_getIZ(1);
  @$pb.TagNumber(2)
  set limit($core.int value) => $_setSignedInt32(1, value);
  @$pb.TagNumber(2)
  $core.bool hasLimit() => $_has(1);
  @$pb.TagNumber(2)
  void clearLimit() => $_clearField(2);
}

class GetDeliveryHistoryResponse extends $pb.GeneratedMessage {
  factory GetDeliveryHistoryResponse({
    $core.bool? success,
    $core.String? message,
    $core.Iterable<DeliveryOrder>? orders,
  }) {
    final result = GetDeliveryHistoryResponse._();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (orders != null) result.orders.addAll(orders);
    return result;
  }

  GetDeliveryHistoryResponse._();

  factory GetDeliveryHistoryResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetDeliveryHistoryResponse()..mergeFromBuffer(data, registry);
  factory GetDeliveryHistoryResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      GetDeliveryHistoryResponse()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'GetDeliveryHistoryResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: GetDeliveryHistoryResponse.$_createMessage)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..pPM<DeliveryOrder>(3, _omitFieldNames ? '' : 'orders',
        subBuilder: DeliveryOrder.$_createMessage)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetDeliveryHistoryResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  GetDeliveryHistoryResponse copyWith(
          void Function(GetDeliveryHistoryResponse) updates) =>
      super.copyWith(
              (message) => updates(message as GetDeliveryHistoryResponse))
          as GetDeliveryHistoryResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated(
      'Use GetDeliveryHistoryResponse() / GetDeliveryHistoryResponse.new instead')
  static GetDeliveryHistoryResponse create() => GetDeliveryHistoryResponse._();
  static $pb.GeneratedMessage $_createMessage() =>
      GetDeliveryHistoryResponse._();
  @$core.override
  GetDeliveryHistoryResponse createEmptyInstance() =>
      GetDeliveryHistoryResponse._();
  @$core.pragma('dart2js:noInline')
  static GetDeliveryHistoryResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<GetDeliveryHistoryResponse>(
          GetDeliveryHistoryResponse.$_createMessage);
  static GetDeliveryHistoryResponse? _defaultInstance;

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
  $pb.PbList<DeliveryOrder> get orders => $_getList(2);
}

class DeliveryOrder extends $pb.GeneratedMessage {
  factory DeliveryOrder({
    $core.String? id,
    $core.String? orderId,
    Restaurant? restaurant,
    Customer? customer,
    DeliveryAddress? deliveryAddress,
    $core.double? grandTotal,
    $core.String? orderStatus,
    $core.String? createdAt,
  }) {
    final result = DeliveryOrder._();
    if (id != null) result.id = id;
    if (orderId != null) result.orderId = orderId;
    if (restaurant != null) result.restaurant = restaurant;
    if (customer != null) result.customer = customer;
    if (deliveryAddress != null) result.deliveryAddress = deliveryAddress;
    if (grandTotal != null) result.grandTotal = grandTotal;
    if (orderStatus != null) result.orderStatus = orderStatus;
    if (createdAt != null) result.createdAt = createdAt;
    return result;
  }

  DeliveryOrder._();

  factory DeliveryOrder.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      DeliveryOrder()..mergeFromBuffer(data, registry);
  factory DeliveryOrder.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      DeliveryOrder()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'DeliveryOrder',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: DeliveryOrder.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'orderId')
    ..aOM<Restaurant>(3, _omitFieldNames ? '' : 'restaurant',
        subBuilder: Restaurant.$_createMessage)
    ..aOM<Customer>(4, _omitFieldNames ? '' : 'customer',
        subBuilder: Customer.$_createMessage)
    ..aOM<DeliveryAddress>(5, _omitFieldNames ? '' : 'deliveryAddress',
        subBuilder: DeliveryAddress.$_createMessage)
    ..aD(6, _omitFieldNames ? '' : 'grandTotal')
    ..aOS(7, _omitFieldNames ? '' : 'orderStatus')
    ..aOS(8, _omitFieldNames ? '' : 'createdAt')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DeliveryOrder clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DeliveryOrder copyWith(void Function(DeliveryOrder) updates) =>
      super.copyWith((message) => updates(message as DeliveryOrder))
          as DeliveryOrder;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use DeliveryOrder() / DeliveryOrder.new instead')
  static DeliveryOrder create() => DeliveryOrder._();
  static $pb.GeneratedMessage $_createMessage() => DeliveryOrder._();
  @$core.override
  DeliveryOrder createEmptyInstance() => DeliveryOrder._();
  @$core.pragma('dart2js:noInline')
  static DeliveryOrder getDefault() =>
      _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<DeliveryOrder>(
          DeliveryOrder.$_createMessage);
  static DeliveryOrder? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get id => $_getSZ(0);
  @$pb.TagNumber(1)
  set id($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasId() => $_has(0);
  @$pb.TagNumber(1)
  void clearId() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get orderId => $_getSZ(1);
  @$pb.TagNumber(2)
  set orderId($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasOrderId() => $_has(1);
  @$pb.TagNumber(2)
  void clearOrderId() => $_clearField(2);

  @$pb.TagNumber(3)
  Restaurant get restaurant => $_getN(2);
  @$pb.TagNumber(3)
  set restaurant(Restaurant value) => $_setField(3, value);
  @$pb.TagNumber(3)
  $core.bool hasRestaurant() => $_has(2);
  @$pb.TagNumber(3)
  void clearRestaurant() => $_clearField(3);
  @$pb.TagNumber(3)
  Restaurant ensureRestaurant() => $_ensure(2);

  @$pb.TagNumber(4)
  Customer get customer => $_getN(3);
  @$pb.TagNumber(4)
  set customer(Customer value) => $_setField(4, value);
  @$pb.TagNumber(4)
  $core.bool hasCustomer() => $_has(3);
  @$pb.TagNumber(4)
  void clearCustomer() => $_clearField(4);
  @$pb.TagNumber(4)
  Customer ensureCustomer() => $_ensure(3);

  @$pb.TagNumber(5)
  DeliveryAddress get deliveryAddress => $_getN(4);
  @$pb.TagNumber(5)
  set deliveryAddress(DeliveryAddress value) => $_setField(5, value);
  @$pb.TagNumber(5)
  $core.bool hasDeliveryAddress() => $_has(4);
  @$pb.TagNumber(5)
  void clearDeliveryAddress() => $_clearField(5);
  @$pb.TagNumber(5)
  DeliveryAddress ensureDeliveryAddress() => $_ensure(4);

  @$pb.TagNumber(6)
  $core.double get grandTotal => $_getN(5);
  @$pb.TagNumber(6)
  set grandTotal($core.double value) => $_setDouble(5, value);
  @$pb.TagNumber(6)
  $core.bool hasGrandTotal() => $_has(5);
  @$pb.TagNumber(6)
  void clearGrandTotal() => $_clearField(6);

  @$pb.TagNumber(7)
  $core.String get orderStatus => $_getSZ(6);
  @$pb.TagNumber(7)
  set orderStatus($core.String value) => $_setString(6, value);
  @$pb.TagNumber(7)
  $core.bool hasOrderStatus() => $_has(6);
  @$pb.TagNumber(7)
  void clearOrderStatus() => $_clearField(7);

  @$pb.TagNumber(8)
  $core.String get createdAt => $_getSZ(7);
  @$pb.TagNumber(8)
  set createdAt($core.String value) => $_setString(7, value);
  @$pb.TagNumber(8)
  $core.bool hasCreatedAt() => $_has(7);
  @$pb.TagNumber(8)
  void clearCreatedAt() => $_clearField(8);
}

class Restaurant extends $pb.GeneratedMessage {
  factory Restaurant({
    $core.String? name,
    $core.String? address,
  }) {
    final result = Restaurant._();
    if (name != null) result.name = name;
    if (address != null) result.address = address;
    return result;
  }

  Restaurant._();

  factory Restaurant.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      Restaurant()..mergeFromBuffer(data, registry);
  factory Restaurant.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      Restaurant()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'Restaurant',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: Restaurant.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'name')
    ..aOS(2, _omitFieldNames ? '' : 'address')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  Restaurant clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  Restaurant copyWith(void Function(Restaurant) updates) =>
      super.copyWith((message) => updates(message as Restaurant)) as Restaurant;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use Restaurant() / Restaurant.new instead')
  static Restaurant create() => Restaurant._();
  static $pb.GeneratedMessage $_createMessage() => Restaurant._();
  @$core.override
  Restaurant createEmptyInstance() => Restaurant._();
  @$core.pragma('dart2js:noInline')
  static Restaurant getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<Restaurant>(Restaurant.$_createMessage);
  static Restaurant? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get name => $_getSZ(0);
  @$pb.TagNumber(1)
  set name($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasName() => $_has(0);
  @$pb.TagNumber(1)
  void clearName() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get address => $_getSZ(1);
  @$pb.TagNumber(2)
  set address($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasAddress() => $_has(1);
  @$pb.TagNumber(2)
  void clearAddress() => $_clearField(2);
}

class Customer extends $pb.GeneratedMessage {
  factory Customer({
    $core.String? name,
    $core.String? phone,
  }) {
    final result = Customer._();
    if (name != null) result.name = name;
    if (phone != null) result.phone = phone;
    return result;
  }

  Customer._();

  factory Customer.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      Customer()..mergeFromBuffer(data, registry);
  factory Customer.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      Customer()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'Customer',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: Customer.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'name')
    ..aOS(2, _omitFieldNames ? '' : 'phone')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  Customer clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  Customer copyWith(void Function(Customer) updates) =>
      super.copyWith((message) => updates(message as Customer)) as Customer;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use Customer() / Customer.new instead')
  static Customer create() => Customer._();
  static $pb.GeneratedMessage $_createMessage() => Customer._();
  @$core.override
  Customer createEmptyInstance() => Customer._();
  @$core.pragma('dart2js:noInline')
  static Customer getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<Customer>(Customer.$_createMessage);
  static Customer? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get name => $_getSZ(0);
  @$pb.TagNumber(1)
  set name($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasName() => $_has(0);
  @$pb.TagNumber(1)
  void clearName() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get phone => $_getSZ(1);
  @$pb.TagNumber(2)
  set phone($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasPhone() => $_has(1);
  @$pb.TagNumber(2)
  void clearPhone() => $_clearField(2);
}

class DeliveryAddress extends $pb.GeneratedMessage {
  factory DeliveryAddress({
    $core.String? fullAddress,
    $core.double? lat,
    $core.double? lng,
  }) {
    final result = DeliveryAddress._();
    if (fullAddress != null) result.fullAddress = fullAddress;
    if (lat != null) result.lat = lat;
    if (lng != null) result.lng = lng;
    return result;
  }

  DeliveryAddress._();

  factory DeliveryAddress.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      DeliveryAddress()..mergeFromBuffer(data, registry);
  factory DeliveryAddress.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      DeliveryAddress()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'DeliveryAddress',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'delivery'),
      createEmptyInstance: DeliveryAddress.$_createMessage)
    ..aOS(1, _omitFieldNames ? '' : 'fullAddress')
    ..aD(2, _omitFieldNames ? '' : 'lat')
    ..aD(3, _omitFieldNames ? '' : 'lng')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DeliveryAddress clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DeliveryAddress copyWith(void Function(DeliveryAddress) updates) =>
      super.copyWith((message) => updates(message as DeliveryAddress))
          as DeliveryAddress;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  @$core.Deprecated('Use DeliveryAddress() / DeliveryAddress.new instead')
  static DeliveryAddress create() => DeliveryAddress._();
  static $pb.GeneratedMessage $_createMessage() => DeliveryAddress._();
  @$core.override
  DeliveryAddress createEmptyInstance() => DeliveryAddress._();
  @$core.pragma('dart2js:noInline')
  static DeliveryAddress getDefault() =>
      _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<DeliveryAddress>(
          DeliveryAddress.$_createMessage);
  static DeliveryAddress? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get fullAddress => $_getSZ(0);
  @$pb.TagNumber(1)
  set fullAddress($core.String value) => $_setString(0, value);
  @$pb.TagNumber(1)
  $core.bool hasFullAddress() => $_has(0);
  @$pb.TagNumber(1)
  void clearFullAddress() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.double get lat => $_getN(1);
  @$pb.TagNumber(2)
  set lat($core.double value) => $_setDouble(1, value);
  @$pb.TagNumber(2)
  $core.bool hasLat() => $_has(1);
  @$pb.TagNumber(2)
  void clearLat() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.double get lng => $_getN(2);
  @$pb.TagNumber(3)
  set lng($core.double value) => $_setDouble(2, value);
  @$pb.TagNumber(3)
  $core.bool hasLng() => $_has(2);
  @$pb.TagNumber(3)
  void clearLng() => $_clearField(3);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
