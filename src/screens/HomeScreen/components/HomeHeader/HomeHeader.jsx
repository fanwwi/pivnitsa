import { Animated, Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";

import styles from "./HomeHeader.styles";

export default function HomeHeader({ user, opacity }) {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity,
        },
      ]}
    >
      <Pressable
        onPress={() => router.push("/profile")}
        style={({ pressed }) => [
          styles.profileButton,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../../../../assets/panda.png")}
            style={styles.avatar}
          />

          <View style={styles.onlineDot} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.welcome}>ДОБРО ПОЖАЛОВАТЬ</Text>

          <Text style={styles.userName} numberOfLines={1}>
            {firstName} {lastName}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.push("/notifications")}
        style={({ pressed }) => [
          styles.notificationButton,
          pressed && styles.notificationPressed,
        ]}
      >
        <Bell size={21} color="#EAE3C0" strokeWidth={1.7} />

        <View style={styles.notificationDot} />
      </Pressable>
    </Animated.View>
  );
}
