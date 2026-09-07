import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Check, Clock3 } from "lucide-react-native";

import styles from "./TimeScreen.styles";

const START_HOUR = 19;
const END_HOUR = 21.30;

const createTimeSlots = () => {
  const slots = [];

  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);

    if (hour < END_HOUR) {
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }

  return slots;
};

const TIME_SLOTS = createTimeSlots();

export default function TimeScreen() {
  const params = useLocalSearchParams();

  const initialTime = typeof params.time === "string" ? params.time : null;

  const [selectedTime, setSelectedTime] = useState(initialTime);

  const selectedLabel = useMemo(() => {
    return selectedTime || "Выберите время";
  }, [selectedTime]);

  const handleSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      return;
    }

    router.replace({
      pathname: "/home",

      params: {
        ...(params.date
          ? {
              date: String(params.date),
            }
          : {}),

        time: selectedTime,

        ...(params.guests
          ? {
              guests: String(params.guests),
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

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
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

            <Text style={styles.headerTitle}>Выберите время</Text>
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
            <Text style={styles.introTitle}>Во сколько вас ждать?</Text>

            <Text style={styles.introText}>
              Выберите удобное время для вашего вечера в Пивнице.
            </Text>
          </View>

          {/* SELECTED TIME */}

          <View style={styles.selectedPreview}>
            <View style={styles.selectedPreviewContent}>
              <Text style={styles.selectedLabel}>ВЫБРАННОЕ ВРЕМЯ</Text>

              <Text style={styles.selectedValue}>{selectedLabel}</Text>
            </View>

            {selectedTime && (
              <View style={styles.selectedIcon}>
                <Check size={18} color="#211A10" strokeWidth={2.5} />
              </View>
            )}
          </View>

          {/* TIME */}

          <View style={styles.timeSection}>
            <View style={styles.sectionHeader}>
              <Clock3 size={17} color="#B29259" strokeWidth={1.8} />

              <Text style={styles.sectionTitle}>ВРЕМЯ БРОНИРОВАНИЯ</Text>
            </View>

            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;

                return (
                  <Pressable
                    key={time}
                    onPress={() => handleSelect(time)}
                    style={({ pressed }) => [
                      styles.timeButton,

                      isSelected && styles.timeButtonSelected,

                      pressed && styles.timeButtonPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        isSelected && styles.timeTextSelected,
                      ]}
                    >
                      {time}
                    </Text>

                    {isSelected && (
                      <View style={styles.timeCheck}>
                        <Check size={13} color="#211A10" strokeWidth={2.8} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* INFO */}

          <View style={styles.infoCard}>
            <View style={styles.infoDot} />

            <Text style={styles.infoText}>
              Время указано с интервалом в 30 минут.
            </Text>
          </View>
        </ScrollView>

        {/* BOTTOM */}

        <View style={styles.bottom}>
          <Pressable
            onPress={handleConfirm}
            disabled={!selectedTime}
            style={({ pressed }) => [
              styles.confirmButton,

              !selectedTime && styles.confirmButtonDisabled,

              pressed && selectedTime && styles.confirmPressed,
            ]}
          >
            <LinearGradient
              colors={
                selectedTime
                  ? ["#D2B477", "#B29259", "#96723F"]
                  : ["#45413B", "#35322E"]
              }
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 1,
              }}
              style={styles.confirmGradient}
            >
              <Text
                style={[
                  styles.confirmText,

                  !selectedTime && styles.confirmTextDisabled,
                ]}
              >
                ВЫБРАТЬ ВРЕМЯ
              </Text>

              {selectedTime && (
                <Check size={19} color="#211A10" strokeWidth={2.5} />
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
