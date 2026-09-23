import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:delivery_partner_app/core/theme/app_colors.dart';
import 'package:delivery_partner_app/features/profile/controllers/profile_controller.dart';
import 'package:delivery_partner_app/features/profile/widgets/profile_page_content.dart';
import 'package:delivery_partner_app/features/profile/widgets/profile_header.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<ProfileController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Obx(() {
          if (controller.isLoading.value) {
            return const Center(child: CircularProgressIndicator());
          }

          final profile = controller.profile.value;

          if (profile == null) {
            return const Center(child: Text('Unable to load profile'));
          }

          return Stack(
            children: [
              Column(
                children: [
                  Obx(
                    () => ProfileHeader(
                      profile: profile,
                      editing: controller.isEditing.value,
                      isSaving: controller.isSaving.value,
                      onEdit: controller.startEditing,
                      onCancel: controller.cancelEditing,
                      onSave: controller.saveProfile,
                    ),
                  ),

                  Expanded(
                    child: Obx(
                      () => ProfilePageContent(
                        controller: controller,
                        profile: profile,
                        editing: controller.isEditing.value,
                      ),
                    ),
                  ),
                ],
              ),

              Obx(() {
                if (!controller.showSavedMessage.value) {
                  return const SizedBox.shrink();
                }

                return const Positioned(
                  left: 0,
                  right: 0,
                  bottom: 16,
                  child: Center(child: _ProfileSavedMessage()),
                );
              }),
            ],
          );
        }),
      ),
    );
  }
}

class _ProfileSavedMessage extends StatelessWidget {
  const _ProfileSavedMessage();

  @override
  Widget build(BuildContext context) {
    return Positioned(
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.success,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.check, size: 16, color: Colors.white),
            const SizedBox(width: 8),
            Text(
              'Profile updated',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
