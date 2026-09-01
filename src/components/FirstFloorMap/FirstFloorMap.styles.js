import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    position: "relative",
  },

  horizontalScroll: {
    flexGrow: 1,
  },

  verticalScroll: {
    paddingTop: 10,
    paddingBottom: 100,
  },

  map: {
    position: "relative",
    backgroundColor: "#17130E",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.28)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },

  mapObject: {
    position: "absolute",
  },

  // Метки входов и лестниц как на фото
  labelBadge: {
    position: "absolute",
    height: 34,
    backgroundColor: "#EAE3C0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },

  labelText: {
    color: "#17130E",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  labelBadgeSmall: {
    position: "absolute",
    height: 28,
    backgroundColor: "rgba(234, 227, 192, 0.15)",
    borderWidth: 1,
    borderColor: "#EAE3C0",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  labelTextSmall: {
    color: "#EAE3C0",
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center",
  },

  table: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  tablePressed: {
    opacity: 0.72,
    transform: [{ scale: 0.94 }],
  },

  tableImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  tableNumber: {
    position: "absolute",
    top: -7,
    minWidth: 19,
    height: 19,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#B29259",
    borderWidth: 1,
    borderColor: "#EAE3C0",
    zIndex: 6,
  },

  tableNumberBooked: {
    borderColor: "#686868",
  },

  tableNumberSelected: {
    backgroundColor: "#EAE3C0",
    borderColor: "#FFFFFF",
  },

  tableNumberText: {
    color: "#211A10",
    fontSize: 8,
    fontWeight: "900",
  },

  capacity: {
    position: "absolute",
    bottom: -8,
    minWidth: 27,
    height: 16,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    borderRadius: 8,
    backgroundColor: "rgba(25, 20, 13, 0.96)",
    borderWidth: 1,
    borderColor: "rgba(234, 227, 192, 0.38)",
    zIndex: 6,
  },

  capacityBooked: {
    backgroundColor: "rgba(42, 42, 42, 0.97)",
    borderColor: "rgba(255,255,255,0.12)",
  },

  capacitySelected: {
    backgroundColor: "#EAE3C0",
    borderColor: "#FFFFFF",
  },

  capacityText: {
    color: "#EAE3C0",
    fontSize: 8,
    fontWeight: "800",
  },

  capacityTextSelected: {
    color: "#211A10",
  },

  bookedDot: {
    position: "absolute",
    right: -4,
    top: -4,
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#454545",
    borderWidth: 1,
    borderColor: "#777777",
    zIndex: 7,
  },

  selectedInfo: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 14,
    minHeight: 68,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(29, 23, 15, 0.97)",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.65)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 100,
  },

  selectedInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  selectedIcon: {
    width: 38,
    height: 38,
    marginRight: 10,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(178, 146, 89, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.35)",
  },

  selectedLabel: {
    color: "#B29259",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 2,
  },

  selectedTitle: {
    color: "#EAE3C0",
    fontSize: 15,
    fontWeight: "900",
  },

  selectedMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  selectedType: {
    color: "rgba(234, 227, 192, 0.65)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  metaDot: {
    width: 3,
    height: 3,
    marginHorizontal: 6,
    borderRadius: 2,
    backgroundColor: "#B29259",
  },

  selectedSubtitle: {
    color: "rgba(234, 227, 192, 0.65)",
    fontSize: 9,
    fontWeight: "600",
    marginLeft: 3,
  },

  clearButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(234, 227, 192, 0.07)",
    borderWidth: 1,
    borderColor: "rgba(234, 227, 192, 0.2)",
  },
});
