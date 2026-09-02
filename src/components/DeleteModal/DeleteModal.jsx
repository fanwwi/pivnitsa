import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { AlertTriangle, Trash2, X } from "lucide-react-native";

import styles from "./DeleteModal.styles";

export default function DeleteModal({
  visible,
  loading = false,
  error = "",
  onClose,
  onConfirm,
}) {
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    if (!visible) {
      setConfirmation("");
    }
  }, [visible]);

  const canDelete = confirmation.trim().toLowerCase() === "удалить";

  const handleClose = () => {
    if (loading) {
      return;
    }

    setConfirmation("");
    onClose?.();
  };

  const handleConfirm = () => {
    if (!canDelete || loading) {
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
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={styles.modal}>
          {/* ICON */}

          <View style={styles.iconWrapper}>
            <AlertTriangle size={25} color="#B86B5D" strokeWidth={1.7} />
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

          <Text style={styles.eyebrow}>ОПАСНАЯ ЗОНА</Text>

          <Text style={styles.title}>Удалить аккаунт?</Text>

          <Text style={styles.description}>
            Это действие нельзя отменить. Ваш профиль, история броней и
            связанные с аккаунтом данные будут удалены без возможности
            восстановления.
          </Text>

          {/* WARNING */}

          <View
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              padding: 12,
              borderRadius: 12,
              backgroundColor: "rgba(184,107,93,0.08)",
              borderWidth: 1,
              borderColor: "rgba(184,107,93,0.16)",
            }}
          >
            <Text
              style={{
                color: "#C98577",
                fontSize: 12,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              Если у вас есть активная оплаченная бронь, удалить аккаунт не
              получится.
            </Text>
          </View>

          {/* ERROR */}

          {!!error && (
            <View
              style={{
                width: "100%",
                marginBottom: 16,
                paddingHorizontal: 12,
                paddingVertical: 11,
                borderRadius: 12,
                backgroundColor: "rgba(184,107,93,0.12)",
                borderWidth: 1,
                borderColor: "rgba(184,107,93,0.22)",
              }}
            >
              <Text
                style={{
                  color: "#D99687",
                  fontSize: 12,
                  lineHeight: 18,
                  textAlign: "center",
                }}
              >
                {error}
              </Text>
            </View>
          )}

          {/* CONFIRMATION */}

          <Text style={styles.confirmLabel}>
            Введите «удалить» для подтверждения
          </Text>

          <TextInput
            value={confirmation}
            onChangeText={setConfirmation}
            placeholder="удалить"
            placeholderTextColor="rgba(234,227,192,0.22)"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            style={styles.input}
          />

          {/* BUTTONS */}

          <View style={styles.buttons}>
            <Pressable
              onPress={handleClose}
              disabled={loading}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.cancelText}>ОТМЕНА</Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              disabled={!canDelete || loading}
              style={({ pressed }) => [
                styles.deleteButton,
                !canDelete && styles.deleteButtonDisabled,
                pressed && canDelete && styles.deletePressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#EAE3C0" />
              ) : (
                <>
                  <Trash2 size={17} color="#EAE3C0" strokeWidth={2} />

                  <Text style={styles.deleteText}>УДАЛИТЬ</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
