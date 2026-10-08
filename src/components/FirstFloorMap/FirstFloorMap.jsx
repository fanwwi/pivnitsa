import { useState } from "react";
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
    unavailable: require("../../assets/tables/smallTableBooked.png"),
  },

  big: {
    normal: require("../../assets/tables/bigTableNormal.png"),
    booked: require("../../assets/tables/bigTableBooked.png"),
    selected: require("../../assets/tables/bigTableSelected.png"),
    unavailable: require("../../assets/tables/bigTableBooked.png"),
  },

  vip: {
    normal: require("../../assets/tables/vipNormal.png"),
    booked: require("../../assets/tables/vipBooked.png"),
    selected: require("../../assets/tables/vipSelected.png"),
    unavailable: require("../../assets/tables/vipBooked.png"),
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
    type: "exitSmoking",
    x: 40,
    y: 385,
    width: 310,
    height: 250,
    label: "Курящий зал",
  },
];

// ======================================================
// HELPERS
// ======================================================

function getTableType(table) {
  if (table.type === "small" || table.type === "big" || table.type === "vip") {
    return table.type;
  }

  if (table.capacity >= 8) {
    return "vip";
  }

  if (table.capacity >= 6) {
    return "big";
  }

  return "small";
}

function normalizeTable(table) {
  return {
    ...table,

    id: String(table.id),

    number: String(table.tableNumber ?? table.number ?? table.id),

    capacity: Number(table.capacity) || 0,

    x: Number(table.positionX ?? table.x ?? 0),

    y: Number(table.positionY ?? table.y ?? 0),

    status: String(table.status ?? "FREE").toUpperCase(),

    fitsCapacity: table.fitsCapacity !== false,

    type: getTableType(table),
  };
}

// ======================================================
// COMPONENT
// ======================================================

export default function FirstFloorMap({
  tables = [],
  bookedTableIds = [],
  onTableSelect,
  scale = 1,
}) {
  const [selectedTableId, setSelectedTableId] = useState(null);

  const normalizedTables = tables.map(normalizeTable);

  const handleTablePress = (table) => {
    const isBooked =
      table.status === "BOOKED" || bookedTableIds.includes(table.id);

    const isUnavailable = table.status === "UNAVAILABLE";

    const doesNotFit = table.fitsCapacity === false;

    const cannotSelect = isBooked || isUnavailable || doesNotFit;

    if (cannotSelect) {
      return;
    }

    if (selectedTableId === table.id) {
      setSelectedTableId(null);
      onTableSelect?.(null);
      return;
    }

    setSelectedTableId(table.id);

    onTableSelect?.({
      ...table,
      status: "selected",
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.map,
              {
                width: MAP_WIDTH * scale,
                height: MAP_HEIGHT * scale,
              },
            ]}
          >
            {/* FLOOR OBJECTS */}

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

            {/* TABLES */}

            {normalizedTables.map((table) => {
              const isBooked =
                table.status === "BOOKED" || bookedTableIds.includes(table.id);

              const isUnavailable = table.status === "UNAVAILABLE";

              const doesNotFit = table.fitsCapacity === false;

              const isSelected =
                selectedTableId === table.id &&
                !isBooked &&
                !isUnavailable &&
                !doesNotFit;

              const status = isBooked
                ? "booked"
                : isUnavailable
                  ? "unavailable"
                  : isSelected
                    ? "selected"
                    : "normal";

              const tableImage = TABLE_IMAGES[table.type]?.[status];

              if (!tableImage) {
                return null;
              }

              const disabled = isBooked || isUnavailable || doesNotFit;

              return (
                <Pressable
                  key={table.id}
                  onPress={() => handleTablePress(table)}
                  disabled={disabled}
                  style={({ pressed }) => [
                    styles.table,
                    {
                      left: table.x * scale,
                      top: table.y * scale,
                      width: 42 * scale,
                      height: 42 * scale,
                    },
                    pressed && !disabled && styles.tablePressed,
                  ]}
                >
                  <Image
                    source={tableImage}
                    resizeMode="contain"
                    style={styles.tableImage}
                  />

                  {/* CAPACITY */}

                  <View
                    style={[
                      styles.capacity,
                      (isBooked || isUnavailable || doesNotFit) &&
                        styles.capacityBooked,
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
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
