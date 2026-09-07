import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Bell, CalendarDays, ChevronLeft, Clock3 } from "lucide-react-native";
import { router } from "expo-router";

import styles from "./NotificationsListScreen.styles";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "event",
    title: "Новое мероприятие!",
    text: "7 сентября в Пивнице состоится новое мероприятие.",
    time: "Сегодня, 18:42",
    unread: true,
  },
  {
    id: 2,
    type: "booking",
    title: "Бронирование подтверждено",
    text: "Ваш столик №12 успешно забронирован на 7 сентября в 20:00.",
    time: "Сегодня, 15:20",
    unread: true,
  },
  {
    id: 3,
    type: "event",
    title: "Новая вечеринка",
    text: "Появилось новое событие. Загляните в афишу, чтобы узнать подробности.",
    time: "Вчера, 21:14",
    unread: false,
  },
  {
    id: 4,
    type: "booking",
    title: "Изменение бронирования",
    text: "Время вашего бронирования было изменено.",
    time: "5 сентября, 13:05",
    unread: false,
  },
];

export default function NotificationsListScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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

          <Text style={styles.headerTitle}>Уведомления</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.list}>
              {MOCK_NOTIFICATIONS.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function NotificationItem({ notification }) {
  const isEvent = notification.type === "event";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.notification,
        notification.unread && styles.notificationUnread,
        pressed && styles.notificationPressed,
      ]}
    >
      <View style={[styles.icon, notification.unread && styles.iconUnread]}>
        {isEvent ? (
          <CalendarDays
            size={19}
            color={notification.unread ? "#D2B477" : "#817C73"}
            strokeWidth={1.7}
          />
        ) : (
          <Clock3
            size={19}
            color={notification.unread ? "#D2B477" : "#817C73"}
            strokeWidth={1.7}
          />
        )}
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.notificationTitle,
              notification.unread && styles.notificationTitleUnread,
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>

          {notification.unread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationText}>{notification.text}</Text>

        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Bell size={27} color="#B29259" strokeWidth={1.5} />
      </View>

      <Text style={styles.emptyTitle}>Пока ничего нет</Text>

      <Text style={styles.emptyText}>
        Здесь будут появляться уведомления о мероприятиях и ваших бронированиях.
      </Text>
    </View>
  );
}
