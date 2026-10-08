import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Check, Phone, X } from "lucide-react-native";
import * as SecureStore from "expo-secure-store";

import styles from "./EditProfileModal.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run/";

const TOKEN_KEY = "accessToken";

export default function EditProfileModal({ visible, user, onClose, onSaved }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Заполняем форму данными пользователя
   */
  useEffect(() => {
    if (!visible || !user) {
      return;
    }

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setError("");
  }, [visible, user]);

  /*
   * Проверка email
   */
  const isValidEmail = (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return true;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  };

  /*
   * Сохранение профиля
   */
  const handleSave = async () => {
    if (loading) {
      return;
    }

    setError("");

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    /*
     * Валидация имени
     */
    if (!trimmedFirstName) {
      setError("Введите имя");
      return;
    }

    if (trimmedFirstName.length > 100) {
      setError("Имя не может быть длиннее 100 символов");
      return;
    }

    /*
     * Валидация фамилии
     */
    if (!trimmedLastName) {
      setError("Введите фамилию");
      return;
    }

    if (trimmedLastName.length > 100) {
      setError("Фамилия не может быть длиннее 100 символов");
      return;
    }

    /*
     * Валидация email
     */
    if (trimmedEmail.length > 255) {
      setError("E-mail не может быть длиннее 255 символов");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Введите корректный e-mail");
      return;
    }

    try {
      setLoading(true);

      /*
       * Получаем access token
       */
      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!accessToken) {
        setError("Сессия истекла. Войдите в аккаунт снова.");
        return;
      }

      /*
       * PUT /api/v1/users/me
       */
      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail || null,
        }),
      });

      const data = await response.json().catch(() => ({}));

      /*
       * Токен больше недействителен
       */
      if (response.status === 401 || response.status === 403) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setError("Сессия истекла. Войдите в аккаунт снова.");

        return;
      }

      /*
       * Ошибка сервера
       */
      if (!response.ok) {
        setError(data?.message || "Не удалось сохранить профиль");

        return;
      }

      /*
       * УСПЕШНО
       *
       * data содержит обновлённый профиль.
       */
      onSaved?.(data);

      /*
       * Закрываем модальное окно
       */
      onClose?.();

      /*
       * Переходим на главную.
       *
       * replace, а не push:
       * пользователь не сможет нажатием Back
       * вернуться обратно в редактирование.
       */
      router.replace("/home");
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);

      setError(
        "Не удалось сохранить изменения. Проверьте интернет-соединение.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        if (!loading) {
          onClose?.();
        }
      }}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* BACKDROP */}

        <Pressable
          style={styles.backdrop}
          onPress={() => {
            if (!loading) {
              onClose?.();
            }
          }}
        />

        {/* MODAL */}

        <View style={styles.modal}>
          {/* HEADER */}

          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>ПИВНИЦА</Text>

              <Text style={styles.title}>Редактирование</Text>
            </View>

            <Pressable
              onPress={onClose}
              disabled={loading}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
            >
              <X size={20} color="#EAE3C0" strokeWidth={1.8} />
            </Pressable>
          </View>

          {/* CONTENT */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            {/* ИМЯ */}

            <View style={styles.field}>
              <Text style={styles.label}>ИМЯ</Text>

              <TextInput
                value={firstName}
                onChangeText={(value) => {
                  setFirstName(value);
                  setError("");
                }}
                placeholder="Введите имя"
                placeholderTextColor="rgba(234,227,192,0.25)"
                maxLength={100}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!loading}
                style={styles.input}
              />
            </View>

            {/* ФАМИЛИЯ */}

            <View style={styles.field}>
              <Text style={styles.label}>ФАМИЛИЯ</Text>

              <TextInput
                value={lastName}
                onChangeText={(value) => {
                  setLastName(value);
                  setError("");
                }}
                placeholder="Введите фамилию"
                placeholderTextColor="rgba(234,227,192,0.25)"
                maxLength={100}
                autoCapitalize="words"
                autoCorrect={false}
                editable={!loading}
                style={styles.input}
              />
            </View>

            {/* ТЕЛЕФОН */}

            <View style={styles.field}>
              <Text style={styles.label}>НОМЕР ТЕЛЕФОНА</Text>

              <View style={styles.readOnlyInput}>
                <Phone size={18} color="#B29259" strokeWidth={1.7} />

                <Text style={styles.phoneText}>
                  {user?.phone || "Номер не указан"}
                </Text>

                <Text style={styles.readOnly}>Только чтение</Text>
              </View>
            </View>

            {/* EMAIL */}

            <View style={styles.field}>
              <Text style={styles.label}>E-MAIL</Text>

              <TextInput
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError("");
                }}
                placeholder="example@mail.com"
                placeholderTextColor="rgba(234,227,192,0.25)"
                maxLength={255}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                style={styles.input}
              />

              <Text style={styles.hint}>E-mail можно оставить пустым.</Text>
            </View>

            {/* ERROR */}

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* SAVE */}

            <Pressable
              onPress={handleSave}
              disabled={loading}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && !loading && styles.saveButtonPressed,
                loading && styles.saveButtonDisabled,
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#211A10" />
              ) : (
                <>
                  <Check size={18} color="#211A10" strokeWidth={2.2} />

                  <Text style={styles.saveText}>СОХРАНИТЬ ИЗМЕНЕНИЯ</Text>
                </>
              )}
            </Pressable>

            <View style={styles.bottomSpace} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
