import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./FirstFloorMap.styles";

// ======================================================
// ASSETS
// ======================================================

const TABLE_IMAGES = {
  small: {
    normal: require("../../assets/tables/smallTableNormal.png"),
    booked: require("../../assets/tables/smallTableBooked.png"),
    selected: require("../../assets/tables/smallTableSelected.png"),
  },

  big: {
    normal: require("../../assets/tables/bigTableNormal.png"),
    booked: require("../../assets/tables/bigTableBooked.png"),
    selected: require("../../assets/tables/bigTableSelected.png"),
  },

  vip: {
    normal: require("../../assets/tables/vipNormal.png"),
    booked: require("../../assets/tables/vipBooked.png"),
    selected: require("../../assets/tables/vipSelected.png"),
  },
};

const FLOOR_OBJECTS = {
  scene: require("../../assets/floor/scene.png"),
  bar: require("../../assets/floor/bar.png"),
  exit: require("../../assets/floor/exit.png"),
  exitSmoking: require("../../assets/floor/exitSmoking.png"),
};

// ======================================================
// MAP SIZE
// ======================================================

const MAP_WIDTH = 380;
const MAP_HEIGHT = 540;

// ======================================================
// MAP OBJECTS
// ======================================================

const MAP_OBJECTS = [
  {
    id: "scene",
    type: "scene",
    x: 55,
    y: 20,
    width: 175,
    height: 70,
    rotation: "0deg",
  },

  {
    id: "bar",
    type: "bar",
    x: 280,
    y: 310,
    width: 108,
    height: 105,
    rotation: "-90deg",
  },

  {
    id: "exit-main",
    type: "exit",
    x: -5,
    y: 380,
    width: 65,
    height: 125,
    rotation: "-90deg",
  },
  {
    id: "exit-smoking",
    type: "exitSmoking", // или другой тип, если в приложении есть отдельный стиль для курящей зоны
    x: 40,
    y: 385, // Расположен сразу под основным входом
    width: 310,
    height: 250,
    label: "Курящий зал", // Текст подписи, если компонент карты его поддерживает
  },
];

// ======================================================
// TABLE CONFIGURATION
// ======================================================

const INITIAL_TABLES = [
  // ====================================================
  // VIP
  // ====================================================

  {
    id: "table-vip-1",
    number: 1,
    type: "vip",
    capacity: 8,
    x: 5,
    y: 325,
    status: "normal",
  },

  {
    id: "table-vip-2",
    number: 2,
    type: "vip",
    capacity: 8,
    x: 5,
    y: 170,
    status: "normal",
  },

  {
    id: "table-vip-3",
    number: 3,
    type: "vip",
    capacity: 8,
    x: 5,
    y: 25,
    status: "normal",
  },

  // ====================================================
  // TOP SMALL TABLES
  // ====================================================

  {
    id: "table-sm-10",
    number: 10,
    type: "small",
    capacity: 4,
    x: 195,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-11",
    number: 11,
    type: "small",
    capacity: 4,
    x: 240,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-12",
    number: 12,
    type: "small",
    capacity: 4,
    x: 285,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-13",
    number: 13,
    type: "small",
    capacity: 4,
    x: 330,
    y: 35,
    status: "normal",
  },

  // ====================================================
  // RIGHT SIDE
  // ====================================================

  {
    id: "table-sm-14",
    number: 14,
    type: "small",
    capacity: 4,
    x: 240,
    y: 120,
    status: "normal",
  },

  {
    id: "table-sm-15",
    number: 15,
    type: "small",
    capacity: 4,
    x: 285,
    y: 120,
    status: "normal",
  },

  {
    id: "table-sm-16",
    number: 16,
    type: "small",
    capacity: 4,
    x: 330,
    y: 120,
    status: "normal",
  },

  {
    id: "table-sm-17",
    number: 17,
    type: "small",
    capacity: 4,
    x: 240,
    y: 185,
    status: "normal",
  },

  {
    id: "table-sm-18",
    number: 18,
    type: "small",
    capacity: 4,
    x: 285,
    y: 185,
    status: "normal",
  },

  {
    id: "table-sm-19",
    number: 19,
    type: "small",
    capacity: 4,
    x: 330,
    y: 185,
    status: "normal",
  },

  // ====================================================
  // CENTER
  // ====================================================

  {
    id: "table-sm-20",
    number: 20,
    type: "small",
    capacity: 4,
    x: 195,
    y: 145,
    status: "normal",
  },

  {
    id: "table-sm-21",
    number: 21,
    type: "small",
    capacity: 4,
    x: 195,
    y: 240,
    status: "normal",
  },

  {
    id: "table-sm-22",
    number: 22,
    type: "small",
    capacity: 4,
    x: 240,
    y: 250,
    status: "normal",
  },

  {
    id: "table-sm-23",
    number: 23,
    type: "small",
    capacity: 4,
    x: 285,
    y: 250,
    status: "normal",
  },

  {
    id: "table-sm-24",
    number: 24,
    type: "small",
    capacity: 4,
    x: 330,
    y: 250,
    status: "normal",
  },

  {
    id: "table-sm-25",
    number: 25,
    type: "small",
    capacity: 4,
    x: 240,
    y: 315,
    status: "normal",
  },

  {
    id: "table-sm-26",
    number: 26,
    type: "small",
    capacity: 4,
    x: 240,
    y: 375,
    status: "normal",
  },

  // ====================================================
  // LEFT SMALL TABLES
  // ====================================================

  {
    id: "table-sm-4",
    number: 4,
    type: "small",
    capacity: 4,
    x: 45,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-5",
    number: 5,
    type: "small",
    capacity: 4,
    x: 45,
    y: 125,
    status: "normal",
  },

  {
    id: "table-sm-6",
    number: 6,
    type: "small",
    capacity: 4,
    x: 45,
    y: 210,
    status: "normal",
  },

  {
    id: "table-sm-7",
    number: 7,
    type: "small",
    capacity: 4,
    x: 45,
    y: 300,
    status: "normal",
  },

  // ====================================================
  // BIG TABLES — CENTER
  // ====================================================

  {
    id: "table-big-30",
    number: 30,
    type: "big",
    capacity: 6,
    x: 80,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-31",
    number: 31,
    type: "big",
    capacity: 6,
    x: 120,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-32",
    number: 32,
    type: "big",
    capacity: 6,
    x: 160,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-33",
    number: 33,
    type: "big",
    capacity: 6,
    x: 200,
    y: 355,
    status: "normal",
  },

  // ====================================================
  // BIG TABLES — BOTTOM
  // ====================================================

  {
    id: "table-big-40",
    number: 40,
    type: "big",
    capacity: 6,
    x: 50,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-41",
    number: 41,
    type: "big",
    capacity: 6,
    x: 85,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-42",
    number: 42,
    type: "big",
    capacity: 6,
    x: 120,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-43",
    number: 43,
    type: "big",
    capacity: 6,
    x: 155,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-44",
    number: 44,
    type: "big",
    capacity: 6,
    x: 190,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-45",
    number: 45,
    type: "big",
    capacity: 6,
    x: 225,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-46",
    number: 46,
    type: "big",
    capacity: 6,
    x: 260,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-47",
    number: 47,
    type: "big",
    capacity: 6,
    x: 295,
    y: 430,
    status: "normal",
  },
  {
    id: "table-big-48",
    number: 48,
    type: "big",
    capacity: 6,
    x: 330,
    y: 430,
    status: "normal",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function FirstFloorMap({
  tables = INITIAL_TABLES,
  bookedTableIds = [],
  onTableSelect,
  initialSelectedTableId = null,
  scale = 1,
}) {
  const [selectedTableId, setSelectedTableId] = useState(
    initialSelectedTableId,
  );

  const processedTables = useMemo(() => {
    return tables.map((table) => {
      const isBooked =
        table.status === "booked" || bookedTableIds.includes(table.id);

      const isSelected = selectedTableId === table.id && !isBooked;

      let status = "normal";

      if (isBooked) {
        status = "booked";
      } else if (isSelected) {
        status = "selected";
      }

      return {
        ...table,
        status,
      };
    });
  }, [tables, bookedTableIds, selectedTableId]);

  const handleTablePress = (table) => {
    if (table.status === "booked") {
      return;
    }

    const nextSelectedId = selectedTableId === table.id ? null : table.id;

    setSelectedTableId(nextSelectedId);

    const selectedTable =
      nextSelectedId === null
        ? null
        : {
            ...table,
            status: "selected",
          };

    onTableSelect?.(selectedTable);
  };

  const selectedTable = processedTables.find(
    (table) => table.id === selectedTableId,
  );

  return (
    <View style={styles.wrapper}>
      {/* ==================================================
          MAP
      ================================================== */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.verticalScroll}
        >
          <View
            style={[
              styles.map,
              {
                width: MAP_WIDTH * scale,
                height: MAP_HEIGHT * scale,
              },
            ]}
          >
            {/* ==================================================
                SCENE / BAR / EXIT
            ================================================== */}

            {MAP_OBJECTS.map((object) => {
              const image = FLOOR_OBJECTS[object.type];

              if (!image) {
                return null;
              }

              return (
                <Image
                  key={object.id}
                  source={image}
                  resizeMode="contain"
                  style={[
                    styles.mapObject,
                    {
                      left: object.x * scale,
                      top: object.y * scale,
                      width: object.width * scale,
                      height: object.height * scale,
                      transform: [
                        {
                          rotate: object.rotation || "0deg",
                        },
                      ],
                    },
                  ]}
                />
              );
            })}

            {/* ==================================================
                TABLES
            ================================================== */}

            {processedTables.map((table) => {
              const tableImage = TABLE_IMAGES[table.type]?.[table.status];

              if (!tableImage) {
                return null;
              }

              const isBooked = table.status === "booked";
              const isSelected = table.status === "selected";

              return (
                <Pressable
                  key={table.id}
                  onPress={() => handleTablePress(table)}
                  disabled={isBooked}
                  style={({ pressed }) => [
                    styles.table,
                    {
                      left: table.x * scale,
                      top: table.y * scale,
                      width: 42 * scale,
                      height: 42 * scale,
                    },
                    pressed && !isBooked && styles.tablePressed,
                  ]}
                >
                  {/* TABLE IMAGE */}

                  <Image
                    source={tableImage}
                    resizeMode="contain"
                    style={styles.tableImage}
                  />

                  {/* TABLE NUMBER */}

                  <View
                    style={[
                      styles.tableNumber,
                      isBooked && styles.tableNumberBooked,
                      isSelected && styles.tableNumberSelected,
                    ]}
                  >
                    <Text style={styles.tableNumberText}>{table.number}</Text>
                  </View>

                  {/* CAPACITY */}

                  <View
                    style={[
                      styles.capacity,
                      isBooked && styles.capacityBooked,
                      isSelected && styles.capacitySelected,
                    ]}
                  >
                    <Ionicons
                      name={table.capacity >= 6 ? "people" : "people-outline"}
                      size={11 * scale}
                      color={isSelected ? "#211A10" : "#EAE3C0"}
                    />

                    <Text
                      style={[
                        styles.capacityText,
                        isSelected && styles.capacityTextSelected,
                      ]}
                    >
                      {table.capacity}
                    </Text>
                  </View>

                  {/* BOOKED INDICATOR */}

                  {isBooked && (
                    <View style={styles.bookedDot}>
                      <Ionicons
                        name="lock-closed"
                        size={7 * scale}
                        color="#FFFFFF"
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>

      {/* ======================================================
          SELECTED TABLE INFO
      ====================================================== */}

      {selectedTable && (
        <View style={styles.selectedInfo}>
          <View style={styles.selectedInfoLeft}>
            <View style={styles.selectedIcon}>
              <Ionicons name="restaurant-outline" size={17} color="#EAE3C0" />
            </View>

            <View>
              <Text style={styles.selectedLabel}>ВЫБРАННЫЙ СТОЛ</Text>

              <Text style={styles.selectedTitle}>
                Стол №{selectedTable.number}
              </Text>

              <View style={styles.selectedMeta}>
                <Text style={styles.selectedType}>
                  {selectedTable.type === "vip"
                    ? "VIP"
                    : selectedTable.type === "big"
                      ? "BIG"
                      : "STANDARD"}
                </Text>

                <View style={styles.metaDot} />

                <Ionicons
                  name="people-outline"
                  size={11}
                  color="rgba(234,227,192,0.65)"
                />

                <Text style={styles.selectedSubtitle}>
                  {selectedTable.capacity} мест
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => {
              setSelectedTableId(null);
              onTableSelect?.(null);
            }}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.clearButtonPressed,
            ]}
          >
            <Ionicons name="close" size={16} color="#EAE3C0" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
