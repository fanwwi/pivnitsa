import { useCallback, useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

const TOKEN_KEY = "accessToken";

const getErrorMessage = (data, fallback) => {
  return data?.message || fallback;
};

export default function useProfile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /**
   * =========================================================
   * LOAD PROFILE
   * =========================================================
   *
   * GET /api/v1/users/me
   */
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      /*
       * Если пользователь не авторизован,
       * просто считаем его гостем.
       *
       * НЕ отправляем автоматически на /login,
       * потому что /home доступен гостям.
       */
      if (!accessToken) {
        setUser(null);
        return null;
      }

      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      /*
       * Токен недействителен.
       */
      if (response.status === 401 || response.status === 403) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        return null;
      }

      if (!response.ok) {
        throw new Error(getErrorMessage(data, "Не удалось загрузить профиль"));
      }

      setUser(data);

      return data;
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);

      setError(err?.message || "Не удалось загрузить профиль");

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Загружаем профиль при использовании hook.
   */
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /**
   * =========================================================
   * UPDATE PROFILE
   * =========================================================
   *
   * PUT /api/v1/users/me
   *
   * Обновляет:
   * - firstName
   * - lastName
   * - email
   */
  const updateProfile = useCallback(async ({ firstName, lastName, email }) => {
    try {
      setSaving(true);
      setError("");

      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!accessToken) {
        router.replace("/authRequired");

        return null;
      }

      const trimmedFirstName = String(firstName || "").trim();

      const trimmedLastName = String(lastName || "").trim();

      const trimmedEmail = String(email || "").trim();

      /*
       * Валидация имени
       */
      if (!trimmedFirstName) {
        throw new Error("Введите имя");
      }

      if (trimmedFirstName.length > 100) {
        throw new Error("Имя не может быть длиннее 100 символов");
      }

      /*
       * Валидация фамилии
       */
      if (!trimmedLastName) {
        throw new Error("Введите фамилию");
      }

      if (trimmedLastName.length > 100) {
        throw new Error("Фамилия не может быть длиннее 100 символов");
      }

      /*
       * Валидация email
       */
      if (trimmedEmail.length > 255) {
        throw new Error("E-mail не может быть длиннее 255 символов");
      }

      if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error("Введите корректный e-mail");
      }

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
       * Токен недействителен.
       */
      if (response.status === 401 || response.status === 403) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        router.replace("/authRequired");

        return null;
      }

      if (!response.ok) {
        throw new Error(getErrorMessage(data, "Не удалось сохранить профиль"));
      }

      /*
       * Обновляем локального пользователя.
       */
      setUser(data);

      /*
       * ВАЖНО:
       * Здесь больше НЕТ router.replace("/home").
       *
       * Пользователь остаётся в профиле.
       */
      return data;
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);

      setError(err?.message || "Не удалось сохранить профиль");

      /*
       * Пробрасываем ошибку дальше,
       * чтобы SettingsSidebar / Modal
       * могли корректно её обработать.
       */
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  /**
   * =========================================================
   * SEND PHONE CHANGE OTP
   * =========================================================
   *
   * POST /api/v1/users/me/phone-change/send-otp
   */
  const sendPhoneChangeOtp = useCallback(
    async ({ newPhone, channel = "SMS" }) => {
      try {
        setError("");

        const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (!accessToken) {
          router.replace("/authRequired");

          return null;
        }

        const phone = String(newPhone || "").trim();

        /*
         * Кыргызстан:
         * +996XXXXXXXXX
         */
        if (!/^\+996\d{9}$/.test(phone)) {
          throw new Error("Введите номер в формате +996XXXXXXXXX");
        }

        const response = await fetch(
          `${API_URL}/api/v1/users/me/phone-change/send-otp`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPhone: phone,
              channel,
            }),
          },
        );

        const data = await response.json().catch(() => ({}));

        /*
         * Токен недействителен.
         */
        if (response.status === 401 || response.status === 403) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);

          setUser(null);

          router.replace("/authRequired");

          return null;
        }

        if (!response.ok) {
          const retryAfterSeconds =
            data?.retryAfterSeconds ?? response.headers.get("Retry-After");

          const error = new Error(
            getErrorMessage(data, "Не удалось отправить код"),
          );

          error.retryAfterSeconds = retryAfterSeconds
            ? Number(retryAfterSeconds)
            : null;

          error.status = response.status;

          throw error;
        }

        return {
          message: data?.message || "Код отправлен",

          retryAfterSeconds: data?.retryAfterSeconds || 0,

          newPhone: phone,
        };
      } catch (err) {
        console.error("SEND PHONE OTP ERROR:", err);

        setError(err?.message || "Не удалось отправить код");

        throw err;
      }
    },
    [],
  );

  /**
   * =========================================================
   * CONFIRM PHONE CHANGE
   * =========================================================
   *
   * POST /api/v1/users/me/phone-change/confirm
   */
  const confirmPhoneChange = useCallback(
    async ({ newPhone, code }) => {
      try {
        setError("");

        const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (!accessToken) {
          router.replace("/authRequired");

          return null;
        }

        const phone = String(newPhone || "").trim();

        const otpCode = String(code || "").trim();

        /*
         * Проверяем номер.
         */
        if (!/^\+996\d{9}$/.test(phone)) {
          throw new Error("Некорректный номер телефона");
        }

        /*
         * OTP должен состоять из 6 цифр.
         */
        if (!/^\d{6}$/.test(otpCode)) {
          throw new Error("Код должен состоять из 6 цифр");
        }

        const response = await fetch(
          `${API_URL}/api/v1/users/me/phone-change/confirm`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPhone: phone,
              code: otpCode,
            }),
          },
        );

        const data = await response.json().catch(() => ({}));

        /*
         * Токен недействителен.
         */
        if (response.status === 401 || response.status === 403) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);

          setUser(null);

          router.replace("/authRequired");

          return null;
        }

        if (!response.ok) {
          throw new Error(
            getErrorMessage(data, "Не удалось подтвердить номер"),
          );
        }

        /*
         * Backend может вернуть
         * новый accessToken.
         */
        if (data?.accessToken) {
          await SecureStore.setItemAsync(TOKEN_KEY, data.accessToken);
        }

        /*
         * Backend может вернуть
         * обновлённого пользователя.
         */
        if (data?.user) {
          setUser(data.user);
        } else {
          /*
           * Если user не вернулся,
           * просто перезагружаем профиль.
           */
          await loadProfile();
        }

        return data;
      } catch (err) {
        console.error("CONFIRM PHONE ERROR:", err);

        setError(err?.message || "Не удалось подтвердить номер");

        throw err;
      }
    },
    [loadProfile],
  );

  /**
   * =========================================================
   * LOGOUT
   * =========================================================
   *
   * POST /api/v1/auth/logout
   */
  const logout = useCallback(async () => {
    try {
      setSaving(true);
      setError("");

      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      /*
       * Токена уже нет.
       * Просто переводим приложение
       * в состояние гостя.
       */
      if (!accessToken) {
        setUser(null);

        router.replace("/home");

        return;
      }

      const response = await fetch(`${API_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      /*
       * 204 No Content —
       * успешный logout.
       */
      if (response.status === 204) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        router.replace("/home");

        return;
      }

      /*
       * 401 означает, что токен
       * уже недействителен.
       *
       * Всё равно очищаем локальную сессию.
       */
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        router.replace("/home");

        return;
      }

      const data = await response.json().catch(() => ({}));

      throw new Error(data?.message || "Не удалось выйти из аккаунта");
    } catch (err) {
      console.error("LOGOUT ERROR:", err);

      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  /**
   * =========================================================
   * DELETE ACCOUNT
   * =========================================================
   *
   * DELETE /api/v1/users/me
   */
  const deleteAccount = useCallback(async () => {
    try {
      setSaving(true);
      setError("");

      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      /*
       * Если токена нет —
       * пользователь уже гость.
       */
      if (!accessToken) {
        setUser(null);

        router.replace("/home");

        return;
      }

      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      /*
       * Любой 2xx считаем успешным удалением.
       */
      if (response.ok) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        router.replace("/home");

        return;
      }

      /*
       * Нельзя удалить аккаунт,
       * если есть активная бронь.
       */
      if (response.status === 409 || response.status === 422) {
        throw new Error(
          data?.message ||
            "Нельзя удалить аккаунт, пока у вас есть активная оплаченная бронь. Сначала дождитесь окончания брони.",
        );
      }

      /*
       * Токен недействителен.
       */
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setUser(null);

        router.replace("/home");

        return;
      }

      throw new Error(data?.message || "Не удалось удалить аккаунт");
    } catch (err) {
      console.error("DELETE ACCOUNT ERROR:", err);

      /*
       * SettingsSidebar получает
       * эту ошибку и показывает её
       * внутри DeleteModal.
       */
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  /**
   * =========================================================
   * RETURN
   * =========================================================
   */
  return {
    user,

    loading,
    saving,

    error,

    loadProfile,
    updateProfile,

    sendPhoneChangeOtp,
    confirmPhoneChange,

    logout,
    deleteAccount,
  };
}
