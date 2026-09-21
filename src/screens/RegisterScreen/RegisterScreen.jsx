import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import styles from "./RegisterScreen.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

const TOKEN_KEY = "accessToken";
const REGISTRATION_TOKEN_KEY = "registrationToken";

export default function RegisterScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [step, setStep] = useState("PHONE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isRegistered, setIsRegistered] = useState(false);

  const [retryUntil, setRetryUntil] = useState(null);
  const [retryAfter, setRetryAfter] = useState(0);

  const phoneInputRef = useRef(null);
  const otpInputRef = useRef(null);
  const firstNameInputRef = useRef(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;

  const otpOverlayOpacity = useRef(new Animated.Value(0)).current;
  const otpContentScale = useRef(new Animated.Value(0.96)).current;

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
   * STEP ANIMATION
   */

  useEffect(() => {
    if (step !== "OTP" && step !== "PROFILE") {
      return;
    }

    otpOverlayOpacity.setValue(0);
    otpContentScale.setValue(0.96);

    Animated.parallel([
      Animated.timing(otpOverlayOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.spring(otpContentScale, {
        toValue: 1,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    if (step === "PROFILE") {
      setTimeout(() => {
        firstNameInputRef.current?.focus();
      }, 350);
    }
  }, [step]);

  /*
   * LIVE OTP COOLDOWN
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
   * REMOVE COOLDOWN ERROR
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
    setIsRegistered(false);
  };

  /*
   * COOLDOWN
   */

  const getCooldownSeconds = (data, response) => {
    const fromBody =
      Number(data?.retryAfterSeconds) ||
      Number(data?.retry_after) ||
      Number(data?.retryAfter);

    const fromHeader = Number(response.headers.get("Retry-After")) || 0;

    return fromBody || fromHeader || 60;
  };

  /*
   * BACKEND ERROR
   */

  const getErrorMessage = (data, fallback) => {
    return data?.message || data?.detail || data?.error || fallback;
  };

  /*
   * EXISTING USER
   */

  const isExistingUserError = (response, data) => {
    if (response.status === 409) {
      return true;
    }

    const message = String(
      data?.message || data?.detail || data?.error || "",
    ).toLowerCase();

    return (
      message.includes("already registered") ||
      message.includes("already exists") ||
      message.includes("phone exists") ||
      message.includes("phone already") ||
      message.includes("номер уже зарегистрирован") ||
      message.includes("номер уже существует") ||
      message.includes("пользователь уже зарегистрирован")
    );
  };

  /*
   * EXTRACT TOKEN
   */

  const extractToken = (data) => {
    return data?.accessToken || data?.access_token || data?.token || null;
  };

  /*
   * SAVE REGISTRATION TOKEN
   */

  const saveRegistrationToken = async (data) => {
    const token = extractToken(data);

    if (!token) {
      throw new Error("Сервер не вернул токен регистрации");
    }

    await SecureStore.setItemAsync(REGISTRATION_TOKEN_KEY, token);

    return token;
  };

  /*
   * SAVE FINAL ACCESS TOKEN
   */

  const saveAccessToken = async (data) => {
    const token = extractToken(data);

    if (!token) {
      throw new Error("Сервер не вернул токен авторизации");
    }

    await SecureStore.setItemAsync(TOKEN_KEY, token);

    await SecureStore.deleteItemAsync(REGISTRATION_TOKEN_KEY);

    return token;
  };

  /*
   * SEND OTP
   */

  const sendOtp = async () => {
    if (!isValidPhone()) {
      setError("Введите корректный номер телефона");
      return;
    }

    if (retryAfter > 0 || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setIsRegistered(false);

      const response = await fetch(`${API_URL}/api/v1/auth/send-otp`, {
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

      console.log("SEND OTP:", response.status, data);

      /*
       * EXISTING USER
       */

      if (isExistingUserError(response, data)) {
        setIsRegistered(true);

        setError("Этот номер уже зарегистрирован. Войдите в свой аккаунт.");

        return;
      }

      /*
       * COOLDOWN
       */

      if (response.status === 429) {
        const seconds = getCooldownSeconds(data, response);

        setRetryUntil(Date.now() + seconds * 1000);

        setError(`Повторная отправка будет доступна через ${seconds} сек.`);

        return;
      }

      /*
       * VALIDATION / OTHER ERROR
       */

      if (!response.ok) {
        throw new Error(getErrorMessage(data, "Не удалось отправить код"));
      }

      /*
       * OTP SENT
       */

      setOtp("");
      setStep("OTP");

      const cooldownSeconds = getCooldownSeconds(data, response);

      setRetryUntil(Date.now() + cooldownSeconds * 1000);

      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 300);
    } catch (err) {
      console.error("SEND OTP ERROR:", err);

      setError(err?.message || "Что-то пошло не так. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * VERIFY OTP
   */

  const verifyOtp = async (code) => {
    if (code.length !== 6 || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/v1/auth/verify-otp`, {
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

      console.log("VERIFY OTP:", response.status, data);

      /*
       * INVALID / EXPIRED / LOCKED / USED CODE
       */

      if (!response.ok) {
        setOtp("");

        setError(getErrorMessage(data, "Неверный код подтверждения"));

        return;
      }

      /*
       * EXISTING USER
       */

      if (data.stage === "LOGIN_REQUIRED" || data.stage === "EXISTING_USER") {
        setIsRegistered(true);

        setError("Этот номер уже зарегистрирован. Войдите в аккаунт.");

        return;
      }

      /*
       * NEW USER
       *
       * Сохраняем ВРЕМЕННЫЙ registration token.
       * Это НЕ полноценный accessToken.
       */

      if (data.stage === "PROFILE_REQUIRED") {
        try {
          await saveRegistrationToken(data);
        } catch (tokenError) {
          console.error("REGISTRATION TOKEN ERROR:", tokenError);

          setError(tokenError?.message || "Не удалось начать регистрацию");

          return;
        }

        setError("");
        setStep("PROFILE");

        return;
      }

      /*
       * FULL ACCESS
       *
       * На случай, если backend сразу
       * авторизовал пользователя.
       */

      if (data.stage === "FULL_ACCESS") {
        await saveAccessToken(data);

        router.replace("/home");
        return;
      }

      /*
       * SUCCESS WITHOUT STAGE
       */

      if (extractToken(data)) {
        await saveAccessToken(data);

        router.replace("/home");
        return;
      }

      /*
       * UNKNOWN STAGE
       */

      setError("Неизвестное состояние регистрации");
    } catch (err) {
      console.error("REGISTER VERIFY ERROR:", err);

      setOtp("");

      setError("Не удалось подтвердить код. Проверьте соединение.");
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

    if (cleaned.length === 6) {
      verifyOtp(cleaned);
    }
  };

  /*
   * RESEND
   */

  const resendOtp = async () => {
    if (retryAfter > 0 || loading) {
      return;
    }

    await sendOtp();
  };

  /*
   * CHANGE PHONE
   */

  const changePhone = async () => {
    if (loading) {
      return;
    }

    await SecureStore.deleteItemAsync(REGISTRATION_TOKEN_KEY);

    setStep("PHONE");
    setOtp("");
    setFirstName("");
    setLastName("");
    setTermsAccepted(false);
    setPrivacyAccepted(false);
    setError("");
    setRetryUntil(null);
  };

  /*
   * PROFILE VALIDATION
   */

  const validateProfile = () => {
    const normalizedFirstName = firstName.trim();

    const normalizedLastName = lastName.trim();

    if (!normalizedFirstName) {
      setError("Введите имя");
      return false;
    }

    if (!normalizedLastName) {
      setError("Введите фамилию");
      return false;
    }

    if (normalizedFirstName.length > 100) {
      setError("Имя не должно быть длиннее 100 символов");
      return false;
    }

    if (normalizedLastName.length > 100) {
      setError("Фамилия не должна быть длиннее 100 символов");
      return false;
    }

    if (!termsAccepted) {
      setError("Необходимо принять условия оферты");
      return false;
    }

    if (!privacyAccepted) {
      setError("Необходимо принять политику конфиденциальности");
      return false;
    }

    return true;
  };

  /*
   * COMPLETE PROFILE
   */

  const completeProfile = async () => {
    if (loading) {
      return;
    }

    setError("");

    if (!validateProfile()) {
      return;
    }

    try {
      setLoading(true);

      const registrationToken = await SecureStore.getItemAsync(
        REGISTRATION_TOKEN_KEY,
      );

      if (!registrationToken) {
        setError("Сессия регистрации истекла. Начните регистрацию заново.");

        setStep("PHONE");
        return;
      }

      const response = await fetch(`${API_URL}/api/v1/auth/complete-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registrationToken}`,
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          termsAccepted: true,
          privacyAccepted: true,
        }),
      });

      const data = await response.json().catch(() => ({}));

      console.log("COMPLETE PROFILE:", response.status, data);

      /*
       * EXPIRED / INVALID REGISTRATION TOKEN
       */

      if (response.status === 401 || response.status === 403) {
        await SecureStore.deleteItemAsync(REGISTRATION_TOKEN_KEY);

        setError("Сессия регистрации истекла. Начните регистрацию заново.");

        setStep("PHONE");

        return;
      }

      /*
       * VALIDATION / LEGAL ERROR
       */

      if (!response.ok) {
        setError(getErrorMessage(data, "Не удалось завершить регистрацию"));

        return;
      }

      /*
       * AUTHENTICATED
       */

      if (data.stage === "AUTHENTICATED" || extractToken(data)) {
        await saveAccessToken(data);

        router.replace("/home");

        return;
      }

      /*
       * UNKNOWN SUCCESS
       */

      setError("Регистрация завершена, но сервер не вернул токен авторизации.");
    } catch (err) {
      console.error("COMPLETE PROFILE ERROR:", err);

      setError("Не удалось завершить регистрацию. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * LOGIN
   */

  const goToLogin = () => {
    router.push("/login");
  };

  /*
   * CHECKBOX
   */

  const Checkbox = ({ checked, onPress }) => {
    return (
      <Pressable
        onPress={onPress}
        disabled={loading}
        style={styles.checkboxRow}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <Image
        source={require("../../assets/startimage.jpg")}
        style={styles.background}
        contentFit="cover"
      />

      {/* BASE OVERLAY */}

      <LinearGradient
        colors={[
          "rgba(10, 9, 7, 0.76)",
          "rgba(20, 18, 14, 0.38)",
          "rgba(10, 8, 5, 0.96)",
        ]}
        locations={[0, 0.45, 1]}
        style={styles.overlay}
      />

      {/* EXTRA DARK OVERLAY */}

      {(step === "OTP" || step === "PROFILE") && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.otpOverlay,
            {
              opacity: otpOverlayOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={[
              "rgba(5, 4, 2, 0.25)",
              "rgba(10, 8, 5, 0.58)",
              "rgba(5, 4, 2, 0.94)",
            ]}
            locations={[0, 0.5, 1]}
            style={styles.otpOverlayGradient}
          />

          <View style={styles.otpGlowWrapper}>
            <View style={styles.otpGlow} />
          </View>
        </Animated.View>
      )}

      {/* GOLD GLOW */}

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
              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}
        >
          <View style={styles.decorationLine} />

          <View style={styles.diamond} />

          <View style={styles.decorationLine} />
        </Animated.View>

        {/* CONTENT */}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
          >
            {/* LOGO */}

            <Animated.View
              style={{
                transform: [
                  {
                    scale: logoScale,
                  },
                ],
              }}
            >
              <Image
                source={require("../../assets/logoWhite.png")}
                style={styles.logo}
                contentFit="contain"
              />
            </Animated.View>

            {/* ========================= */}
            {/* PHONE */}
            {/* ========================= */}

            {step === "PHONE" && (
              <>
                <Text style={styles.title}>Создайте аккаунт</Text>

                <Text style={styles.subtitle}>Введите номер телефона</Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.prefix}>+996</Text>

                  <TextInput
                    ref={phoneInputRef}
                    value={phone.replace("+996", "")}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    placeholder="XXX XX XX XX"
                    placeholderTextColor="rgba(234,227,192,0.35)"
                    style={styles.phoneInput}
                    maxLength={9}
                    autoFocus
                    editable={!loading}
                  />
                </View>

                <Pressable
                  onPress={sendOtp}
                  disabled={loading || retryAfter > 0 || isRegistered}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    (loading || retryAfter > 0 || isRegistered) &&
                      styles.buttonDisabled,
                  ]}
                >
                  <LinearGradient
                    colors={["#D2B477", "#B29259", "#96723F"]}
                    start={{
                      x: 0,
                      y: 0,
                    }}
                    end={{
                      x: 1,
                      y: 1,
                    }}
                    style={styles.primaryGradient}
                  >
                    {loading ? (
                      <ActivityIndicator color="#211A10" />
                    ) : retryAfter > 0 ? (
                      <Text style={styles.primaryText}>
                        ПОВТОРИТЬ ЧЕРЕЗ {retryAfter} СЕК.
                      </Text>
                    ) : (
                      <Text style={styles.primaryText}>ПОЛУЧИТЬ КОД</Text>
                    )}
                  </LinearGradient>
                </Pressable>

                <Pressable
                  onPress={goToLogin}
                  disabled={loading}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginText}>
                    Уже есть аккаунт?{" "}
                    <Text style={styles.loginAccent}>Войти</Text>
                  </Text>
                </Pressable>

                {isRegistered && (
                  <Pressable
                    onPress={goToLogin}
                    style={styles.registeredButton}
                  >
                    <Text style={styles.registeredButtonText}>
                      ВОЙТИ В АККАУНТ
                    </Text>
                  </Pressable>
                )}
              </>
            )}

            {/* ========================= */}
            {/* OTP */}
            {/* ========================= */}

            {step === "OTP" && (
              <Animated.View
                style={[
                  {
                    width: "100%",
                    alignItems: "center",
                  },
                  {
                    transform: [
                      {
                        scale: otpContentScale,
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.otpCard}>
                  <BlurView intensity={35} tint="dark" style={styles.otpBlur} />

                  <LinearGradient
                    colors={[
                      "rgba(255,255,255,0.08)",
                      "rgba(178,146,89,0.025)",
                    ]}
                    style={styles.otpCardGradient}
                  />

                  <View style={styles.otpCardContent}>
                    <Text style={styles.otpTitle}>Подтвердите номер</Text>

                    <Text style={styles.phone}>{phone}</Text>

                    <Pressable
                      onPress={() => otpInputRef.current?.focus()}
                      style={styles.otpContainer}
                    >
                      {Array.from({
                        length: 6,
                      }).map((_, index) => (
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
                        editable={!loading}
                      />
                    </Pressable>

                    <Text style={styles.hint}>
                      Введите 6-значный код из SMS
                    </Text>

                    {loading && (
                      <ActivityIndicator
                        color="#B29259"
                        size="small"
                        style={styles.loader}
                      />
                    )}

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

                    <Pressable onPress={changePhone} disabled={loading}>
                      <Text style={styles.changePhone}>Изменить номер</Text>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            )}

            {/* ========================= */}
            {/* PROFILE */}
            {/* ========================= */}

            {step === "PROFILE" && (
              <Animated.View
                style={[
                  styles.profileWrapper,
                  {
                    transform: [
                      {
                        scale: otpContentScale,
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.profileCard}>
                  <BlurView
                    intensity={35}
                    tint="dark"
                    style={styles.profileBlur}
                  />

                  <LinearGradient
                    colors={[
                      "rgba(255,255,255,0.08)",
                      "rgba(178,146,89,0.025)",
                    ]}
                    style={styles.profileGradient}
                  />

                  <View style={styles.profileContent}>
                    <Text style={styles.profileTitle}>Почти готово</Text>

                    <Text style={styles.profileSubtitle}>
                      Расскажите немного о себе
                    </Text>

                    <TextInput
                      ref={firstNameInputRef}
                      value={firstName}
                      onChangeText={(value) => {
                        setFirstName(value);
                        setError("");
                      }}
                      placeholder="Введите имя"
                      placeholderTextColor="rgba(234,227,192,0.35)"
                      style={styles.profileInput}
                      autoCapitalize="words"
                      editable={!loading}
                      maxLength={100}
                    />

                    <TextInput
                      value={lastName}
                      onChangeText={(value) => {
                        setLastName(value);
                        setError("");
                      }}
                      placeholder="Введите фамилию"
                      placeholderTextColor="rgba(234,227,192,0.35)"
                      style={styles.profileInput}
                      autoCapitalize="words"
                      editable={!loading}
                      maxLength={100}
                      returnKeyType="done"
                    />

                    <View style={styles.legalSection}>
                      <View style={styles.legalItem}>
                        <Checkbox
                          checked={termsAccepted}
                          onPress={() => {
                            setTermsAccepted(!termsAccepted);
                            setError("");
                          }}
                        />

                        <Pressable
                          onPress={() => {
                            setTermsAccepted(!termsAccepted);
                            setError("");
                          }}
                          style={styles.legalTextWrapper}
                        >
                          <Text style={styles.legalText}>
                            Я принимаю{" "}
                            <Text style={styles.legalAccent}>
                              условия оферты
                            </Text>
                          </Text>
                        </Pressable>
                      </View>

                      <View style={styles.legalItem}>
                        <Checkbox
                          checked={privacyAccepted}
                          onPress={() => {
                            setPrivacyAccepted(!privacyAccepted);
                            setError("");
                          }}
                        />

                        <Pressable
                          onPress={() => {
                            setPrivacyAccepted(!privacyAccepted);
                            setError("");
                          }}
                          style={styles.legalTextWrapper}
                        >
                          <Text style={styles.legalText}>
                            Я принимаю{" "}
                            <Text style={styles.legalAccent}>
                              политику конфиденциальности
                            </Text>
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    <Pressable
                      onPress={completeProfile}
                      disabled={loading}
                      style={({ pressed }) => [
                        styles.primaryButton,
                        styles.profileButton,
                        pressed && styles.buttonPressed,
                        loading && styles.buttonDisabled,
                      ]}
                    >
                      <LinearGradient
                        colors={["#D2B477", "#B29259", "#96723F"]}
                        start={{
                          x: 0,
                          y: 0,
                        }}
                        end={{
                          x: 1,
                          y: 1,
                        }}
                        style={styles.primaryGradient}
                      >
                        {loading ? (
                          <ActivityIndicator color="#211A10" />
                        ) : (
                          <Text style={styles.primaryText}>ЗАВЕРШИТЬ</Text>
                        )}
                      </LinearGradient>
                    </Pressable>

                    <Pressable onPress={changePhone} disabled={loading}>
                      <Text style={styles.changePhone}>Изменить номер</Text>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            )}

            {!!error && <Text style={styles.error}>{error}</Text>}

            {/* LOGIN AFTER ERROR */}

            {step === "PHONE" && isRegistered && !!error && (
              <Pressable onPress={goToLogin} style={styles.errorLoginButton}>
                <Text style={styles.errorLoginButtonText}>
                  Войти с этим номером →
                </Text>
              </Pressable>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
