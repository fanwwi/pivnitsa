import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react-native";

import { useRef, useState } from "react";

import styles from "./EventsBanner.styles";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 40;
const CARD_GAP = 12;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

const MONTH_NAMES = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const formatEventDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
};

const formatEventTime = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EventsBanner({ events, opacity, translateY }) {
  const [activeEvent, setActiveEvent] = useState(0);

  const scrollRef = useRef(null);

  if (!events?.length) {
    return null;
  }

  const goToEvent = (index) => {
    if (index < 0 || index >= events.length) {
      return;
    }

    setActiveEvent(index);

    scrollRef.current?.scrollTo({
      x: index * SNAP_INTERVAL,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / SNAP_INTERVAL);

    if (index >= 0 && index < events.length) {
      setActiveEvent(index);
    }
  };

  return (
    <Animated.View
      style={[
        styles.eventsSection,
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
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionLabel}>АФИША</Text>

          <Text style={styles.sectionTitle}>Ближайшие события</Text>
        </View>

        <Pressable onPress={() => {}} style={styles.allEventsButton}>
          <Text style={styles.allEventsText}>Все</Text>

          <ChevronRight size={15} color="#B29259" />
        </Pressable>
      </View>

      <View style={styles.eventsWrapper}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsScroll}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={handleScroll}
        >
          {events.map((event) => (
            <Pressable
              key={event.id}
              style={({ pressed }) => [
                styles.eventCard,
                pressed && styles.eventPressed,
              ]}
            >
              <Image
                source={{
                  uri: event.bannerUrl,
                }}
                style={styles.eventImage}
                contentFit="cover"
                transition={250}
              />

              <LinearGradient
                colors={[
                  "rgba(0,0,0,0.04)",
                  "rgba(0,0,0,0.25)",
                  "rgba(0,0,0,0.94)",
                ]}
                locations={[0, 0.45, 1]}
                style={styles.eventOverlay}
              />

              <View style={styles.eventContent}>
                <View style={styles.eventTop}>
                  <View style={styles.eventBadge}>
                    <Text style={styles.eventBadgeText}>EVENT</Text>
                  </View>

                  <View style={styles.eventTime}>
                    <Clock3 size={12} color="#EAE3C0" />

                    <Text style={styles.eventTimeText}>
                      {formatEventTime(event.startsAt)}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.title}
                  </Text>

                  <View style={styles.eventDate}>
                    <CalendarDays size={14} color="#B29259" />

                    <Text style={styles.eventDateText}>
                      {formatEventDate(event.startsAt)}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {events.length > 1 && (
          <View style={styles.carouselControls}>
            <Pressable
              onPress={() => goToEvent(activeEvent - 1)}
              disabled={activeEvent === 0}
              style={[
                styles.arrowButton,
                activeEvent === 0 && styles.arrowDisabled,
              ]}
            >
              <ChevronLeft size={17} color="#EAE3C0" />
            </Pressable>

            <View style={styles.dots}>
              {events.map((event, index) => (
                <Pressable
                  key={event.id}
                  onPress={() => goToEvent(index)}
                  style={[
                    styles.dot,
                    index === activeEvent && styles.dotActive,
                  ]}
                />
              ))}
            </View>

            <Pressable
              onPress={() => goToEvent(activeEvent + 1)}
              disabled={activeEvent === events.length - 1}
              style={[
                styles.arrowButton,
                activeEvent === events.length - 1 && styles.arrowDisabled,
              ]}
            >
              <ChevronRight size={17} color="#EAE3C0" />
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}
