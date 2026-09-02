import { Pressable, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import {
  CalendarDays,
  House,
  UserRound,
} from "lucide-react-native";

import styles from "./Navbar.styles";

const NAV_ITEMS = [
  {
    route: "/home",
    icon: House,
  },
  {
    route: "/booking",
    icon: CalendarDays,
  },
  {
    route: "/profile",
    icon: UserRound,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (route) => {
    if (route === "/home") {
      return pathname === "/home" || pathname === "/";
    }

    return pathname.startsWith(route);
  };

  const handleNavigation = (route) => {
    if (pathname === route) {
      return;
    }

    router.push(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.route);

          return (
            <Pressable
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  active && styles.iconWrapperActive,
                ]}
              >
                <Icon
                  size={21}
                  color={active ? "#211A10" : "#B29259"}
                  strokeWidth={active ? 2.4 : 1.8}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  active && styles.labelActive,
                ]}
              >
                {item.label}
              </Text>

              {active && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}