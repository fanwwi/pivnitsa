import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  sidebar: {
    width: "86%",
    maxWidth: 390,
    height: "100%",
    backgroundColor: "#0C0A07",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(178,146,89,0.16)",
    paddingTop: 54,
    paddingBottom: 28,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178,146,89,0.10)",
  },

  eyebrow: {
    marginBottom: 5,
    color: "#B29259",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#EAE3C0",
    fontSize: 24,
    fontWeight: "700",
  },

  closeButton: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  pressed: {
    opacity: 0.6,
  },

  menu: {
    paddingTop: 22,
    paddingHorizontal: 14,
  },

  menuItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 17,
    backgroundColor: "#12100C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.09)",
  },

  menuItemPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.985 }],
  },

  iconWrapper: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "rgba(178,146,89,0.09)",
  },

  logoutIconWrapper: {
    backgroundColor: "rgba(201,133,119,0.08)",
  },

  deleteIconWrapper: {
    backgroundColor: "rgba(184,107,93,0.08)",
  },

  menuContent: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    color: "#EAE3C0",
    fontSize: 14,
    fontWeight: "700",
  },

  menuDescription: {
    marginTop: 4,
    color: "rgba(234,227,192,0.38)",
    fontSize: 11,
    lineHeight: 16,
  },

  logoutTitle: {
    color: "#C98577",
  },

  deleteItem: {
    marginTop: 8,
    backgroundColor: "rgba(184,107,93,0.045)",
    borderColor: "rgba(184,107,93,0.12)",
  },

  deleteTitle: {
    color: "#B86B5D",
  },

  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 4,
  },

  footerBrand: {
    color: "rgba(178,146,89,0.55)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 3,
  },

  footerVersion: {
    marginTop: 5,
    color: "rgba(234,227,192,0.20)",
    fontSize: 9,
  },
});
