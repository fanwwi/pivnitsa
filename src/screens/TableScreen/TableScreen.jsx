import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Layers3 } from "lucide-react-native";

import FirstFloorMap from "../../components/FirstFloorMap/FirstFloorMap";
import SecondFloorMap from "../../components/SecondFloorMap/SecondFloorMap";

import styles from "./TableScreen.styles";

export default function TableScreen() {
  const params = useLocalSearchParams();

  const initialFloor = Number(params.floor) === 2 ? 2 : 1;

  const [activeFloor, setActiveFloor] = useState(initialFloor);

  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleFloorChange = (floor) => {
    setActiveFloor(floor);
    setSelectedTable(null);
  };

  const handleBack = () => {
    router.back();
  };

  const handleBooking = () => {
    if (!selectedTable) {
      return;
    }

    const bookingParams = {
      date: params.date ? String(params.date) : "",

      time: params.time ? String(params.time) : "",

      guests: params.guests ? String(params.guests) : "",

      floor: String(activeFloor),

      tableId: String(selectedTable.id),

      table: `Столик №${selectedTable.number}`,

      tableNumber: String(selectedTable.number),

      tableType: String(selectedTable.type),

      capacity: String(selectedTable.capacity),
    };

    /*
     * ==============================
     * ОТКРЫТО ИЗ BOOKING SCREEN
     * ==============================
     *
     * Возвращаемся именно на предыдущий
     * BookingScreen.
     *
     * Важно: BookingScreen уже содержит
     * старые params, поэтому при простом
     * router.back() новые данные столика
     * сами туда не попадут.
     *
     * Поэтому здесь заменяем текущий
     * TableScreen на BookingScreen с
     * обновлёнными параметрами.
     */
    if (params.source === "booking") {
      router.replace({
        pathname: "/booking",
        params: {
          ...bookingParams,
          source: "home",
        },
      });

      return;
    }

    /*
     * ==============================
     * ОТКРЫТО ИЗ HOME / BOOKING SECTION
     * ==============================
     *
     * Возвращаем пользователя на Home
     * и передаём focusBooking.
     *
     * HomeScreen увидит focusBooking=1
     * и автоматически прокрутит ScrollView
     * к BookingSection.
     */
    router.replace({
      pathname: "/home",
      params: {
        ...bookingParams,
        focusBooking: "1",
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <ChevronLeft size={21} color="#EAE3C0" strokeWidth={1.8} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.eyebrow}>ПИВНИЦА</Text>

          <Text style={styles.title}>Выберите столик</Text>
        </View>

        <View style={styles.headerIcon}>
          <Layers3 size={19} color="#B29259" strokeWidth={1.7} />
        </View>
      </View>

      {/* =========================
          FLOOR SWITCHER
      ========================= */}

      <View style={styles.floorSwitcher}>
        <Pressable
          onPress={() => handleFloorChange(1)}
          style={({ pressed }) => [
            styles.floorButton,
            activeFloor === 1 && styles.floorButtonActive,
            pressed && styles.floorButtonPressed,
          ]}
        >
          <Text
            style={[
              styles.floorButtonText,
              activeFloor === 1 && styles.floorButtonTextActive,
            ]}
          >
            1 ЭТАЖ
          </Text>

          {activeFloor === 1 && <View style={styles.floorIndicator} />}
        </Pressable>

        <Pressable
          onPress={() => handleFloorChange(2)}
          style={({ pressed }) => [
            styles.floorButton,
            activeFloor === 2 && styles.floorButtonActive,
            pressed && styles.floorButtonPressed,
          ]}
        >
          <Text
            style={[
              styles.floorButtonText,
              activeFloor === 2 && styles.floorButtonTextActive,
            ]}
          >
            2 ЭТАЖ
          </Text>

          {activeFloor === 2 && <View style={styles.floorIndicator} />}
        </Pressable>
      </View>

      {/* =========================
          LEGEND
      ========================= */}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendAvailable]} />

          <Text style={styles.legendText}>Свободен</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendSelected]} />

          <Text style={styles.legendText}>Выбран</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendBooked]} />

          <Text style={styles.legendText}>Занят</Text>
        </View>
      </View>

      {/* =========================
          MAP
      ========================= */}

      <View style={styles.mapContainer}>
        {activeFloor === 1 ? (
          <FirstFloorMap onTableSelect={handleTableSelect} />
        ) : (
          <SecondFloorMap onTableSelect={handleTableSelect} />
        )}
      </View>

      {/* =========================
          SELECTED TABLE
      ========================= */}

      {selectedTable && (
        <View style={styles.bookingPanel}>
          <View style={styles.bookingInfo}>
            <View style={styles.bookingTableIcon}>
              <Text style={styles.bookingTableNumber}>
                {selectedTable.number}
              </Text>
            </View>

            <View style={styles.bookingText}>
              <Text style={styles.bookingLabel}>ВЫБРАННЫЙ СТОЛИК</Text>

              <Text style={styles.bookingTitle} numberOfLines={1}>
                Столик №{selectedTable.number}
              </Text>

              <View style={styles.bookingMeta}>
                <Text style={styles.bookingType}>{selectedTable.type}</Text>

                <View style={styles.bookingDot} />

                <Text style={styles.bookingCapacity}>
                  до {selectedTable.capacity} гостей
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={handleBooking}
            style={({ pressed }) => [
              styles.bookButton,
              pressed && styles.bookButtonPressed,
            ]}
          >
            <Text style={styles.bookButtonText}>ВЫБРАТЬ</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
