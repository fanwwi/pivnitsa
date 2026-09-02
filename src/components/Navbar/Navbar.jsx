import { Pressable, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import { CalendarDays, House, UserRound } from "lucide-react-native";

import styles from "./Navbar.styles";

const NAV_ITEMS = [
  {
    route: "/home",
    label: "Главная",
    icon: House,
  },
  {
    route: "/booking",
    label: "Бронь",
    icon: CalendarDays,
    requiresAuth: true,
  },
  {
    route: "/profile",
    label: "Профиль",
    icon: UserRound,
    requiresAuth: true,
  },
];

export default function Navbar({ isAuthenticated }) {
  const pathname = usePathname();

  const isActive = (route) => {
    if (route === "/home") {
      return pathname === "/home" || pathname === "/";
    }

    return pathname.startsWith(route);
  };

  const handleNavigation = (item) => {
    if (item.requiresAuth && !isAuthenticated) {
      router.push("/auth");
      return;
    }

    if (pathname === item.route) {
      return;
    }

    router.push(item.route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          const active = isActive(item.route);

          const locked = item.requiresAuth && !isAuthenticated;

          return (
            <Pressable
              key={item.route}
              onPress={() => handleNavigation(item)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
              ]}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  size={21}
                  color={active && !locked ? "#B29259" : "#EAE3C0"}
                  strokeWidth={active && !locked ? 2.4 : 1.8}
                />

                {locked && (
                  <View
                    style={{
                      position: "absolute",
                      right: -3,
                      top: -3,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#B29259",
                    }}
                  />
                )}
              </View>

              <Text
                style={[styles.label, active && !locked && styles.labelActive]}
              >
                {item.label}
              </Text>

              {active && !locked && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
