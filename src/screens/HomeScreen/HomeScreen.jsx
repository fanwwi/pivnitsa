import { ActivityIndicator, ScrollView, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { useLocalSearchParams } from "expo-router";

import HomeHeader from "./components/HomeHeader/HomeHeader";
import HomeHero from "./components/HomeHero/HomeHero";
import EventsBanner from "./components/EventsBanner/EventsBanner";
import BookingSection from "./components/BookingSection/BookingSection";

import styles from "./HomeScreen.styles";
import useEvents from "../../hooks/UseEvents";
import useHomeProfile from "../../hooks/useHomeProfile";
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

  if (profileLoading) {
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
        <HomeHeader user={user} opacity={headerOpacity} />

        <EventsBanner
          events={events}
          opacity={contentOpacity}
          translateY={contentTranslate}
        />

        <HomeHero opacity={contentOpacity} translateY={contentTranslate} />

        <BookingSection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedGuests={selectedGuests}
          selectedTable={selectedTable}
          displayedDate={formatBookingDate(selectedDate)}
          opacity={contentOpacity}
          translateY={contentTranslate}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Нижняя навигация */}
      <Navbar />
    </View>
  );
}
