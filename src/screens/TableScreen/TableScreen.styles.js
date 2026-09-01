import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ======================================================
  // CONTAINER
  // ======================================================

  container: {
    flex: 1,
    backgroundColor: "#100D09",
    paddingBottom: "40",
    paddingTop: "20",
  },

  // ======================================================
  // HEADER
  // ======================================================

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    color: "#B29259",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 2,
  },

  title: {
    color: "#EAE3C0",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  headerIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178, 146, 89, 0.12)",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.3)",
  },

  // ======================================================
  // FLOOR SWITCHER
  // ======================================================

  floorSwitcher: {
    marginHorizontal: 20,
    marginBottom: 8,

    height: 48,

    padding: 4,

    flexDirection: "row",

    borderRadius: 14,

    backgroundColor: "#1B1711",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  floorButton: {
    flex: 1,

    position: "relative",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },

  floorButtonActive: {
    backgroundColor: "#B29259",
  },

  floorButtonPressed: {
    opacity: 0.75,
  },

  floorButtonText: {
    color: "rgba(234, 227, 192, 0.45)",

    fontSize: 12,
    fontWeight: "800",

    letterSpacing: 0.4,
  },

  floorButtonTextActive: {
    color: "#211A10",
  },

  floorIndicator: {
    position: "absolute",

    bottom: 5,

    width: 18,
    height: 2,

    borderRadius: 2,

    backgroundColor: "#EAE3C0",
  },

  // ======================================================
  // MAP
  // ======================================================

  mapContainer: {
    flex: 1,
    width: "100%",
  },

  // ======================================================
  // SECOND FLOOR
  // ======================================================

  secondFloor: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  secondFloorIcon: {
    width: 74,
    height: 74,

    marginBottom: 18,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 24,

    backgroundColor: "rgba(178, 146, 89, 0.1)",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.28)",
  },

  secondFloorTitle: {
    color: "#EAE3C0",

    fontSize: 23,
    fontWeight: "900",

    marginBottom: 8,
  },

  secondFloorSubtitle: {
    color: "rgba(234, 227, 192, 0.45)",

    fontSize: 12,
    fontWeight: "500",

    lineHeight: 19,

    textAlign: "center",
  },

  // ======================================================
  // BOOKING PANEL
  // ======================================================

  bookingPanel: {
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,

    minHeight: 50,

    padding: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 16,

    backgroundColor: "#211A10",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.55)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 8,
  },

  bookingInfo: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    minWidth: 0,
  },

  bookingTableIcon: {
    width: 42,
    height: 42,

    marginRight: 10,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#B29259",
  },

  bookingText: {
    flex: 1,
  },

  bookingLabel: {
    color: "#B29259",

    fontSize: 8,
    fontWeight: "900",

    letterSpacing: 1.3,
  },

  bookingTitle: {
    color: "#EAE3C0",

    fontSize: 15,
    fontWeight: "900",
  },

  bookingMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  bookingType: {
    color: "rgba(234, 227, 192, 0.6)",

    fontSize: 8,
    fontWeight: "800",

    letterSpacing: 0.7,
  },

  bookingDot: {
    width: 3,
    height: 3,

    marginHorizontal: 6,

    borderRadius: 2,

    backgroundColor: "#B29259",
  },

  bookingCapacity: {
    color: "rgba(234, 227, 192, 0.6)",

    fontSize: 9,
    fontWeight: "600",

    marginLeft: 3,
  },

  // ======================================================
  // BOOK BUTTON
  // ======================================================

  bookButton: {
    minHeight: 46,

    paddingHorizontal: 14,

    marginLeft: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,

    borderRadius: 12,

    backgroundColor: "#D2B477",
  },

  bookButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  bookButtonText: {
    color: "#211A10",

    fontSize: 9,
    fontWeight: "900",

    letterSpacing: 0.8,
  },

  // ======================================================
  // LEGEND
  // ======================================================

  legend: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 116,

    height: 40,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#100D09",
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 10,
    height: 10,

    marginRight: 7,

    borderRadius: 5,

    borderWidth: 1,
  },

  // Красный — занят
  legendBooked: {
    backgroundColor: "#ff5757",
    borderColor: "#D86662",
  },

  // Коричневый — свободен
  legendAvailable: {
    backgroundColor: "#b19258",
    borderColor: "#B29259",
  },

  // Оранжевый — выбран
  legendSelected: {
    backgroundColor: "#ff7a00",
    borderColor: "#ff7a00",
  },

  legendText: {
    color: "rgba(234, 227, 192, 0.62)",

    fontSize: 10,
    fontWeight: "600",
  },
});
