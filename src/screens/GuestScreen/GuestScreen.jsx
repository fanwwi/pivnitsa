import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Users,
} from "lucide-react-native";

import styles from "./GuestScreen.styles";

const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

const PRESETS = [1, 2, 4, 6, 8, 10, 12];

const getGuestsLabel = (count) => {
  if (count === 1) return "гость";
  if (count >= 2 && count <= 4) return "гостя";
  return "гостей";
};

export default function GuestsScreen() {
  const params = useLocalSearchParams();

  const initialGuests =
    typeof params.guests === "string"
      ? Math.min(
          MAX_GUESTS,
          Math.max(MIN_GUESTS, Number(params.guests) || MIN_GUESTS),
        )
      : MIN_GUESTS;

  const [guests, setGuests] = useState(initialGuests);

  /*
   * Текст под количеством гостей
   */

  const guestsLabel = useMemo(() => {
    return getGuestsLabel(guests);
  }, [guests]);

  /*
   * Увеличить количество
   */

  const increaseGuests = () => {
    setGuests((current) => Math.min(current + 1, MAX_GUESTS));
  };

  /*
   * Уменьшить количество
   */

  const decreaseGuests = () => {
    setGuests((current) => Math.max(current - 1, MIN_GUESTS));
  };

  /*
   * Выбрать конкретное количество
   */

  const selectPreset = (value) => {
    setGuests(value);
  };

  /*
   * Подтвердить
   */

  const handleConfirm = () => {
    router.replace({
      pathname: "/home",

      params: {
        guests: String(guests),

        ...(params.date
          ? {
              date: String(params.date),
            }
          : {}),

        ...(params.time
          ? {
              time: String(params.time),
            }
          : {}),

        ...(params.table
          ? {
              table: String(params.table),
            }
          : {}),
      },
    });
  };

  /*
   * Назад
   */

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND */}

      <LinearGradient
        colors={["#15120E", "#0B0907", "#080706"]}
        locations={[0, 0.45, 1]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
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

          <View style={styles.headerTitleWrapper}>
            <Text style={styles.headerEyebrow}>БРОНИРОВАНИЕ</Text>

            <Text style={styles.headerTitle}>Количество гостей</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* CONTENT */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* INTRO */}

          <View style={styles.intro}>
            <Text style={styles.introTitle}>Кого будем ждать?</Text>

            <Text style={styles.introText}>
              Укажите количество гостей, которые придут с вами.
            </Text>
          </View>

          {/* MAIN GUEST CARD */}

          <View style={styles.guestCard}>
            {/* TOP */}

            <View style={styles.guestCardTop}>
              <View style={styles.guestIcon}>
                <Users size={20} color="#D2B477" strokeWidth={1.7} />
              </View>

              <View style={styles.guestCardTopText}>
                <Text style={styles.guestCardLabel}>ВАША КОМПАНИЯ</Text>

                <Text style={styles.guestCardHint}>От 1 до 12 человек</Text>
              </View>
            </View>

            {/* COUNTER */}

            <View style={styles.counter}>
              {/* MINUS */}

              <Pressable
                onPress={decreaseGuests}
                disabled={guests === MIN_GUESTS}
                style={({ pressed }) => [
                  styles.counterButton,
                  guests === MIN_GUESTS && styles.counterButtonDisabled,
                  pressed &&
                    guests !== MIN_GUESTS &&
                    styles.counterButtonPressed,
                ]}
              >
                <Minus
                  size={22}
                  color={guests === MIN_GUESTS ? "#4E4A44" : "#EAE3C0"}
                  strokeWidth={1.8}
                />
              </Pressable>

              {/* NUMBER */}

              <View style={styles.counterCenter}>
                <Text style={styles.counterNumber}>{guests}</Text>

                <Text style={styles.counterLabel}>{guestsLabel}</Text>
              </View>

              {/* PLUS */}

              <Pressable
                onPress={increaseGuests}
                disabled={guests === MAX_GUESTS}
                style={({ pressed }) => [
                  styles.counterButton,
                  guests === MAX_GUESTS && styles.counterButtonDisabled,
                  pressed &&
                    guests !== MAX_GUESTS &&
                    styles.counterButtonPressed,
                ]}
              >
                <Plus
                  size={22}
                  color={guests === MAX_GUESTS ? "#4E4A44" : "#EAE3C0"}
                  strokeWidth={1.8}
                />
              </Pressable>
            </View>

            {/* RANGE */}

            <View style={styles.range}>
              {Array.from({ length: MAX_GUESTS }).map((_, index) => {
                const value = index + 1;
                const active = value <= guests;

                return (
                  <Pressable
                    key={value}
                    onPress={() => selectPreset(value)}
                    style={[styles.rangeItem, active && styles.rangeItemActive]}
                  />
                );
              })}
            </View>

            <View style={styles.rangeLabels}>
              <Text style={styles.rangeLabel}>1</Text>

              <Text style={styles.rangeLabel}>12</Text>
            </View>
          </View>

          {/* QUICK SELECT */}

          <View style={styles.quickSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Быстрый выбор</Text>

              <Text style={styles.sectionHint}>человек</Text>
            </View>

            <View style={styles.presets}>
              {PRESETS.map((value) => {
                const active = guests === value;

                return (
                  <Pressable
                    key={value}
                    onPress={() => selectPreset(value)}
                    style={({ pressed }) => [
                      styles.preset,
                      active && styles.presetActive,
                      pressed && styles.presetPressed,
                    ]}
                  >
                    {active && (
                      <View style={styles.presetCheck}>
                        <Check size={10} color="#211A10" strokeWidth={3} />
                      </View>
                    )}

                    <Text
                      style={[
                        styles.presetNumber,
                        active && styles.presetNumberActive,
                      ]}
                    >
                      {value}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* INFO */}

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Users size={16} color="#B29259" strokeWidth={1.7} />
            </View>

            <Text style={styles.infoText}>
              Если вас будет больше 12 человек, пожалуйста, свяжитесь с нами
              напрямую — мы поможем организовать большую компанию.
            </Text>
          </View>
        </ScrollView>

        {/* BOTTOM */}

        <View style={styles.bottom}>
          <Pressable
            onPress={handleConfirm}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.confirmPressed,
            ]}
          >
            <LinearGradient
              colors={["#D2B477", "#B29259", "#96723F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmGradient}
            >
              <Text style={styles.confirmText}>
                ВЫБРАТЬ {guests} {guestsLabel.toUpperCase()}
              </Text>

              <ChevronRight size={19} color="#211A10" strokeWidth={2.3} />
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
