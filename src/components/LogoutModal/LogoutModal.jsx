import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { LogOut, X } from "lucide-react-native";

import styles from "./LogoutModal.styles";

export default function LogoutModal({
  visible,
  loading = false,
  onClose,
  onConfirm,
}) {
  const handleClose = () => {
    if (loading) {
      return;
    }

    onClose?.();
  };

  const handleConfirm = () => {
    if (loading) {
      return;
    }

    onConfirm?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {/* BACKDROP */}

        <Pressable style={styles.backdrop} onPress={handleClose} />

        {/* MODAL */}

        <View style={styles.modal}>
          {/* ICON */}

          <View style={styles.iconWrapper}>
            <LogOut size={24} color="#C98577" strokeWidth={1.7} />
          </View>

          {/* CLOSE */}

          <Pressable
            onPress={handleClose}
            disabled={loading}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <X size={18} color="#EAE3C0" strokeWidth={1.8} />
          </Pressable>

          {/* TEXT */}

          <Text style={styles.eyebrow}>ПИВНИЦА</Text>

          <Text style={styles.title}>Выйти из аккаунта?</Text>

          <Text style={styles.description}>
            Текущая сессия будет завершена. Вы сможете войти в аккаунт снова в
            любое время.
          </Text>

          {/* BUTTONS */}

          <View style={styles.buttons}>
            {/* CANCEL */}

            <Pressable
              onPress={handleClose}
              disabled={loading}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.cancelText}>ОСТАТЬСЯ</Text>
            </Pressable>

            {/* LOGOUT */}

            <Pressable
              onPress={handleConfirm}
              disabled={loading}
              style={({ pressed }) => [
                styles.logoutButton,
                pressed && styles.dangerPressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#211A10" />
              ) : (
                <>
                  <LogOut size={17} color="#211A10" strokeWidth={2} />

                  <Text style={styles.logoutText}>ВЫЙТИ</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
