import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Users,
  UtensilsCrossed,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./BookingSection.styles";

export default function BookingSection({
  selectedDate,
  selectedTime,
  selectedGuests,
  selectedTable,
  displayedDate,
  opacity,
  translateY,
}) {
  const bookingParams = {
    date: selectedDate,
    time: selectedTime,
    guests: selectedGuests,
    table: selectedTable,
    source: "home",
  };

  // ======================================================
  // DATE
  // ======================================================

  const openDateScreen = () => {
    router.push({
      pathname: "/date",
      params: bookingParams,
    });
  };

  // ======================================================
  // TIME
  // ======================================================

  const openTimeScreen = () => {
    router.push({
      pathname: "/time",
      params: {
        ...bookingParams,
        selected: selectedTime,
      },
    });
  };

  // ======================================================
  // GUESTS
  // ======================================================

  const openGuestsScreen = () => {
    router.push({
      pathname: "/guests",
      params: {
        ...bookingParams,
        selected: selectedGuests,
      },
    });
  };

  // ======================================================
  // TABLE
  // ======================================================

  const openTableScreen = () => {
    router.push({
      pathname: "/table",
      params: bookingParams,
    });
  };

  // ======================================================
  // BOOKING
  // ======================================================

  const handleBooking = () => {
    router.push({
      pathname: "/booking",
      params: {
        ...bookingParams,
        source: "home",
      },
    });
  };

  return (
    <View
      style={[
        styles.bookingSection,
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
      {/* HEADER */}

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
        Выберите дату, время, количество гостей и столик.
      </Text>

      {/* OPTIONS */}

      <View style={styles.bookingGrid}>
        <BookingOption
          label="ДАТА"
          value={displayedDate}
          icon={<CalendarDays size={17} color="#B29259" />}
          onPress={openDateScreen}
        />

        <BookingOption
          label="ВРЕМЯ"
          value={selectedTime}
          icon={<Clock3 size={17} color="#B29259" />}
          onPress={openTimeScreen}
        />

        <BookingOption
          label="ГОСТИ"
          value={
            selectedGuests
              ? `${selectedGuests} ${
                  Number(selectedGuests) === 1
                    ? "гость"
                    : Number(selectedGuests) >= 2 && Number(selectedGuests) <= 4
                      ? "гостя" : ""
                }`
              : "Не выбрано"
          }
          icon={<Users size={17} color="#B29259" />}
          onPress={openGuestsScreen}
        />

        <BookingOption
          label="СТОЛИК"
          value={selectedTable || "Не выбран"}
          icon={<UtensilsCrossed size={17} color="#B29259" />}
          onPress={openTableScreen}
        />
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
    </View>
  );
}

function BookingOption({ label, value, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bookingOption,
        pressed && styles.bookingOptionPressed,
      ]}
    >
      <View style={styles.optionIcon}>{icon}</View>

      <View style={styles.optionContent}>
        <Text style={styles.optionLabel}>{label}</Text>

        <Text style={styles.optionValue} numberOfLines={1}>
          {value || "Не выбрано"}
        </Text>
      </View>
    </Pressable>
  );
}
