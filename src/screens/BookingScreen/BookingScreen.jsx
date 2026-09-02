import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Users,
  UtensilsCrossed,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./BookingScreen.styles";
import Navbar from "../../components/Navbar/Navbar";

export default function BookingScreen() {
  const params = useLocalSearchParams();

  const date = params.date ? String(params.date) : "Не выбрана";
  const time = params.time ? String(params.time) : "Не выбрано";
  const guests = params.guests ? String(params.guests) : "Не выбрано";
  const table = params.table ? String(params.table) : "Не выбран";

  const tableNumber = params.tableNumber ? String(params.tableNumber) : null;

  const tableType = params.tableType ? String(params.tableType) : null;

  const capacity = params.capacity ? String(params.capacity) : null;

  const floor = params.floor ? String(params.floor) : null;

  const hasCompleteBooking =
    date !== "Не выбрана" &&
    time !== "Не выбрано" &&
    guests !== "Не выбрано" &&
    table !== "Не выбран";

  const bookingParams = {
    date,
    time,
    guests,
    table,
    source: "booking",

    ...(tableNumber && { tableNumber }),
    ...(tableType && { tableType }),
    ...(capacity && { capacity }),
    ...(floor && { floor }),
  };

  const openDateScreen = () => {
    router.push({
      pathname: "/date",
      params: bookingParams,
    });
  };

  const openTimeScreen = () => {
    router.push({
      pathname: "/time",
      params: {
        ...bookingParams,
        selected: time,
      },
    });
  };

  const openGuestsScreen = () => {
    router.push({
      pathname: "/guests",
      params: {
        ...bookingParams,
        selected: guests,
      },
    });
  };

  const openTableScreen = () => {
    router.push({
      pathname: "/table",
      params: bookingParams,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const confirmBooking = () => {
    if (!hasCompleteBooking) {
      return;
    }

    console.log("BOOKING:", {
      date,
      time,
      guests,
      table,
      tableNumber,
      tableType,
      capacity,
      floor,
    });

    // Здесь позже будет API-запрос.
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft size={22} color="#EAE3C0" strokeWidth={1.8} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerEyebrow}>ПИВНИЦА</Text>

            <Text style={styles.headerTitle}>Бронирование</Text>
          </View>

          <View style={styles.headerIcon}>
            <CalendarDays size={20} color="#B29259" strokeWidth={1.6} />
          </View>
        </View>

        {/* INTRO */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <UtensilsCrossed size={22} color="#B29259" strokeWidth={1.6} />
          </View>

          <View style={styles.introText}>
            <Text style={styles.introEyebrow}>БРОНИРОВАНИЕ СТОЛИКА</Text>

            <Text style={styles.introTitle}>Проверьте бронирование</Text>

            <Text style={styles.introDescription}>
              Убедитесь, что все данные указаны верно перед подтверждением
              брони.
            </Text>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ДЕТАЛИ БРОНИРОВАНИЯ</Text>

          <View style={styles.detailsCard}>
            <BookingDetail
              icon={
                <CalendarDays size={19} color="#B29259" strokeWidth={1.6} />
              }
              label="ДАТА"
              value={date}
              onPress={openDateScreen}
            />

            <View style={styles.divider} />

            <BookingDetail
              icon={<Clock3 size={19} color="#B29259" strokeWidth={1.6} />}
              label="ВРЕМЯ"
              value={time}
              onPress={openTimeScreen}
            />

            <View style={styles.divider} />

            <BookingDetail
              icon={<Users size={19} color="#B29259" strokeWidth={1.6} />}
              label="ГОСТИ"
              value={guests}
              onPress={openGuestsScreen}
            />

            <View style={styles.divider} />

            <BookingDetail
              icon={
                <UtensilsCrossed size={19} color="#B29259" strokeWidth={1.6} />
              }
              label="СТОЛИК"
              value={table}
              onPress={openTableScreen}
            />
          </View>
        </View>

        {/* SELECTED TABLE */}
        {tableNumber && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ВЫБРАННЫЙ СТОЛИК</Text>

            <View style={styles.tableCard}>
              <View style={styles.tableCardIcon}>
                <UtensilsCrossed size={21} color="#B29259" strokeWidth={1.6} />
              </View>

              <View style={styles.tableCardInfo}>
                <Text style={styles.tableNumber}>Столик №{tableNumber}</Text>

                {tableType && <Text style={styles.tableType}>{tableType}</Text>}

                <View style={styles.tableMeta}>
                  {capacity && (
                    <Text style={styles.tableMetaText}>
                      До {capacity} гостей
                    </Text>
                  )}

                  {floor && (
                    <Text style={styles.tableMetaText}>• {floor} этаж</Text>
                  )}
                </View>
              </View>

              <View style={styles.selectedBadge}>
                <Check size={14} color="#211A10" strokeWidth={2.5} />
              </View>
            </View>
          </View>
        )}

        {/* SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ИТОГО</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Дата</Text>

              <Text style={styles.summaryValue}>{date}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Время</Text>

              <Text style={styles.summaryValue}>{time}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Гости</Text>

              <Text style={styles.summaryValue}>{guests}</Text>
            </View>

            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>Столик</Text>

              <Text style={styles.summaryValue} numberOfLines={1}>
                {table}
              </Text>
            </View>
          </View>
        </View>

        {/* CONFIRM */}
        <Pressable
          onPress={confirmBooking}
          disabled={!hasCompleteBooking}
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && hasCompleteBooking && styles.confirmPressed,
            !hasCompleteBooking && styles.confirmDisabled,
          ]}
        >
          <LinearGradient
            colors={
              hasCompleteBooking
                ? ["#D2B477", "#B29259", "#96723F"]
                : ["#4A4031", "#3A3227", "#30291F"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.confirmGradient}
          >
            <View style={styles.confirmIcon}>
              <Check
                size={18}
                color={
                  hasCompleteBooking ? "#211A10" : "rgba(234,227,192,0.35)"
                }
                strokeWidth={2.5}
              />
            </View>

            <Text
              style={[
                styles.confirmText,
                !hasCompleteBooking && styles.confirmTextDisabled,
              ]}
            >
              ПОДТВЕРДИТЬ БРОНЬ
            </Text>
          </LinearGradient>
        </Pressable>

        {!hasCompleteBooking && (
          <Text style={styles.warningText}>
            Заполните все данные бронирования, чтобы продолжить.
          </Text>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <Navbar />
    </View>
  );
}

function BookingDetail({ icon, label, value, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.detailRow,
        pressed && styles.detailPressed,
      ]}
    >
      <View style={styles.detailIcon}>{icon}</View>

      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>

        <Text style={styles.detailValue} numberOfLines={1}>
          {value}
        </Text>
      </View>

      <Text style={styles.editText}>ИЗМЕНИТЬ</Text>
    </Pressable>
  );
}
