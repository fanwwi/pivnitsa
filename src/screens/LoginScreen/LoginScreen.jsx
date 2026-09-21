import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

import styles from "./LoginScreen.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

const TOKEN_KEY = "accessToken";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState("PHONE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Если аккаунт не найден
  const [accountNotFound, setAccountNotFound] = useState(false);

  // Реальный cooldown
  const [retryUntil, setRetryUntil] = useState(null);
  const [retryAfter, setRetryAfter] = useState(0);

  const otpInputRef = useRef(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;

  /*
   * INITIAL ANIMATION
   */

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /*
   * LIVE COOLDOWN
   *
   * Таймер считается от retryUntil, поэтому он
   * не зависит от количества ререндеров компонента.
   */

  useEffect(() => {
    if (!retryUntil) {
      setRetryAfter(0);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((retryUntil - Date.now()) / 1000),
      );

      setRetryAfter(remaining);

      if (remaining <= 0) {
        setRetryUntil(null);
      }
    };

    updateTimer();

    const timer = setInterval(updateTimer, 250);

    return () => clearInterval(timer);
  }, [retryUntil]);

  /*
   * CLEAR COOLDOWN ERROR
   */

  useEffect(() => {
    if (retryAfter === 0 && error.includes("Повторная отправка")) {
      setError("");
    }
  }, [retryAfter, error]);

  /*
   * PHONE VALIDATION
   */

  const isValidPhone = () => {
    return /^\+996\d{9}$/.test(phone);
  };

  /*
   * PHONE INPUT
   */

  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);

    setPhone(`+996${digits}`);

    setError("");
    setAccountNotFound(false);
  };

  /*
   * GO TO REGISTER
   */

  const goToRegister = () => {
    router.push("/register");
  };

  /*
   * SEND LOGIN OTP
   */

  const sendOtp = async () => {
    if (!isValidPhone()) {
      setAccountNotFound(false);
      setError("Введите корректный номер телефона");
      return;
    }

    if (retryAfter > 0 || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAccountNotFound(false);

      const response = await fetch(`${API_URL}/api/v1/auth/login/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          channel: "SMS",
        }),
      });

      const data = await response.json().catch(() => ({}));

      /*
       * COOLDOWN
       */

      if (response.status === 429) {
        const seconds =
          Number(data.retryAfterSeconds) ||
          Number(response.headers.get("Retry-After")) ||
          60;

        setRetryUntil(Date.now() + seconds * 1000);

        setError(`Повторная отправка будет доступна через ${seconds} сек.`);

        return;
      }

      /*
       * ACCOUNT NOT FOUND
       *
       * Backend может вернуть 404 или 400.
       */

      const backendMessage = String(
        data.message || data.error || "",
      ).toLowerCase();

      const isAccountNotFound =
        response.status === 404 ||
        backendMessage.includes("not found") ||
        backendMessage.includes("user not found") ||
        backendMessage.includes("user does not exist") ||
        backendMessage.includes("не зарегистрирован") ||
        backendMessage.includes("пользователь не найден") ||
        backendMessage.includes("аккаунт не найден");

      if (isAccountNotFound) {
        setAccountNotFound(true);
        setError("");
        return;
      }

      /*
       * OTHER ERROR
       */

      if (!response.ok) {
        throw new Error(
          data.message || "Не удалось отправить код. Проверьте номер телефона.",
        );
      }

      /*
       * OTP SENT
       */

      setStep("OTP");

      const cooldownSeconds =
        Number(data.retryAfterSeconds) ||
        Number(response.headers.get("Retry-After")) ||
        60;

      setRetryUntil(Date.now() + cooldownSeconds * 1000);

      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 300);
    } catch (err) {
      console.error("LOGIN SEND OTP ERROR:", err);

      setError(
        err.message || "Не удалось отправить код. Проверьте соединение.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * VERIFY LOGIN OTP
   */

  const verifyOtp = async (code) => {
    if (code.length !== 6 || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/v1/auth/login/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          code,
        }),
      });

      const data = await response.json().catch(() => ({}));

      /*
       * ACCOUNT NOT FOUND
       */

      const backendMessage = String(
        data.message || data.error || "",
      ).toLowerCase();

      const isAccountNotFound =
        response.status === 404 ||
        backendMessage.includes("not found") ||
        backendMessage.includes("user not found") ||
        backendMessage.includes("не зарегистрирован") ||
        backendMessage.includes("пользователь не найден") ||
        backendMessage.includes("аккаунт не найден");

      if (isAccountNotFound) {
        setOtp("");
        setAccountNotFound(true);
        setStep("PHONE");
        return;
      }

      /*
       * WRONG CODE
       */

      if (!response.ok) {
        setOtp("");
        setError(data.message || "Неверный код подтверждения");
        return;
      }

      /*
       * ACCESS TOKEN
       */

      const accessToken = data.accessToken;

      if (!accessToken) {
        setOtp("");
        setError("Сервер не вернул токен авторизации");
        return;
      }

      /*
       * SAVE TOKEN
       */

      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);

      /*
       * CHECK USER SESSION
       */

      const meResponse = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await meResponse.json().catch(() => ({}));

      /*
       * AUTHENTICATED
       */

      if (meResponse.status === 200) {
        console.log("AUTHENTICATED USER:", userData);

        router.replace("/home");

        return;
      }

      /*
       * INVALID TOKEN
       */

      if (meResponse.status === 401 || meResponse.status === 403) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setOtp("");
        setError("Сессия недействительна. Войдите снова.");

        return;
      }

      throw new Error(
        userData.message || "Не удалось получить данные пользователя",
      );
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setOtp("");

      setError("Не удалось войти. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * OTP INPUT
   */

  const handleOtpChange = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 6);

    setOtp(cleaned);
    setError("");
    setAccountNotFound(false);

    if (cleaned.length === 6) {
      verifyOtp(cleaned);
    }
  };

  /*
   * RESEND OTP
   */

  const resendOtp = async () => {
    if (retryAfter > 0 || loading) {
      return;
    }

    await sendOtp();
  };

  /*
   * BACK TO PHONE
   */

  const changePhone = () => {
    setStep("PHONE");
    setOtp("");
    setError("");
    setAccountNotFound(false);
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <Image
        source={require("../../assets/startimage.jpg")}
        style={styles.background}
        contentFit="cover"
      />

      {/* CINEMATIC OVERLAY */}

      <LinearGradient
        colors={[
          "rgba(8, 7, 5, 0.82)",
          "rgba(20, 18, 14, 0.48)",
          "rgba(10, 8, 5, 0.97)",
        ]}
        locations={[0, 0.45, 1]}
        style={styles.overlay}
      />

      {/* SIDE OVERLAY */}

      <LinearGradient
        colors={["rgba(0,0,0,0.42)", "transparent", "rgba(0,0,0,0.35)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sideOverlay}
      />

      {/* GLOW */}

      <View pointerEvents="none" style={styles.glowWrapper}>
        <View style={styles.glow} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* TOP */}

        <Animated.View
          style={[
            styles.top,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.decorationLine} />
          <View style={styles.diamond} />
          <View style={styles.decorationLine} />
        </Animated.View>

        {/* CONTENT */}

        <Animated.View
          style={[
            styles.content,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* LOGO */}

          <Animated.View
            style={{
              transform: [{ scale: logoScale }],
            }}
          >
            <Image
              source={require("../../assets/logoWhite.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </Animated.View>

          {/* PHONE */}

          {step === "PHONE" && (
            <>
              <Text style={styles.title}>С возвращением</Text>

              <Text style={styles.subtitle}>Пожалуйста, войдите в аккаунт</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.prefix}>+996</Text>

                <TextInput
                  value={phone.replace("+996", "")}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  placeholder="XXX XX XX XX"
                  placeholderTextColor="rgba(234,227,192,0.35)"
                  style={styles.phoneInput}
                  maxLength={9}
                  autoFocus
                />
              </View>

              {/* ACCOUNT NOT FOUND */}

              {accountNotFound && (
                <View style={styles.accountError}>
                  <Text style={styles.accountErrorTitle}>
                    Аккаунт не зарегистрирован
                  </Text>

                  <Text style={styles.accountErrorText}>
                    Номер телефона не найден. Зарегистрируйтесь, чтобы создать
                    аккаунт.
                  </Text>

                  <Pressable
                    onPress={goToRegister}
                    style={({ pressed }) => [
                      styles.registerButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.registerButtonText}>
                      ЗАРЕГИСТРИРОВАТЬСЯ
                    </Text>
                  </Pressable>
                </View>
              )}

              {!accountNotFound && (
                <Pressable
                  onPress={sendOtp}
                  disabled={loading || retryAfter > 0}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    retryAfter > 0 && styles.primaryButtonDisabled,
                  ]}
                >
                  <LinearGradient
                    colors={["#D2B477", "#B29259", "#96723F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryGradient}
                  >
                    {loading ? (
                      <ActivityIndicator color="#211A10" />
                    ) : retryAfter > 0 ? (
                      <Text style={styles.primaryText}>
                        ПОВТОРНО ЧЕРЕЗ {retryAfter} СЕК.
                      </Text>
                    ) : (
                      <Text style={styles.primaryText}>ПОЛУЧИТЬ КОД</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              )}

              {/* REGISTER DIRECTION */}

              <View style={styles.authSwitch}>
                <Text style={styles.authSwitchText}>Ещё нет аккаунта?</Text>

                <Pressable onPress={goToRegister}>
                  <Text style={styles.authSwitchLink}>Создать</Text>
                </Pressable>
              </View>
            </>
          )}

          {/* OTP */}

          {step === "OTP" && (
            <>
              <Text style={styles.title}>Введите код</Text>

              <Text style={styles.subtitle}>Код отправлен на</Text>

              <Text style={styles.phone}>{phone}</Text>

              <Pressable
                onPress={() => otpInputRef.current?.focus()}
                style={styles.otpContainer}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      otp.length === index && styles.otpBoxActive,
                      otp.length > index && styles.otpBoxFilled,
                    ]}
                  >
                    <Text style={styles.otpText}>{otp[index] || ""}</Text>
                  </View>
                ))}

                <TextInput
                  ref={otpInputRef}
                  value={otp}
                  onChangeText={handleOtpChange}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.hiddenInput}
                  autoFocus
                />
              </Pressable>

              <Text style={styles.hint}>Введите 6-значный код из SMS</Text>

              {loading && (
                <ActivityIndicator
                  color="#B29259"
                  size="small"
                  style={styles.loader}
                />
              )}

              {/* LIVE TIMER */}

              <Pressable
                onPress={resendOtp}
                disabled={retryAfter > 0 || loading}
              >
                <Text
                  style={[
                    styles.resend,
                    retryAfter > 0 && styles.resendDisabled,
                  ]}
                >
                  {retryAfter > 0
                    ? `Отправить снова через ${retryAfter} сек.`
                    : "Отправить код повторно"}
                </Text>
              </Pressable>

              {/* CHANGE PHONE */}

              <Pressable
                onPress={changePhone}
                disabled={loading}
                style={styles.changePhoneButton}
              >
                <Text style={styles.changePhoneText}>Изменить номер</Text>
              </Pressable>
            </>
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
