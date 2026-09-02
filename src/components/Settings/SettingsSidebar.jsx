import { useState } from "react";
import { LogOut, Trash2, UserRound, X } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./SettingsSidebar.styles";
import EditProfileModal from "../EditProfileModal/EditPorfileModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LogoutModal from "../LogoutModal/LogoutModal";


export default function SettingsSidebar({
  visible,
  onClose,
  user,
  saving,
  error,
  onSaveProfile,
  onLogout,
  onDeleteAccount,
}) {
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [logoutVisible, setLogoutVisible] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [deleteError, setDeleteError] = useState("");

  // =========================
  // EDIT PROFILE
  // =========================

  const handleEditProfile = () => {
    setEditProfileVisible(true);
  };

  const handleCloseEditProfile = () => {
    if (saving) {
      return;
    }

    setEditProfileVisible(false);
  };

  const handleSaveProfile = async (data) => {
    try {
      await onSaveProfile?.(data);
      setEditProfileVisible(false);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const handleCloseLogout = () => {
    if (logoutLoading) {
      return;
    }

    setLogoutVisible(false);
  };

  const handleConfirmLogout = async () => {
    if (logoutLoading) {
      return;
    }

    try {
      setLogoutLoading(true);

      await onLogout?.();

      setLogoutVisible(false);
      onClose?.();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================

  const handleDeleteAccount = () => {
    setDeleteError("");
    setDeleteVisible(true);
  };

  const handleCloseDelete = () => {
    if (deleteLoading) {
      return;
    }

    setDeleteVisible(false);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (deleteLoading) {
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await onDeleteAccount?.();

      setDeleteVisible(false);
      setDeleteError("");
      onClose?.();
    } catch (error) {
      console.error("DELETE ACCOUNT ERROR:", error);

      setDeleteError(
        error?.message || "Не удалось удалить аккаунт. Попробуйте ещё раз.",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {/* =========================
          SETTINGS SIDEBAR
      ========================= */}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          {/* BACKDROP */}

          <Pressable
            style={styles.backdrop}
            onPress={() => {
              if (!saving && !logoutLoading && !deleteLoading) {
                onClose?.();
              }
            }}
          />

          {/* SIDEBAR */}

          <View style={styles.sidebar}>
            {/* HEADER */}

            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>ПИВНИЦА</Text>

                <Text style={styles.title}>Настройки</Text>
              </View>

              <Pressable
                onPress={onClose}
                disabled={saving || logoutLoading || deleteLoading}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
              >
                <X size={21} color="#EAE3C0" strokeWidth={1.8} />
              </Pressable>
            </View>

            {/* MENU */}

            <View style={styles.menu}>
              {/* EDIT PROFILE */}

              <Pressable
                onPress={handleEditProfile}
                disabled={saving || logoutLoading || deleteLoading}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <UserRound size={21} color="#B29259" strokeWidth={1.7} />
                </View>

                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>Изменение аккаунта</Text>

                  <Text style={styles.menuDescription}>
                    Имя, фамилия и e-mail
                  </Text>
                </View>
              </Pressable>

              {/* LOGOUT */}

              <Pressable
                onPress={handleLogout}
                disabled={saving || logoutLoading || deleteLoading}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
              >
                <View style={[styles.iconWrapper, styles.logoutIconWrapper]}>
                  <LogOut size={21} color="#C98577" strokeWidth={1.7} />
                </View>

                <View style={styles.menuContent}>
                  <Text style={[styles.menuTitle, styles.logoutTitle]}>
                    Выйти из аккаунта
                  </Text>

                  <Text style={styles.menuDescription}>
                    Завершить текущую сессию
                  </Text>
                </View>
              </Pressable>

              {/* DELETE */}

              <Pressable
                onPress={handleDeleteAccount}
                disabled={saving || logoutLoading || deleteLoading}
                style={({ pressed }) => [
                  styles.menuItem,
                  styles.deleteItem,
                  pressed && styles.menuItemPressed,
                ]}
              >
                <View style={[styles.iconWrapper, styles.deleteIconWrapper]}>
                  <Trash2 size={21} color="#B86B5D" strokeWidth={1.7} />
                </View>

                <View style={styles.menuContent}>
                  <Text style={[styles.menuTitle, styles.deleteTitle]}>
                    Удалить аккаунт
                  </Text>

                  <Text style={styles.menuDescription}>
                    Безвозвратно удалить профиль
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* FOOTER */}

            <View style={styles.footer}>
              <Text style={styles.footerBrand}>ПИВНИЦА</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* EDIT PROFILE */}

      <EditProfileModal
        visible={editProfileVisible}
        user={user}
        saving={saving}
        error={error}
        onClose={handleCloseEditProfile}
        onSave={handleSaveProfile}
      />

      {/* LOGOUT */}

      <LogoutModal
        visible={logoutVisible}
        loading={logoutLoading}
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
      />

      {/* DELETE ACCOUNT */}

      <DeleteModal
        visible={deleteVisible}
        loading={deleteLoading}
        error={deleteError}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
