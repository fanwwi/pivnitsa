import { Animated, Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";

import styles from "./HomeHeader.styles";

export default function HomeHeader({ user, opacity, isAuthenticated }) {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  const userName = isAuthenticated
    ? `${firstName} ${lastName}`.trim() || "Пользователь"
    : "Гость";

  const handleProfilePress = () => {
    if (isAuthenticated) {
      router.push("/profile");
      return;
    }

    router.push("/auth");
  };

  const handleNotificationsPress = () => {
    if (isAuthenticated) {
      router.push("/notifications");
      return;
    }

    router.push("/auth");
  };

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
        onPress={handleProfilePress}
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
          <Text style={styles.welcome}>
            {isAuthenticated ? "ДОБРО ПОЖАЛОВАТЬ" : "ГОСТЬ"}
          </Text>

          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={handleNotificationsPress}
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
