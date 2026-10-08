import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ======================================================
  // CONTAINER
  // ======================================================

  container: {
    flex: 1,
    backgroundColor: "#100D09",
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 150,
  },

  // ======================================================
  // HEADER
  // ======================================================

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,

    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,

    marginRight: 12,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178, 146, 89, 0.10)",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.25)",
  },

  backButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    color: "#B29259",

    fontSize: 9,
    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 3,
  },

  title: {
    color: "#EAE3C0",

    fontSize: 24,
    fontWeight: "900",

    letterSpacing: -0.5,
  },

  // ======================================================
  // BOOKING INFO
  // ======================================================

  bookingInfo: {
    marginHorizontal: 16,
    marginBottom: 14,

    minHeight: 68,

    paddingHorizontal: 12,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 16,

    backgroundColor: "#1B1711",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.20)",
  },

  infoItem: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    minWidth: 0,
  },

  infoLabel: {
    color: "rgba(234, 227, 192, 0.42)",

    fontSize: 8,
    fontWeight: "800",

    letterSpacing: 1.2,

    marginBottom: 4,
  },

  infoValue: {
    color: "#EAE3C0",

    fontSize: 12,
    fontWeight: "800",

    textAlign: "center",
  },

  infoDivider: {
    width: 1,
    height: 30,

    backgroundColor: "rgba(178, 146, 89, 0.18)",
  },

  guestsValue: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  // ======================================================
  // FLOOR SWITCH
  // ======================================================

  floorSwitch: {
    height: 48,

    marginHorizontal: 20,
    marginBottom: 8,

    padding: 4,

    flexDirection: "row",

    borderRadius: 14,

    backgroundColor: "#1B1711",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  floorButton: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },

  floorButtonActive: {
    backgroundColor: "#B29259",
  },

  floorButtonText: {
    color: "rgba(234, 227, 192, 0.45)",

    fontSize: 11,
    fontWeight: "900",

    letterSpacing: 0.6,
  },

  floorButtonTextActive: {
    color: "#211A10",
  },

  // ======================================================
  // LEGEND
  // ======================================================

  legend: {
    minHeight: 34,

    marginHorizontal: 20,
    marginBottom: 4,

    paddingHorizontal: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 9,
    height: 9,

    marginRight: 6,

    borderRadius: 5,

    borderWidth: 1,
  },

  legendFree: {
    backgroundColor: "#B29259",
    borderColor: "#D2B477",
  },

  legendBooked: {
    backgroundColor: "#FF5757",
    borderColor: "#D86662",
  },

  legendUnavailable: {
    backgroundColor: "#4B443A",
    borderColor: "#665D50",
  },

  legendText: {
    color: "rgba(234, 227, 192, 0.58)",

    fontSize: 8,
    fontWeight: "600",
  },

  // ======================================================
  // COUNTERS
  // ======================================================

  counters: {
    marginHorizontal: 20,
    marginBottom: 8,

    paddingHorizontal: 12,
    paddingVertical: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 10,

    backgroundColor: "rgba(178, 146, 89, 0.06)",
  },

  counterText: {
    color: "rgba(234, 227, 192, 0.50)",

    fontSize: 8,
    fontWeight: "700",
  },

  counterNumber: {
    color: "#B29259",

    fontSize: 9,
    fontWeight: "900",
  },

  // ======================================================
  // MAP
  // ======================================================

  mapContainer: {
    width: "100%",

    minHeight: 440,

    marginTop: 2,
  },

  // ======================================================
  // LOADING
  // ======================================================

  loadingContainer: {
    minHeight: 440,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 14,

    color: "rgba(234, 227, 192, 0.55)",

    fontSize: 12,
    fontWeight: "600",
  },

  // ======================================================
  // ERROR
  // ======================================================

  errorContainer: {
    minHeight: 440,

    paddingHorizontal: 30,

    alignItems: "center",
    justifyContent: "center",
  },

  errorIcon: {
    width: 58,
    height: 58,

    marginBottom: 16,

    borderRadius: 19,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178, 146, 89, 0.10)",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.25)",
  },

  errorTitle: {
    color: "#EAE3C0",

    fontSize: 17,
    fontWeight: "900",

    textAlign: "center",

    marginBottom: 8,
  },

  errorText: {
    maxWidth: 320,

    color: "rgba(234, 227, 192, 0.48)",

    fontSize: 11,
    fontWeight: "500",

    lineHeight: 17,

    textAlign: "center",
  },

  retryButton: {
    minHeight: 44,

    marginTop: 18,

    paddingHorizontal: 22,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    backgroundColor: "#B29259",
  },

  retryButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },

  retryText: {
    color: "#211A10",

    fontSize: 9,
    fontWeight: "900",

    letterSpacing: 1,
  },

  // ======================================================
  // SECOND FLOOR FALLBACK
  // ======================================================

  secondFloor: {
    minHeight: 440,

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

    backgroundColor: "rgba(178, 146, 89, 0.10)",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.28)",
  },

  secondFloorTitle: {
    color: "#EAE3C0",

    fontSize: 23,
    fontWeight: "900",

    marginBottom: 8,

    textAlign: "center",
  },

  secondFloorSubtitle: {
    color: "rgba(234, 227, 192, 0.45)",

    fontSize: 12,
    fontWeight: "500",

    lineHeight: 19,

    textAlign: "center",
  },

  // ======================================================
  // SELECTED TABLE CARD
  // ======================================================

  selectedCard: {
    marginHorizontal: 14,
    marginTop: 10,

    padding: 14,

    borderRadius: 18,

    backgroundColor: "#211A10",

    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.50)",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 7,
    },

    shadowOpacity: 0.3,
    shadowRadius: 14,

    elevation: 8,
  },

  selectedHeader: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 14,
  },

  selectedIcon: {
    width: 42,
    height: 42,

    marginRight: 10,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#B29259",
  },

  selectedHeaderText: {
    flex: 1,
  },

  selectedEyebrow: {
    color: "#B29259",

    fontSize: 8,
    fontWeight: "900",

    letterSpacing: 1.4,

    marginBottom: 2,
  },

  selectedTitle: {
    color: "#EAE3C0",

    fontSize: 17,
    fontWeight: "900",
  },

  selectedDetails: {
    flexDirection: "row",

    paddingTop: 12,
    marginBottom: 12,

    borderTopWidth: 1,
    borderTopColor: "rgba(178, 146, 89, 0.14)",
  },

  selectedDetail: {
    flex: 1,
  },

  selectedDetailLabel: {
    color: "rgba(234, 227, 192, 0.38)",

    fontSize: 7,
    fontWeight: "900",

    letterSpacing: 1,

    marginBottom: 4,
  },

  selectedDetailValue: {
    color: "#EAE3C0",

    fontSize: 12,
    fontWeight: "800",
  },

  // ======================================================
  // BOOK BUTTON
  // ======================================================

  bookButton: {
    minHeight: 46,

    paddingHorizontal: 16,

    marginTop: 2,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,

    borderRadius: 12,

    backgroundColor: "#D2B477",
  },

  bookButtonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },

  bookButtonText: {
    color: "#211A10",

    fontSize: 9,
    fontWeight: "900",

    letterSpacing: 0.9,
  },

  // ======================================================
  // BOTTOM
  // ======================================================

  bottomSpace: {
    height: 20,
  },

  // ======================================================
  // LEGACY / COMPATIBILITY
  // ======================================================

  bookingPanel: {
    marginHorizontal: 12,

    minHeight: 50,

    marginBottom: 10,
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
});
