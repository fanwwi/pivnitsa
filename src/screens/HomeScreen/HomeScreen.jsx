import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { router, useLocalSearchParams } from "expo-router";

import { useEffect, useRef } from "react";

import HomeHeader from "./components/HomeHeader/HomeHeader";
import HomeHero from "./components/HomeHero/HomeHero";
import EventsBanner from "./components/EventsBanner/EventsBanner";
import BookingSection from "./components/BookingSection/BookingSection";

import styles from "./HomeScreen.styles";

import useHomeProfile from "../../hooks/useHomeProfile";
import useEvents from "../../hooks/useEvents";
import useAuthStatus from "../../hooks/useAuthStatus";

import Navbar from "../../components/Navbar/Navbar";

const DEFAULT_DATE = "Дата";
const DEFAULT_TIME = "Время";
const DEFAULT_GUESTS = "Гости";
const DEFAULT_TABLE = "Столик";

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
  if (!value) {
    return "Выберите дату";
  }

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
  const params = useLocalSearchParams();

  const scrollRef = useRef(null);
  const bookingSectionY = useRef(0);

  const { isAuthenticated, loading: authLoading } = useAuthStatus();

  /*
   * Профиль нужен только авторизованному пользователю.
   *
   * ВАЖНО:
   * useHomeProfile сам по себе нельзя условно вызывать через if,
   * поэтому он вызывается всегда, но его внутреннюю работу нужно
   * сделать независимой от отсутствия токена.
   */
  const {
    user,
    loading: profileLoading,
    headerOpacity,
    contentOpacity,
    contentTranslate,
  } = useHomeProfile();

  const { events } = useEvents();

  const selectedDate = params.date ? String(params.date) : DEFAULT_DATE;

  const selectedTime = params.time ? String(params.time) : DEFAULT_TIME;

  const selectedGuests = params.guests ? String(params.guests) : DEFAULT_GUESTS;

  const selectedTable = params.table ? String(params.table) : DEFAULT_TABLE;

  const tableNumber = params.tableNumber ? String(params.tableNumber) : null;

  const tableType = params.tableType ? String(params.tableType) : null;

  const capacity = params.capacity ? String(params.capacity) : null;

  const floor = params.floor ? String(params.floor) : null;

  useEffect(() => {
    if (params.focusBooking !== "1") {
      return;
    }

    if (!bookingSectionY.current) {
      return;
    }

    const timeout = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(bookingSectionY.current - 20, 0),
        animated: true,
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [params.focusBooking]);

  /*
   * Пока определяем наличие токена —
   * показываем loading.
   */
  if (authLoading) {
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
   * Если пользователь авторизован и профиль ещё загружается —
   * ждём профиль.
   *
   * Гостя здесь НЕ блокируем.
   */
  if (isAuthenticated && profileLoading) {
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

  const handleLogin = () => {
    router.push("/auth");
  };

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

      {/* CONTENT */}

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          user={isAuthenticated ? user : null}
          opacity={headerOpacity}
          isAuthenticated={isAuthenticated}
        />

        <EventsBanner
          events={events}
          opacity={contentOpacity}
          translateY={contentTranslate}
        />

        <HomeHero opacity={contentOpacity} translateY={contentTranslate} />

        {/* BOOKING */}

        <View
          onLayout={(event) => {
            const y = event.nativeEvent.layout.y;

            bookingSectionY.current = y;

            if (params.focusBooking === "1") {
              setTimeout(() => {
                scrollRef.current?.scrollTo({
                  y: Math.max(y - 20, 0),
                  animated: true,
                });
              }, 100);
            }
          }}
        >
          {isAuthenticated ? (
            <BookingSection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedGuests={selectedGuests}
              selectedTable={selectedTable}
              tableNumber={tableNumber}
              tableType={tableType}
              capacity={capacity}
              floor={floor}
              displayedDate={formatBookingDate(selectedDate)}
              opacity={contentOpacity}
              translateY={contentTranslate}
            />
          ) : (
            <GuestBookingCard
              opacity={contentOpacity}
              translateY={contentTranslate}
              onLogin={handleLogin}
            />
          )}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <Navbar isAuthenticated={isAuthenticated} />
    </View>
  );
}

/* GUEST BOOKING */

function GuestBookingCard({ opacity, translateY, onLogin }) {
  return (
    <View
      style={{
        opacity,
        transform: [
          {
            translateY,
          },
        ],
        marginHorizontal: 20,
        marginTop: 24,
        padding: 24,
        borderRadius: 22,
        backgroundColor: "rgba(18,16,12,0.94)",
        borderWidth: 1,
        borderColor: "rgba(178,146,89,0.14)",
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(178,146,89,0.09)",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#B29259",
            fontSize: 22,
          }}
        >
          🔒
        </Text>
      </View>

      <Text
        style={{
          color: "#B29259",
          fontSize: 10,
          fontWeight: "800",
          letterSpacing: 1.8,
          marginBottom: 7,
        }}
      >
        БРОНИРОВАНИЕ
      </Text>

      <Text
        style={{
          color: "#EAE3C0",
          fontSize: 21,
          fontWeight: "700",
          marginBottom: 9,
        }}
      >
        Войдите, чтобы забронировать столик
      </Text>

      <Text
        style={{
          color: "rgba(234,227,192,0.5)",
          fontSize: 13,
          lineHeight: 20,
          marginBottom: 20,
        }}
      >
        Чтобы выбрать дату, время, количество гостей и столик, пожалуйста,
        войдите в аккаунт.
      </Text>

      <Pressable
        onPress={onLogin}
        style={({ pressed }) => ({
          height: 50,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#B29259",
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text
          style={{
            color: "#211A10",
            fontSize: 12,
            fontWeight: "900",
            letterSpacing: 1.2,
          }}
        >
          ВОЙТИ В АККАУНТ
        </Text>
      </Pressable>
    </View>
  );
}
