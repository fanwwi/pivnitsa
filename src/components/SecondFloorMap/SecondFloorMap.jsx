import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./SecondFloorMap.styles";

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
  smokingZone: require("../../assets/floor/smokingZone.png"),
};

const MAP_WIDTH = 380;
const MAP_HEIGHT = 420;

const MAP_OBJECTS = [
  {
    id: "smoking-zone",
    type: "smokingZone",
    x: 33,
    y: 200,
    width: 310,
    height: 40,
  },
];

const INITIAL_TABLES = [
  {
    id: "table-100",
    number: 100,
    type: "small",
    capacity: 4,
    x: 290,
    y: 350,
    status: "normal",
  },
  {
    id: "table-101",
    number: 101,
    type: "small",
    capacity: 4,
    x: 240,
    y: 350,
    status: "booked",
  },
  {
    id: "table-102",
    number: 102,
    type: "small",
    capacity: 4,
    x: 190,
    y: 350,
    status: "normal",
  },
  {
    id: "table-103",
    number: 103,
    type: "small",
    capacity: 4,
    x: 140,
    y: 350,
    status: "normal",
  },
  {
    id: "table-104",
    number: 104,
    type: "small",
    capacity: 4,
    x: 90,
    y: 350,
    status: "normal",
  },
  {
    id: "table-105",
    number: 105,
    type: "small",
    capacity: 4,
    x: 40,
    y: 350,
    status: "normal",
  },

  {
    id: "table-106",
    number: 106,
    type: "small",
    capacity: 4,
    x: 40,
    y: 270,
    status: "normal",
  },
  {
    id: "table-107",
    number: 107,
    type: "small",
    capacity: 4,
    x: 90,
    y: 270,
    status: "normal",
  },
  {
    id: "table-108",
    number: 108,
    type: "small",
    capacity: 4,
    x: 140,
    y: 270,
    status: "normal",
  },
  {
    id: "table-109",
    number: 109,
    type: "small",
    capacity: 4,
    x: 240,
    y: 270,
    status: "normal",
  },
  {
    id: "table-110",
    number: 110,
    type: "small",
    capacity: 4,
    x: 290,
    y: 270,
    status: "normal",
  },

  {
    id: "table-200",
    number: 200,
    type: "small",
    capacity: 4,
    x: 290,
    y: 120,
    status: "normal",
  },
  {
    id: "table-201",
    number: 201,
    type: "small",
    capacity: 4,
    x: 240,
    y: 120,
    status: "normal",
  },
  {
    id: "table-202",
    number: 202,
    type: "small",
    capacity: 4,
    x: 190,
    y: 120,
    status: "normal",
  },
  {
    id: "table-203",
    number: 203,
    type: "small",
    capacity: 4,
    x: 140,
    y: 120,
    status: "normal",
  },
  {
    id: "table-204",
    number: 204,
    type: "small",
    capacity: 4,
    x: 90,
    y: 120,
    status: "normal",
  },
  {
    id: "table-205",
    number: 205,
    type: "small",
    capacity: 4,
    x: 40,
    y: 120,
    status: "normal",
  },

  {
    id: "table-206",
    number: 206,
    type: "small",
    capacity: 4,
    x: 75,
    y: 30,
    status: "normal",
  },
  {
    id: "table-207",
    number: 207,
    type: "small",
    capacity: 4,
    x: 120,
    y: 30,
    status: "normal",
  },
  {
    id: "table-208",
    number: 208,
    type: "small",
    capacity: 4,
    x: 165,
    y: 30,
    status: "normal",
  },
  {
    id: "table-209",
    number: 209,
    type: "small",
    capacity: 4,
    x: 210,
    y: 30,
    status: "normal",
  },
  {
    id: "table-210",
    number: 210,
    type: "small",
    capacity: 4,
    x: 255,
    y: 30,
    status: "normal",
  },
];

export default function SecondFloorMap({
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
            {MAP_OBJECTS.map((object) => {
              const image = FLOOR_OBJECTS[object.type];

              return (
                <View
                  key={object.id}
                  style={[
                    styles.mapObjectContainer,
                    {
                      left: object.x * scale,
                      top: object.y * scale,
                      width: object.width * scale,
                      height: object.height * scale,
                    },
                  ]}
                >
                  {image && (
                    <Image
                      source={image}
                      resizeMode="stretch"
                      style={styles.mapObjectImage}
                    />
                  )}

                  <View style={styles.smokingZoneLabelBox}>
                    <Text style={styles.smokingZoneText}>{object.label}</Text>
                  </View>
                </View>
              );
            })}

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

                  <View
                    style={[
                      styles.tableNumber,
                      isBooked && styles.tableNumberBooked,
                      isSelected && styles.tableNumberSelected,
                    ]}
                  >
                    <Text style={styles.tableNumberText}>{table.number}</Text>
                  </View>

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
