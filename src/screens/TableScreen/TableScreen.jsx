import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Check, ChevronRight, Users, X } from "lucide-react-native";

import FirstFloorMap from "../../components/FirstFloorMap/FirstFloorMap";
import SecondFloorMap from "../../components/SecondFloorMap/SecondFloorMap";
import Navbar from "../../components/Navbar/Navbar";

import styles from "./TableScreen.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

export default function TableScreen() {
  const params = useLocalSearchParams();

  const date = params.date ? String(params.date) : "";
  const time = params.time ? String(params.time) : "";

  const guestsCount = params.guests ? Number(params.guests) : 0;

  const initialFloor = Number(params.floor) === 2 ? 2 : 1;

  const [activeFloor, setActiveFloor] = useState(initialFloor);

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizedTables = useMemo(() => {
    return tables.map((table) => ({
      ...table,

      id: String(table.id),

      number: String(table.tableNumber ?? table.number ?? table.id ?? ""),

      capacity: Number(table.capacity) || 0,

      x: Number(table.positionX ?? table.x ?? 0),

      y: Number(table.positionY ?? table.y ?? 0),

      status: String(table.status ?? "FREE").toUpperCase(),

      fitsCapacity: table.fitsCapacity !== false,

      type:
        table.type ??
        (Number(table.capacity) >= 8
          ? "vip"
          : Number(table.capacity) >= 6
            ? "big"
            : "small"),
    }));
  }, [tables]);

  const loadTables = async (floor) => {
    if (!date) {
      setTables([]);
      setError("Не выбрана дата.");
      setLoading(false);
      return;
    }

    if (!guestsCount || guestsCount < 1) {
      setTables([]);
      setError("Сначала выберите количество гостей.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams({
        date,
        guestsCount: String(guestsCount),
        hallId: String(floor),
      });

      const url = `${API_URL}/api/v1/tables/status?${query.toString()}`;

      console.log("========================================");
      console.log("TABLES STATUS REQUEST");
      console.log("URL:", url);
      console.log("DATE:", date);
      console.log("TIME:", time);
      console.log("GUESTS:", guestsCount);
      console.log("HALL:", floor);
      console.log("========================================");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const rawText = await response.text();

      console.log("TABLES STATUS HTTP:", response.status);

      console.log("TABLES STATUS RAW RESPONSE:", rawText);

      let data = null;

      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = rawText;
      }

      if (!response.ok) {
        let message = `Ошибка загрузки столиков (${response.status})`;

        if (data && typeof data === "object") {
          message = data.message || data.error || data.detail || message;
        } else if (typeof data === "string" && data.trim()) {
          message = data;
        }

        throw new Error(message);
      }

      if (!Array.isArray(data)) {
        console.error("TABLES STATUS INVALID DATA:", data);

        throw new Error("Backend вернул некорректный формат столиков.");
      }

      console.log("TABLES STATUS TABLES:", data);

      setTables(data);
      setSelectedTable(null);
    } catch (error) {
      console.error("TABLES STATUS ERROR:", error);

      setTables([]);
      setSelectedTable(null);

      setError(error?.message || "Не удалось загрузить столики.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables(activeFloor);
  }, [activeFloor, date, guestsCount]);

  const handleTableSelect = (table) => {
    if (!table) {
      return;
    }

    const status = String(table.status ?? "FREE").toUpperCase();

    const fitsCapacity = table.fitsCapacity !== false;

    if (status !== "FREE") {
      return;
    }

    if (!fitsCapacity) {
      return;
    }

    setSelectedTable(table);
  };

  const handleFloorChange = (floor) => {
    if (floor === activeFloor) {
      return;
    }

    setSelectedTable(null);
    setActiveFloor(floor);
  };

  const handleBooking = () => {
    if (!selectedTable) {
      return;
    }

    const tableId = selectedTable.id ?? selectedTable.tableId;

    const tableNumber =
      selectedTable.number ?? selectedTable.tableNumber ?? tableId;

    router.push({
      pathname: "/booking",

      params: {
        date,
        time,

        guests: String(guestsCount),

        floor: String(activeFloor),

        tableId: String(tableId),

        table: `Столик №${tableNumber}`,

        tableNumber: String(tableNumber),

        tableType: String(selectedTable.type || "стол"),

        capacity: String(selectedTable.capacity || 0),

        source: "table",
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleRetry = () => {
    loadTables(activeFloor);
  };

  const freeCount = normalizedTables.filter(
    (table) => table.status === "FREE" && table.fitsCapacity !== false,
  ).length;

  const bookedCount = normalizedTables.filter(
    (table) => table.status === "BOOKED",
  ).length;

  const unavailableCount = normalizedTables.filter(
    (table) => table.status === "UNAVAILABLE",
  ).length;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <ArrowLeft size={21} color="#EAE3C0" strokeWidth={1.8} />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>БРОНИРОВАНИЕ</Text>

            <Text style={styles.title}>Выберите столик</Text>
          </View>
        </View>

        {/* BOOKING INFO */}

        <View style={styles.bookingInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ДАТА</Text>

            <Text style={styles.infoValue}>{date || "Не выбрана"}</Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ВРЕМЯ</Text>

            <Text style={styles.infoValue}>{time || "Не выбрано"}</Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ГОСТИ</Text>

            <View style={styles.guestsValue}>
              <Users size={15} color="#B29259" />

              <Text style={styles.infoValue}>{guestsCount || "—"}</Text>
            </View>
          </View>
        </View>

        {/* FLOOR SWITCH */}

        <View style={styles.floorSwitch}>
          <Pressable
            onPress={() => handleFloorChange(1)}
            style={[
              styles.floorButton,
              activeFloor === 1 && styles.floorButtonActive,
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
          </Pressable>

          <Pressable
            onPress={() => handleFloorChange(2)}
            style={[
              styles.floorButton,
              activeFloor === 2 && styles.floorButtonActive,
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
          </Pressable>
        </View>

        {/* LEGEND */}

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendFree]} />

            <Text style={styles.legendText}>Свободен</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendBooked]} />

            <Text style={styles.legendText}>Забронирован</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendUnavailable]} />

            <Text style={styles.legendText}>Недоступен</Text>
          </View>
        </View>

        {/* MAP */}

        <View style={styles.mapContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#B29259" />

              <Text style={styles.loadingText}>Загружаем столики...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <View style={styles.errorIcon}>
                <X size={24} color="#B29259" strokeWidth={1.8} />
              </View>

              <Text style={styles.errorTitle}>
                Не удалось загрузить столики
              </Text>

              <Text style={styles.errorText}>{error}</Text>

              <Pressable
                onPress={handleRetry}
                style={({ pressed }) => [
                  styles.retryButton,
                  pressed && styles.retryButtonPressed,
                ]}
              >
                <Text style={styles.retryText}>ПОВТОРИТЬ</Text>
              </Pressable>
            </View>
          ) : normalizedTables.length === 0 ? (
            <View style={styles.errorContainer}>
              <View style={styles.errorIcon}>
                <X size={24} color="#B29259" strokeWidth={1.8} />
              </View>

              <Text style={styles.errorTitle}>Столики не найдены</Text>

              <Text style={styles.errorText}>
                Для выбранной даты и количества гостей столиков пока нет.
              </Text>

              <Pressable
                onPress={handleRetry}
                style={({ pressed }) => [
                  styles.retryButton,
                  pressed && styles.retryButtonPressed,
                ]}
              >
                <Text style={styles.retryText}>ОБНОВИТЬ</Text>
              </Pressable>
            </View>
          ) : activeFloor === 1 ? (
            <FirstFloorMap
              tables={normalizedTables}
              selectedTable={selectedTable}
              onTableSelect={handleTableSelect}
            />
          ) : (
            <SecondFloorMap
              tables={normalizedTables}
              selectedTable={selectedTable}
              onTableSelect={handleTableSelect}
            />
          )}
        </View>

        {/* SELECTED TABLE */}

        {selectedTable && (
          <View style={styles.selectedCard}>
            <View style={styles.selectedHeader}>
              <View style={styles.selectedIcon}>
                <Check size={19} color="#211A10" strokeWidth={2.4} />
              </View>

              <View style={styles.selectedHeaderText}>
                <Text style={styles.selectedEyebrow}>ВЫБРАНО</Text>

                <Text style={styles.selectedTitle}>
                  Столик №{selectedTable.number}
                </Text>
              </View>
            </View>

            <View style={styles.selectedDetails}>
              <View style={styles.selectedDetail}>
                <Text style={styles.selectedDetailLabel}>ВМЕСТИМОСТЬ</Text>

                <Text style={styles.selectedDetailValue}>
                  {selectedTable.capacity}{" "}
                  {selectedTable.capacity === 1
                    ? "место"
                    : selectedTable.capacity >= 2 && selectedTable.capacity <= 4
                      ? "места"
                      : "мест"}
                </Text>
              </View>

              <View style={styles.selectedDetail}>
                <Text style={styles.selectedDetailLabel}>ЭТАЖ</Text>

                <Text style={styles.selectedDetailValue}>{activeFloor}</Text>
              </View>
            </View>

            <Pressable
              onPress={handleBooking}
              style={({ pressed }) => [
                styles.bookButton,
                pressed && styles.bookButtonPressed,
              ]}
            >
              <Text style={styles.bookButtonText}>ПРОДОЛЖИТЬ</Text>

              <ChevronRight size={19} color="#211A10" strokeWidth={2.2} />
            </Pressable>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <Navbar />
    </View>
  );
}
