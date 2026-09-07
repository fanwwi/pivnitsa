import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

import { Bell, CalendarDays, ChevronLeft, Clock3 } from "lucide-react-native";

import { router } from "expo-router";

import styles from "./NotificationsScreen.styles";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <ChevronLeft size={22} color="#EAE3C0" strokeWidth={1.8} />
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>ПИВНИЦА</Text>

              <Text style={styles.headerTitle}>Уведомления</Text>
            </View>

            <View style={styles.bellContainer}>
              <Pressable
                onPress={() => router.push("/notifications")}
                style={({ pressed }) => [
                  styles.bellButton,
                  pressed && styles.pressed,
                ]}
              >
                <Bell size={22} color="#D2B477" strokeWidth={1.7} />
              </Pressable>

              <View style={styles.bellDot} />
            </View>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroGlow} />

            <View style={styles.heroIcon}>
              <Bell size={27} color="#D2B477" strokeWidth={1.5} />
            </View>

            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Будьте в курсе</Text>

              <Text style={styles.heroDescription}>
                Включите нужные уведомления, чтобы не пропустить важные события
                и изменения бронирования.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>ЧТО ПОЛУЧАТЬ</Text>

          <View style={styles.settings}>
            <NotificationRow
              icon={CalendarDays}
              title="Мероприятия"
              description="Новые вечеринки и события"
              defaultValue={true}
            />

            <View style={styles.divider} />

            <NotificationRow
              icon={Clock3}
              title="Бронирование"
              description="Изменения статуса вашей брони"
              defaultValue={true}
            />
          </View>

          <Text style={styles.footerText}>
            Вы можете изменить эти настройки в любое время.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function NotificationRow({ icon: Icon, title, description, defaultValue }) {
  const [enabled, setEnabled] = useState(defaultValue);

  const handleChange = async (value) => {
    setEnabled(value);

    // Здесь позже подключим API.
  };

  return (
    <View style={styles.row}>
      <View
        style={[styles.iconContainer, enabled && styles.iconContainerActive]}
      >
        <Icon
          size={21}
          color={enabled ? "#D2B477" : "#77736C"}
          strokeWidth={1.6}
        />
      </View>

      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>

        <Text style={styles.rowDescription}>{description}</Text>
      </View>

      <Switch
        value={enabled}
        onValueChange={handleChange}
        trackColor={{
          false: "#35322E",
          true: "#B29259",
        }}
        thumbColor={enabled ? "#F5EACD" : "#77736C"}
        ios_backgroundColor="#35322E"
      />
    </View>
  );
}
