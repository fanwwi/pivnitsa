import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image as RNImage,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as SecureStore from "expo-secure-store";
import { router, useLocalSearchParams } from "expo-router";

import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  UtensilsCrossed,
} from "lucide-react-native";

import styles from "./HomeScreen.styles";

const { width } = Dimensions.get("window");

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

const TOKEN_KEY = "accessToken";

/*
|--------------------------------------------------------------------------
| EVENTS
|--------------------------------------------------------------------------
*/

const EVENTS = [
  {
    id: 1,
    title: "Живой вечер в Pivnitsa",
    date: "30 августа",
    time: "20:00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdWCDNfNt7DlfUUiv0vp_NTq86crsETVetivCoUMy8O5oP9lfSw4vHdg&s=10",
  },
  {
    id: 2,
    title: "Большой музыкальный вечер",
    date: "5 сентября",
    time: "21:00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22BhEhAedp7URtkxETP2GVySLfq2bUQAIdibSckOUYGaiorQr0lcICCQ&s=10",
  },
  {
    id: 3,
    title: "Stand Up Night",
    date: "12 сентября",
    time: "20:30",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyzj_aP8nQllRCJ-yp0AhBZp-9c04AcYnkz16q1PBC8x-e280uDfZ6ao9&s=10",
  },
];

/*
|--------------------------------------------------------------------------
| DEFAULT BOOKING VALUES
|--------------------------------------------------------------------------
*/

const DEFAULT_DATE = "2026-08-30";
const DEFAULT_TIME = "19:00";
const DEFAULT_GUESTS = "2 гостя";
const DEFAULT_TABLE = "Столик №1";

/*
|--------------------------------------------------------------------------
| DATE FORMAT
|--------------------------------------------------------------------------
*/

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

const formatBookingDate = (value) => {
  if (!value) return "Выберите дату";

  /*
   * Если вдруг старое состояние содержит
   * "Сегодня", не ломаем интерфейс.
   */

  if (value === "Сегодня") {
    return "Сегодня";
  }

  const parts = String(value).split("-");

  if (parts.length !== 3) {
    return value;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!year || !month || !day) {
    return value;
  }

  return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
};

export default function HomeScreen() {
  /*
  |--------------------------------------------------------------------------
  | ROUTE PARAMS
  |--------------------------------------------------------------------------
  */

  const params = useLocalSearchParams();

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | BOOKING STATE
  |--------------------------------------------------------------------------
  */

  const [selectedDate, setSelectedDate] = useState(params.date || DEFAULT_DATE);

  const [selectedTime, setSelectedTime] = useState(params.time || DEFAULT_TIME);

  const [selectedGuests, setSelectedGuests] = useState(
    params.guests || DEFAULT_GUESTS,
  );

  const [selectedTable, setSelectedTable] = useState(
    params.table || DEFAULT_TABLE,
  );

  /*
  |--------------------------------------------------------------------------
  | SYNC PARAMETERS
  |--------------------------------------------------------------------------
  |
  | Когда DateScreen делает:
  |
  | router.replace({
  |   pathname: "/home",
  |   params: {
  |     date: "2026-09-12"
  |   }
  | })
  |
  | Home получает параметр и обновляет состояние.
  |
  */

  useEffect(() => {
    if (params.date) {
      setSelectedDate(String(params.date));
    }

    if (params.time) {
      setSelectedTime(String(params.time));
    }

    if (params.guests) {
      setSelectedGuests(String(params.guests));
    }

    if (params.table) {
      setSelectedTable(String(params.table));
    }
  }, [params.date, params.time, params.guests, params.table]);

  /*
  |--------------------------------------------------------------------------
  | EVENT CAROUSEL
  |--------------------------------------------------------------------------
  */

  const [activeEvent, setActiveEvent] = useState(0);

  const scrollRef = useRef(null);

  const CARD_WIDTH = width - 40;

  /*
  |--------------------------------------------------------------------------
  | ANIMATIONS
  |--------------------------------------------------------------------------
  */

  const headerOpacity = useRef(new Animated.Value(0)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;

  const contentTranslate = useRef(new Animated.Value(25)).current;

  /*
  |--------------------------------------------------------------------------
  | LOAD PROFILE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!accessToken) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        router.replace("/login");

        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Не удалось загрузить профиль");
      }

      setUser(data);

      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 700,
          delay: 150,
          useNativeDriver: true,
        }),

        Animated.spring(contentTranslate, {
          toValue: 0,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      console.error("HOME PROFILE ERROR:", error);

      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | EVENT CAROUSEL
  |--------------------------------------------------------------------------
  */

  const goToEvent = (index) => {
    if (index < 0 || index >= EVENTS.length) {
      return;
    }

    setActiveEvent(index);

    scrollRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  const handleEventScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / CARD_WIDTH);

    if (index >= 0 && index < EVENTS.length && index !== activeEvent) {
      setActiveEvent(index);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN DATE
  |--------------------------------------------------------------------------
  */

  const openDateScreen = () => {
    router.push({
      pathname: "/date",

      params: {
        date: selectedDate,
        time: selectedTime,
        guests: selectedGuests,
        table: selectedTable,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN TIME
  |--------------------------------------------------------------------------
  */

  const openTimeScreen = () => {
    router.push({
      pathname: "/time",

      params: {
        selected: selectedTime,
        date: selectedDate,
        time: selectedTime,
        guests: selectedGuests,
        table: selectedTable,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN GUESTS
  |--------------------------------------------------------------------------
  */

  const openGuestsScreen = () => {
    router.push({
      pathname: "/guests",

      params: {
        selected: selectedGuests,
        date: selectedDate,
        time: selectedTime,
        guests: selectedGuests,
        table: selectedTable,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN MAP
  |--------------------------------------------------------------------------
  */

  const openMapScreen = () => {
    router.push({
      pathname: "/table",

      params: {
        selected: selectedTable,
        date: selectedDate,
        time: selectedTime,
        guests: selectedGuests,
        table: selectedTable,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | BOOKING
  |--------------------------------------------------------------------------
  */

  const handleBooking = () => {
    router.push({
      pathname: "/booking",

      params: {
        date: selectedDate,
        time: selectedTime,
        guests: selectedGuests,
        table: selectedTable,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingLogo}>
          <Image
            source={require("../../assets/logoWhite.png")}
            style={styles.loadingLogoImage}
            contentFit="contain"
          />
        </View>

        <ActivityIndicator
          size="small"
          color="#B29259"
          style={styles.loadingIndicator}
        />
      </View>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  const firstName = user?.firstName || "";

  const lastName = user?.lastName || "";

  /*
  |--------------------------------------------------------------------------
  | DISPLAY DATE
  |--------------------------------------------------------------------------
  */

  const displayedDate = formatBookingDate(selectedDate);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <Image
        source={require("../../assets/startImage.png")}
        style={styles.background}
        contentFit="cover"
      />

      <LinearGradient
        colors={["rgba(7,6,4,0.94)", "rgba(11,9,6,0.72)", "rgba(8,7,5,0.98)"]}
        locations={[0, 0.45, 1]}
        style={styles.backgroundOverlay}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
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
              <RNImage
                source={require("../../assets/panda.png")}
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

        {/* HERO */}

        <Animated.View
          style={[
            styles.hero,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
                },
              ],
            },
          ]}
        >
          <View style={styles.heroEyebrow}>
            <View style={styles.heroLine} />

            <Text style={styles.heroEyebrowText}>ПИВНИЦА</Text>

            <View style={styles.heroLine} />
          </View>

          <Text style={styles.heroTitle}>
            Вечера, которые{"\n"}
            <Text style={styles.heroAccent}>хочется повторить</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Музыка, атмосфера и правильные люди.
          </Text>
        </Animated.View>

        {/* EVENTS */}

        <Animated.View
          style={[
            styles.eventsSection,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
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

            <Pressable
              onPress={() => router.push("/events")}
              style={({ pressed }) => [
                styles.allEventsButton,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.allEventsText}>Все</Text>

              <ChevronRight size={15} color="#B29259" />
            </Pressable>
          </View>

          <View style={styles.eventsWrapper}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              snapToInterval={CARD_WIDTH}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsScroll}
              onMomentumScrollEnd={handleEventScroll}
            >
              {EVENTS.map((event) => (
                <Pressable
                  key={event.id}
                  style={({ pressed }) => [
                    styles.eventCard,
                    pressed && styles.eventPressed,
                  ]}
                >
                  <Image
                    source={{
                      uri: event.image,
                    }}
                    style={styles.eventImage}
                    contentFit="cover"
                    transition={250}
                  />

                  <LinearGradient
                    colors={[
                      "rgba(0,0,0,0.05)",
                      "rgba(0,0,0,0.28)",
                      "rgba(0,0,0,0.92)",
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

                        <Text style={styles.eventTimeText}>{event.time}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.eventTitle}>{event.title}</Text>

                      <View style={styles.eventDate}>
                        <CalendarDays size={14} color="#B29259" />

                        <Text style={styles.eventDateText}>{event.date}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>

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
                {EVENTS.map((event, index) => (
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
                disabled={activeEvent === EVENTS.length - 1}
                style={[
                  styles.arrowButton,
                  activeEvent === EVENTS.length - 1 && styles.arrowDisabled,
                ]}
              >
                <ChevronRight size={17} color="#EAE3C0" />
              </Pressable>
            </View>
          </View>
        </Animated.View>

        {/* BOOKING */}

        <Animated.View
          style={[
            styles.bookingSection,
            {
              opacity: contentOpacity,
              transform: [
                {
                  translateY: contentTranslate,
                },
              ],
            },
          ]}
        >
          <View style={styles.bookingHeader}>
            <View style={styles.bookingIcon}>
              <UtensilsCrossed size={19} color="#B29259" strokeWidth={1.6} />
            </View>

            <View style={styles.bookingHeaderText}>
              <Text style={styles.bookingEyebrow}>БРОНИРОВАНИЕ</Text>

              <Text style={styles.bookingTitle}>Забронируйте столик</Text>
            </View>
          </View>

          <Text style={styles.bookingDescription}>
            Выберите удобные дату, время и количество гостей.
          </Text>

          <View style={styles.bookingGrid}>
            {/* DATE */}

            <Pressable
              onPress={openDateScreen}
              style={({ pressed }) => [
                styles.bookingOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.optionIcon}>
                <CalendarDays size={17} color="#B29259" />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>ДАТА</Text>

                <Text style={styles.optionValue} numberOfLines={1}>
                  {displayedDate}
                </Text>
              </View>

              <ChevronRight size={16} color="#77736B" />
            </Pressable>

            {/* TIME */}

            <Pressable
              onPress={openTimeScreen}
              style={({ pressed }) => [
                styles.bookingOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.optionIcon}>
                <Clock3 size={17} color="#B29259" />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>ВРЕМЯ</Text>

                <Text style={styles.optionValue}>{selectedTime}</Text>
              </View>

              <ChevronRight size={16} color="#77736B" />
            </Pressable>

            {/* GUESTS */}

            <Pressable
              onPress={openGuestsScreen}
              style={({ pressed }) => [
                styles.bookingOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.optionIcon}>
                <Users size={17} color="#B29259" />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>ГОСТИ</Text>

                <Text style={styles.optionValue}>{selectedGuests}</Text>
              </View>

              <ChevronRight size={16} color="#77736B" />
            </Pressable>

            {/* TABLE */}

            <Pressable
              onPress={openMapScreen}
              style={({ pressed }) => [
                styles.bookingOption,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.optionIcon}>
                <UtensilsCrossed size={17} color="#B29259" />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionLabel}>СТОЛИК</Text>

                <Text style={styles.optionValue} numberOfLines={1}>
                  {selectedTable}
                </Text>
              </View>

              <ChevronRight size={16} color="#77736B" />
            </Pressable>
          </View>

          {/* BOOK BUTTON */}

          <Pressable
            onPress={handleBooking}
            style={({ pressed }) => [
              styles.bookButton,
              pressed && styles.bookButtonPressed,
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
              style={styles.bookGradient}
            >
              <Text style={styles.bookText}>ЗАБРОНИРОВАТЬ</Text>

              <ChevronRight size={19} color="#211A10" strokeWidth={2.2} />
            </LinearGradient>
          </Pressable>
        </Animated.View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}
