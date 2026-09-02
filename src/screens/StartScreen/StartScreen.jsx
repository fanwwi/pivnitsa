import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import styles from "./StartScreen.styles";

const TOKEN_KEY = "accessToken";

export default function StartScreen() {
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(35)).current;
  const logoScale = useRef(new Animated.Value(0.82)).current;
  const buttonsTranslateY = useRef(new Animated.Value(60)).current;

  const glowOpacity = useRef(new Animated.Value(0.25)).current;
  const glowScale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          router.replace("/home");
          return;
        }
      } catch (error) {
        console.error("START AUTH CHECK ERROR:", error);
      }

      startAnimations();
    };

    checkAuth();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 900,
        delay: 150,
        useNativeDriver: true,
      }),

      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 900,
        delay: 150,
        useNativeDriver: true,
      }),

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        delay: 250,
        useNativeDriver: true,
      }),

      Animated.timing(buttonsTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.55,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.25,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
      ),

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowScale, {
            toValue: 1.05,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(glowScale, {
            toValue: 0.85,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <Image
        source={require("../../assets/startImage.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* MAIN DARK OVERLAY */}

      <LinearGradient
        colors={[
          "rgba(10, 9, 7, 0.48)",
          "rgba(20, 18, 14, 0.12)",
          "rgba(20, 18, 14, 0.25)",
          "rgba(10, 8, 5, 0.96)",
        ]}
        locations={[0, 0.35, 0.58, 1]}
        style={styles.overlay}
      />

      {/* CINEMATIC SIDE VIGNETTE */}

      <LinearGradient
        colors={["rgba(0, 0, 0, 0.52)", "transparent", "rgba(0, 0, 0, 0.48)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sideOverlay}
      />

      {/* GOLD GLOW */}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.glowWrapper,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      >
        <View style={styles.glow} />
      </Animated.View>

      {/* TOP DECORATION */}

      <Animated.View
        style={[
          styles.topDecoration,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }],
          },
        ]}
      >
        <View style={styles.decorationLine} />
        <View style={styles.decorationDiamond} />
        <View style={styles.decorationLine} />
      </Animated.View>

      {/* LOGO */}

      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: contentOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require("../../assets/logoWhite.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* BUTTONS */}

      <Animated.View
        style={[
          styles.bottom,
          {
            opacity: contentOpacity,
            transform: [{ translateY: buttonsTranslateY }],
          },
        ]}
      >
        {/* LOGIN */}

        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <LinearGradient
            colors={["#D2B477", "#B29259", "#96723F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryGradient}
          >
            <View style={styles.primaryGlow} />

            <View style={styles.buttonContent}>
              <Text style={styles.primaryText}>ВОЙТИ</Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* REGISTER */}

        <Pressable
          onPress={() => router.push("/register")}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <BlurView intensity={25} tint="dark" style={styles.blur} />

          <LinearGradient
            colors={["rgba(234, 227, 192, 0.12)", "rgba(178, 146, 89, 0.05)"]}
            style={styles.secondaryGradient}
          />

          <View style={styles.secondaryInner}>
            <Text style={styles.secondaryText}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
          </View>
        </Pressable>

        {/* SKIP */}

        <Pressable onPress={() => router.replace("/home")} style={styles.skip}>
          <Text style={styles.secondaryText}>Пропустить</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
