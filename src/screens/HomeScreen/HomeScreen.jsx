import { ActivityIndicator, ScrollView, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { useLocalSearchParams } from "expo-router";

import { useEffect, useRef } from "react";

import HomeHeader from "./components/HomeHeader/HomeHeader";
import HomeHero from "./components/HomeHero/HomeHero";
import EventsBanner from "./components/EventsBanner/EventsBanner";
import BookingSection from "./components/BookingSection/BookingSection";

import styles from "./HomeScreen.styles";

import useHomeProfile from "../../hooks/useHomeProfile";
import useAuthStatus from "../../hooks/useAuthStatus";

import Navbar from "../../components/Navbar/Navbar";
import useEvents from "../../hooks/useEvents";

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
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <Navbar isAuthenticated={isAuthenticated} />
    </View>
  );
}
