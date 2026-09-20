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
    type: "exitSmoking",
    x: 40,
    y: 385,
    width: 310,
    height: 250,
    label: "Курящий зал",
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
    status: "booked",
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
    number: 25,
    type: "small",
    capacity: 4,
    x: 195,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-11",
    number: 26,
    type: "small",
    capacity: 4,
    x: 240,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-12",
    number: 27,
    type: "small",
    capacity: 4,
    x: 285,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-13",
    number: 28,
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
    number: 29,
    type: "small",
    capacity: 4,
    x: 240,
    y: 120,
    status: "booked",
  },

  {
    id: "table-sm-15",
    number: 30,
    type: "small",
    capacity: 4,
    x: 285,
    y: 120,
    status: "normal",
  },

  {
    id: "table-sm-16",
    number: 31,
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
    number: 22,
    type: "small",
    capacity: 4,
    x: 285,
    y: 185,
    status: "normal",
  },

  {
    id: "table-sm-19",
    number: 23,
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
    number: 16,
    type: "small",
    capacity: 4,
    x: 195,
    y: 145,
    status: "normal",
  },

  {
    id: "table-sm-21",
    number: 15,
    type: "small",
    capacity: 4,
    x: 195,
    y: 240,
    status: "booked",
  },

  {
    id: "table-sm-22",
    number: 18,
    type: "small",
    capacity: 4,
    x: 240,
    y: 250,
    status: "normal",
  },

  {
    id: "table-sm-23",
    number: 21,
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
    number: 19,
    type: "small",
    capacity: 4,
    x: 240,
    y: 315,
    status: "normal",
  },

  {
    id: "table-sm-26",
    number: 20,
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
    number: 1,
    type: "small",
    capacity: 4,
    x: 45,
    y: 35,
    status: "normal",
  },

  {
    id: "table-sm-5",
    number: 2,
    type: "small",
    capacity: 4,
    x: 45,
    y: 125,
    status: "normal",
  },

  {
    id: "table-sm-6",
    number: 3,
    type: "small",
    capacity: 4,
    x: 45,
    y: 210,
    status: "normal",
  },

  {
    id: "table-sm-7",
    number: 4,
    type: "small",
    capacity: 4,
    x: 45,
    y: 300,
    status: "normal",
  },

  // ====================================================
  // BIG TABLES
  // ====================================================

  {
    id: "table-big-30",
    number: 11,
    type: "big",
    capacity: 6,
    x: 80,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-31",
    number: 12,
    type: "big",
    capacity: 6,
    x: 120,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-32",
    number: 13,
    type: "big",
    capacity: 6,
    x: 160,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-33",
    number: 14,
    type: "big",
    capacity: 6,
    x: 200,
    y: 355,
    status: "normal",
  },

  {
    id: "table-big-40",
    number: 1,
    type: "big",
    capacity: 6,
    x: 50,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-41",
    number: 5,
    type: "big",
    capacity: 6,
    x: 85,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-42",
    number: 6,
    type: "big",
    capacity: 6,
    x: 120,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-43",
    number: 7,
    type: "big",
    capacity: 6,
    x: 155,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-45",
    number: 2,
    type: "big",
    capacity: 6,
    x: 225,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-46",
    number: 8,
    type: "big",
    capacity: 6,
    x: 260,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-47",
    number: 9,
    type: "big",
    capacity: 6,
    x: 295,
    y: 430,
    status: "normal",
  },

  {
    id: "table-big-48",
    number: 10,
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
  scale = 1,
}) {
  const [selectedTableId, setSelectedTableId] = useState(null);

  const handleTablePress = (table) => {
    const isBooked =
      table.status === "booked" || bookedTableIds.includes(table.id);

    if (isBooked) {
      return;
    }

    // Снятие выбора
    if (selectedTableId === table.id) {
      setSelectedTableId(null);
      onTableSelect?.(null);
      return;
    }

    // Новый выбранный столик
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
            {/* SCENE / BAR / EXIT */}

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

            {tables.map((table) => {
              const isBooked =
                table.status === "booked" || bookedTableIds.includes(table.id);

              const isSelected = selectedTableId === table.id && !isBooked;

              const status = isBooked
                ? "booked"
                : isSelected
                  ? "selected"
                  : "normal";

              const tableImage = TABLE_IMAGES[table.type]?.[status];

              if (!tableImage) {
                return null;
              }

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
                  <Image
                    source={tableImage}
                    resizeMode="contain"
                    style={styles.tableImage}
                  />

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
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
