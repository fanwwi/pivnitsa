import { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ChevronRight, Check } from "lucide-react-native";
import { CalendarList } from "react-native-calendars";

import styles from "./DateScreen.styles";

const { width } = Dimensions.get("window");

/*
|--------------------------------------------------------------------------
| SETTINGS
|--------------------------------------------------------------------------
*/

const START_DATE = "2026-08-01";
const END_DATE = "2027-07-31";

const MONTH_NAMES_GENITIVE = [
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

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const TODAY = new Date();

TODAY.setHours(0, 0, 0, 0);

const TODAY_VALUE = [
  TODAY.getFullYear(),
  String(TODAY.getMonth() + 1).padStart(2, "0"),
  String(TODAY.getDate()).padStart(2, "0"),
].join("-");

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const parseDateValue = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return null;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!year || !month || !day) {
    return null;
  }

  return {
    year,
    month: month - 1,
    day,
  };
};

const formatDate = (value) => {
  const parsed = parseDateValue(value);

  if (!parsed) {
    return "Дата не выбрана";
  }

  return `${parsed.day} ${MONTH_NAMES_GENITIVE[parsed.month]} ${parsed.year}`;
};

const getMonthTitle = (dateString) => {
  const parsed = parseDateValue(dateString);

  if (!parsed) {
    return "Август 2026";
  }

  return `${MONTH_NAMES[parsed.month]} ${parsed.year}`;
};

const getMonthIndex = (dateString) => {
  const parsed = parseDateValue(dateString);

  if (!parsed) {
    return 0;
  }

  const start = new Date(2026, 7, 1);

  const current = new Date(parsed.year, parsed.month, 1);

  const index =
    (current.getFullYear() - start.getFullYear()) * 12 +
    (current.getMonth() - start.getMonth());

  return Math.max(0, Math.min(11, index));
};

/*
|--------------------------------------------------------------------------
| SCREEN
|--------------------------------------------------------------------------
*/

export default function DateScreen() {
  const params = useLocalSearchParams();

  const initialDate =
    typeof params.date === "string"
      ? params.date
      : typeof params.selectedDate === "string"
        ? params.selectedDate
        : null;

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const [activeMonth, setActiveMonth] = useState(getMonthIndex(initialDate));

  const calendarRef = useRef(null);

  const selectedLabel = useMemo(() => {
    return formatDate(selectedDate);
  }, [selectedDate]);

  /*
  |--------------------------------------------------------------------------
  | MONTHS
  |--------------------------------------------------------------------------
  */

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(2026, 7 + index, 1);

      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        dateString: `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, "0")}-01`,
      };
    });
  }, []);

  /*
  |--------------------------------------------------------------------------
  | GO TO MONTH
  |--------------------------------------------------------------------------
  */

  const goToMonth = (index) => {
    if (index < 0 || index >= months.length) {
      return;
    }

    const target = months[index];

    setActiveMonth(index);

    calendarRef.current?.scrollToMonth(target.year, target.month, 1, true);
  };

  /*
  |--------------------------------------------------------------------------
  | MONTH CHANGE
  |--------------------------------------------------------------------------
  */

  const handleMonthChange = (month) => {
    const index = (month.year - 2026) * 12 + (month.month - 8);

    if (index >= 0 && index < 12) {
      setActiveMonth(index);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SELECT DATE
  |--------------------------------------------------------------------------
  */

  const handleDatePress = (day) => {
    if (!day?.dateString) {
      return;
    }

    setSelectedDate(day.dateString);
  };

  /*
  |--------------------------------------------------------------------------
  | CONFIRM
  |--------------------------------------------------------------------------
  */

  const handleConfirm = () => {
    if (!selectedDate) {
      return;
    }

    router.replace({
      pathname: "/home",

      params: {
        date: selectedDate,

        ...(params.time
          ? {
              time: String(params.time),
            }
          : {}),

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

  /*
  |--------------------------------------------------------------------------
  | BACK
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    router.back();
  };

  /*
  |--------------------------------------------------------------------------
  | MARKED DATES
  |--------------------------------------------------------------------------
  */

  const markedDates = useMemo(() => {
    if (!selectedDate) {
      return {};
    }

    return {
      [selectedDate]: {
        selected: true,
        selectedColor: "#D2B477",
        selectedTextColor: "#211A10",
      },
    };
  }, [selectedDate]);

  const currentMonth = months[activeMonth];

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

            <Text style={styles.headerTitle}>Выберите дату</Text>
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
            <Text style={styles.introTitle}>Когда вас ждать?</Text>

            <Text style={styles.introText}>
              Выберите удобную дату для вашего вечера в Пивнице.
            </Text>
          </View>

          {/* SELECTED DATE */}

          <View style={styles.selectedPreview}>
            <View style={styles.selectedPreviewContent}>
              <Text style={styles.selectedLabel}>ВЫБРАННАЯ ДАТА</Text>

              <Text style={styles.selectedValue}>
                {selectedDate ? selectedLabel : "Выберите дату"}
              </Text>
            </View>

            {selectedDate && (
              <View style={styles.selectedIcon}>
                <Check size={18} color="#211A10" strokeWidth={2.5} />
              </View>
            )}
          </View>

          {/* MONTH NAVIGATION */}

          <View style={styles.monthNavigation}>
            <Pressable
              onPress={() => goToMonth(activeMonth - 1)}
              disabled={activeMonth === 0}
              style={({ pressed }) => [
                styles.monthArrow,
                activeMonth === 0 && styles.monthArrowDisabled,
                pressed && activeMonth !== 0 && styles.pressed,
              ]}
            >
              <ChevronLeft
                size={18}
                color={activeMonth === 0 ? "#45413B" : "#EAE3C0"}
              />
            </Pressable>

            <View style={styles.monthTitleWrapper}>
              <Text style={styles.monthTitle}>
                {currentMonth
                  ? getMonthTitle(currentMonth.dateString)
                  : "Август 2026"}
              </Text>

              <View style={styles.monthCounter}>
                <Text style={styles.monthCounterText}>
                  {activeMonth + 1} / 12
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => goToMonth(activeMonth + 1)}
              disabled={activeMonth === 11}
              style={({ pressed }) => [
                styles.monthArrow,
                activeMonth === 11 && styles.monthArrowDisabled,
                pressed && activeMonth !== 11 && styles.pressed,
              ]}
            >
              <ChevronRight
                size={18}
                color={activeMonth === 11 ? "#45413B" : "#EAE3C0"}
              />
            </Pressable>
          </View>

          {/* CALENDAR */}

          <View style={styles.calendarWrapper}>
            <CalendarList
              ref={calendarRef}
              current={currentMonth?.dateString || START_DATE}
              minDate={TODAY_VALUE}
              maxDate={END_DATE}
              firstDay={1}
              horizontal
              pagingEnabled
              calendarWidth={width - 40}
              pastScrollRange={0}
              futureScrollRange={11}
              showScrollIndicator={false}
              hideExtraDays={false}
              disableAllTouchEventsForDisabledDays
              onDayPress={handleDatePress}
              onMonthChange={handleMonthChange}
              markedDates={markedDates}
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",

                textSectionTitleColor: "#77736B",
                textSectionTitleDisabledColor: "#45413B",

                selectedDayBackgroundColor: "#D2B477",
                selectedDayTextColor: "#211A10",

                todayTextColor: "#D2B477",

                dayTextColor: "#E6DFCB",
                textDisabledColor: "#5D5953",

                arrowColor: "#EAE3C0",

                monthTextColor: "#EEE7D2",

                textDayFontSize: 14,
                textDayFontWeight: "500",

                textMonthFontSize: 18,
                textMonthFontWeight: "600",

                textDayHeaderFontSize: 9,
                textDayHeaderFontWeight: "600",
              }}
              renderHeader={() => null}
              disableMonthChange
              style={styles.calendar}
            />
          </View>

          {/* MONTH DOTS */}

          <View style={styles.monthDots}>
            {months.map((month, index) => (
              <Pressable
                key={month.dateString}
                onPress={() => goToMonth(index)}
                style={[
                  styles.monthDot,
                  index === activeMonth && styles.monthDotActive,
                ]}
              />
            ))}
          </View>

          {/* LEGEND */}

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.legendAvailable} />

              <Text style={styles.legendText}>Доступно</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={styles.legendUnavailable} />

              <Text style={styles.legendText}>Недоступно</Text>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM */}

        <View style={styles.bottom}>
          <Pressable
            onPress={handleConfirm}
            disabled={!selectedDate}
            style={({ pressed }) => [
              styles.confirmButton,

              !selectedDate && styles.confirmButtonDisabled,

              pressed && selectedDate && styles.confirmPressed,
            ]}
          >
            <LinearGradient
              colors={
                selectedDate
                  ? ["#D2B477", "#B29259", "#96723F"]
                  : ["#45413B", "#35322E"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmGradient}
            >
              <Text
                style={[
                  styles.confirmText,
                  !selectedDate && styles.confirmTextDisabled,
                ]}
              >
                ВЫБРАТЬ ДАТУ
              </Text>

              {selectedDate && (
                <Check size={19} color="#211A10" strokeWidth={2.5} />
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
