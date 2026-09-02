import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { LockKeyhole, ChevronLeft } from "lucide-react-native";

import styles from "./AuthRequired.styles";

export default function AuthRequired() {
  const handleLogin = () => {
    router.push("/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* BACK */}

      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <ChevronLeft size={22} color="#EAE3C0" strokeWidth={1.8} />
      </Pressable>

      {/* CONTENT */}

      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <LockKeyhole size={30} color="#B29259" strokeWidth={1.6} />
        </View>

        <Text style={styles.eyebrow}>ПИВНИЦА</Text>

        <Text style={styles.title}>Требуется вход</Text>

        <Text style={styles.description}>
          Чтобы воспользоваться этой функцией и забронировать столик,
          пожалуйста, войдите в свой аккаунт.
        </Text>

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.loginButtonText}>ВОЙТИ В АККАУНТ</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/home")}
          style={({ pressed }) => [
            styles.homeButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.homeButtonText}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</Text>
        </Pressable>
      </View>

      {/* FOOTER */}

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>ПИВНИЦА</Text>
      </View>
    </View>
  );
}
