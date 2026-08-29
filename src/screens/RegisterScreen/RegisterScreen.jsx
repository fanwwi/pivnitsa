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
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import styles from "./RegisterScreen.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

export default function RegisterScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Живой cooldown
  const [retryUntil, setRetryUntil] = useState(null);
  const [retryAfter, setRetryAfter] = useState(0);

  const phoneInputRef = useRef(null);
  const otpInputRef = useRef(null);

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
   * OTP OVERLAY ANIMATION
   */

  useEffect(() => {
    if (step !== "OTP") return;

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
  }, [retryAfter]);

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

      /*
       * EXISTING USER
       */

      if (response.status === 409) {
        setError("Этот номер уже зарегистрирован. Войдите в свой аккаунт.");

        return;
      }

      /*
       * COOLDOWN
       */

      if (response.status === 429) {
        const seconds =
          data.retryAfterSeconds ||
          Number(response.headers.get("Retry-After")) ||
          60;

        setRetryUntil(Date.now() + seconds * 1000);

        setError(`Повторная отправка будет доступна через ${seconds} сек.`);

        return;
      }

      /*
       * OTHER ERROR
       */

      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить код");
      }

      /*
       * OTP SENT
       */

      setStep("OTP");

      const cooldownSeconds =
        data.retryAfterSeconds ||
        Number(response.headers.get("Retry-After")) ||
        60;

      setRetryUntil(Date.now() + cooldownSeconds * 1000);

      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 300);
    } catch (err) {
      setError(err.message || "Что-то пошло не так. Попробуйте ещё раз.");
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

      /*
       * INVALID CODE
       */

      if (!response.ok) {
        setOtp("");

        setError(data.message || "Неверный код подтверждения");

        return;
      }

      /*
       * PROFILE REQUIRED
       */

      if (data.stage === "PROFILE_REQUIRED") {
        router.replace("/login");
        return;
      }

      /*
       * FULL ACCESS
       */

      if (data.stage === "FULL_ACCESS") {
        router.replace("/home");
        return;
      }

      /*
       * UNKNOWN STAGE
       */

      setError("Неизвестное состояние авторизации");
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

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <Image
        source={require("../../assets/startImage.png")}
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

      {/* OTP EXTRA DARK OVERLAY */}

      {step === "OTP" && (
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
                />
              </View>

              <Pressable
                onPress={sendOtp}
                disabled={loading}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
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
                    <Text style={styles.primaryText}>ПОЛУЧИТЬ КОД</Text>
                  )}
                </LinearGradient>
              </Pressable>
            </>
          )}

          {/* OTP */}

          {step === "OTP" && (
            <Animated.View
              style={{
                width: "100%",
                alignItems: "center",
                transform: [
                  {
                    scale: otpContentScale,
                  },
                ],
              }}
            >
              {/* GLASS CARD */}

              <View style={styles.otpCard}>
                <BlurView intensity={35} tint="dark" style={styles.otpBlur} />

                <LinearGradient
                  colors={["rgba(255,255,255,0.08)", "rgba(178,146,89,0.025)"]}
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
                </View>
              </View>
            </Animated.View>
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
