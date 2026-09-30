import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/auth/controllers/auth_controller.dart';
import 'package:delivery_partner_app/features/auth/services/auth_service.dart';
import 'package:delivery_partner_app/features/auth/widgets/login_hero.dart';
import 'package:delivery_partner_app/features/auth/widgets/otp_login_form.dart';
import 'package:delivery_partner_app/features/auth/widgets/phone_login_form.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final AuthController authController = Get.find<AuthController>();

  bool isOtpStep = false;
  bool loading = false;

  String phone = '';
  String phoneError = '';

  final List<String> otp = ['', '', '', '', '', ''];

  final phoneController = TextEditingController();

  final List<TextEditingController> otpControllers = List.generate(
    6,
    (_) => TextEditingController(),
  );

  final List<FocusNode> otpFocusNodes = List.generate(6, (_) => FocusNode());

  int resendTimer = 0;
  Timer? resendTimerController;

  @override
  void dispose() {
    phoneController.dispose();

    for (final controller in otpControllers) {
      controller.dispose();
    }

    for (final focusNode in otpFocusNodes) {
      focusNode.dispose();
    }

    resendTimerController?.cancel();

    super.dispose();
  }

  Future<void> handleSendOtp() async {
    final value = phoneController.text.trim();

    if (value.length != 10 || !RegExp(r'^\d+$').hasMatch(value)) {
      setState(() {
        phoneError = 'Enter a valid 10-digit mobile number';
      });
      return;
    }

    setState(() {
      phone = value;
      phoneError = '';
      loading = true;
    });

    try {
      final authService = Get.find<AuthService>();

      await authService.sendOtp(phone);

      if (!mounted) return;

      setState(() {
        loading = false;
        isOtpStep = true;
      });

      startResendTimer();

      Future.delayed(const Duration(milliseconds: 100), () {
        if (mounted) {
          otpFocusNodes[0].requestFocus();
        }
      });
    } catch (error) {
      if (!mounted) return;

      setState(() {
        loading = false;
        phoneError = _cleanError(error);
      });
    }
  }

  String _cleanError(Object error) {
    final message = error.toString();

    if (message.startsWith('Exception: ')) {
      return message.substring(11);
    }

    return message;
  }

  void handlePhoneChanged(String value) {
    final cleaned = value.replaceAll(RegExp(r'\D'), '');

    if (cleaned != value) {
      phoneController.value = TextEditingValue(
        text: cleaned,
        selection: TextSelection.collapsed(offset: cleaned.length),
      );
    }

    setState(() {
      phoneError = '';
    });
  }

  void handleOtpChanged(int index, String value) {
    if (value.isNotEmpty && !RegExp(r'^\d$').hasMatch(value)) {
      return;
    }

    setState(() {
      otp[index] = value;
    });

    if (value.isNotEmpty && index < 5) {
      otpFocusNodes[index + 1].requestFocus();
    }

    if (otp.every((digit) => digit.isNotEmpty)) {
      Future.delayed(const Duration(milliseconds: 120), () {
        if (mounted) {
          verifyOtp();
        }
      });
    }
  }

  Future<void> verifyOtp() async {
    setState(() {
      loading = true;
    });

    try {
      await authController.login(phone: phone, otp: otp.join());

      // Do NOT navigate here.
      //
      // AuthController changes:
      // AuthStatus.unauthenticated
      //          ↓
      // AuthStatus.authenticated
      //
      // _AppRoot in app.dart observes that change
      // and automatically shows AppShell.
    } catch (error) {
      if (!mounted) return;

      for (final controller in otpControllers) {
        controller.clear();
      }

      setState(() {
        for (var i = 0; i < otp.length; i++) {
          otp[i] = '';
        }
      });

      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(_cleanError(error))));

      otpFocusNodes[0].requestFocus();
    } finally {
      if (mounted) {
        setState(() {
          loading = false;
        });
      }
    }
  }

  Future<void> handleResend() async {
    if (resendTimer > 0 || loading) {
      return;
    }

    setState(() {
      loading = true;
    });

    try {
      final authService = Get.find<AuthService>();

      await authService.sendOtp(phone);

      if (!mounted) return;

      for (var i = 0; i < otp.length; i++) {
        otp[i] = '';
        otpControllers[i].clear();
      }

      setState(() {
        loading = false;
      });

      startResendTimer();

      otpFocusNodes[0].requestFocus();
    } catch (error) {
      if (!mounted) return;

      setState(() {
        loading = false;
      });

      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(_cleanError(error))));
    }
  }

  void startResendTimer() {
    resendTimerController?.cancel();

    setState(() {
      resendTimer = 30;
    });

    resendTimerController = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }

      if (resendTimer <= 1) {
        timer.cancel();

        setState(() {
          resendTimer = 0;
        });
      } else {
        setState(() {
          resendTimer--;
        });
      }
    });
  }

  void backToPhone() {
    for (var i = 0; i < otp.length; i++) {
      otp[i] = '';
      otpControllers[i].clear();
    }

    resendTimerController?.cancel();

    setState(() {
      isOtpStep = false;
      loading = false;
      resendTimer = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const LoginHero(),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 32, 24, 40),
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 350),
                  transitionBuilder: (child, animation) {
                    final offsetAnimation = Tween<Offset>(
                      begin: const Offset(0, 0.08),
                      end: Offset.zero,
                    ).animate(animation);

                    return FadeTransition(
                      opacity: animation,
                      child: SlideTransition(
                        position: offsetAnimation,
                        child: child,
                      ),
                    );
                  },
                  child: isOtpStep
                      ? OtpLoginForm(
                          key: const ValueKey('otp'),
                          phone: phone,
                          otp: otp,
                          otpControllers: otpControllers,
                          otpFocusNodes: otpFocusNodes,
                          resendTimer: resendTimer,
                          loading: loading,
                          onOtpChanged: handleOtpChanged,
                          onVerify: verifyOtp,
                          onResend: handleResend,
                          onBack: backToPhone,
                        )
                      : PhoneLoginForm(
                          key: const ValueKey('phone'),
                          phoneController: phoneController,
                          phoneError: phoneError,
                          loading: loading,
                          onPhoneChanged: handlePhoneChanged,
                          onSendOtp: handleSendOtp,
                        ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
