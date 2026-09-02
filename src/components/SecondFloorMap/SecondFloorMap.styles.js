import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    position: "relative",
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

  mapObjectContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  mapObjectImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
});
