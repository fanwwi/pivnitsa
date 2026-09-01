import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import FirstFloorMap from "../../components/FirstFloorMap/FirstFloorMap";
import styles from "./TableScreen.styles";

// ======================================================
// FLOORS
// ======================================================

const FLOORS = [
  {
    id: 1,
    title: "1 этаж",
  },
  {
    id: 2,
    title: "2 этаж",
  },
];

// ======================================================
// SCREEN
// ======================================================

export default function TableScreen() {
  const params = useLocalSearchParams();

  // ======================================================
  // FLOOR
  // ======================================================

  const [activeFloor, setActiveFloor] = useState(Number(params.floor) || 1);

  // ======================================================
  // SELECTED TABLE
  // ======================================================

  const [selectedTable, setSelectedTable] = useState(null);

  // ======================================================
  // TABLE SELECT
  // ======================================================

  const handleTableSelect = (table) => {
    setSelectedTable(table);

    console.log("SELECTED TABLE:", table);
  };

  // ======================================================
  // FLOOR CHANGE
  // ======================================================

  const handleFloorChange = (floor) => {
    setActiveFloor(floor);
    setSelectedTable(null);
  };

  // ======================================================
  // BOOKING
  // ======================================================

  const handleBooking = () => {
    if (!selectedTable) {
      return;
    }

    const bookingData = {
      floor: activeFloor,
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      tableType: selectedTable.type,
      capacity: selectedTable.capacity,

      date: params.date ? String(params.date) : null,
      time: params.time ? String(params.time) : null,
      guests: params.guests ? String(params.guests) : null,
    };

    console.log("BOOKING DATA:", bookingData);

    // ====================================================
    // RETURN TO HOME
    // ====================================================

    router.replace({
      pathname: "/home",

      params: {
        date: bookingData.date || "",
        time: bookingData.time || "",
        guests: bookingData.guests || "",

        floor: String(bookingData.floor),

        tableId: String(bookingData.tableId),

        table: `Столик №${bookingData.tableNumber}`,

        tableNumber: String(bookingData.tableNumber),

        tableType: String(bookingData.tableType),

        capacity: String(bookingData.capacity),
      },
    });
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <View style={styles.container}>
      {/* ==================================================
          HEADER
      ================================================== */}

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>БРОНИРОВАНИЕ</Text>

          <Text style={styles.title}>Выберите столик</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="restaurant-outline" size={20} color="#EAE3C0" />
        </View>
      </View>

      {/* ==================================================
          FLOOR SWITCHER
      ================================================== */}

      <View style={styles.floorSwitcher}>
        {FLOORS.map((floor) => {
          const active = activeFloor === floor.id;

          return (
            <Pressable
              key={floor.id}
              onPress={() => handleFloorChange(floor.id)}
              style={({ pressed }) => [
                styles.floorButton,
                active && styles.floorButtonActive,
                pressed && styles.floorButtonPressed,
              ]}
            >
              <Text
                style={[
                  styles.floorButtonText,
                  active && styles.floorButtonTextActive,
                ]}
              >
                {floor.title}
              </Text>

              {active && <View style={styles.floorIndicator} />}
            </Pressable>
          );
        })}
      </View>

      {/* ==================================================
          MAP
      ================================================== */}

      <View style={styles.mapContainer}>
        {activeFloor === 1 ? (
          <FirstFloorMap onTableSelect={handleTableSelect} />
        ) : (
          <View style={styles.secondFloor}>
            <View style={styles.secondFloorIcon}>
              <Ionicons name="layers-outline" size={34} color="#B29259" />
            </View>

            <Text style={styles.secondFloorTitle}>2 этаж</Text>

            <Text style={styles.secondFloorSubtitle}>
              Планировка второго этажа
              {"\n"}
              скоро будет доступна
            </Text>
          </View>
        )}
      </View>

      {/* ==================================================
          LEGEND
      ================================================== */}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendBooked]} />

          <Text style={styles.legendText}>Занято</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendAvailable]} />

          <Text style={styles.legendText}>Свободно</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendSelected]} />

          <Text style={styles.legendText}>Ваш столик</Text>
        </View>
      </View>

      {/* ==================================================
          SELECTED TABLE
      ================================================== */}

      {selectedTable && activeFloor === 1 && (
        <View style={styles.bookingPanel}>
          {/* TABLE INFO */}

          <View style={styles.bookingInfo}>
            <View style={styles.bookingTableIcon}>
              <Ionicons name="restaurant" size={19} color="#211A10" />
            </View>

            <View style={styles.bookingText}>
              <Text style={styles.bookingLabel}>ВАШ ВЫБОР</Text>

              <Text style={styles.bookingTitle}>
                Стол №{selectedTable.number}
              </Text>

              <View style={styles.bookingMeta}>
                <Text style={styles.bookingType}>
                  {selectedTable.type === "vip"
                    ? "VIP"
                    : selectedTable.type === "big"
                      ? "BIG"
                      : "STANDARD"}
                </Text>

                <View style={styles.bookingDot} />

                <Ionicons
                  name="people-outline"
                  size={12}
                  color="rgba(234,227,192,0.65)"
                />

                <Text style={styles.bookingCapacity}>
                  {selectedTable.capacity} мест
                </Text>
              </View>
            </View>
          </View>

          {/* BOOK BUTTON */}

          <Pressable
            onPress={handleBooking}
            style={({ pressed }) => [
              styles.bookButton,
              pressed && styles.bookButtonPressed,
            ]}
          >
            <Text style={styles.bookButtonText}>ЗАБРОНИРОВАТЬ</Text>

            <Ionicons name="arrow-forward" size={17} color="#211A10" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
