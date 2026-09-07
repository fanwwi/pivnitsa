import { StyleSheet } from "react-native";

const GOLD = "#B29259";
const GOLD_LIGHT = "#D2B477";
const CREAM = "#EAE3C0";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080706",
    paddingTop: 30, 
  },

  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 45,
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  pressed: {
    opacity: 0.55,
    transform: [{ scale: 0.96 }],
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  headerLabel: {
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 2.4,
    fontWeight: "700",
    color: GOLD_LIGHT,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "600",
    color: CREAM,
  },

  bellContainer: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.13)",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.22)",

    position: "relative",
  },

  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,

    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: "#D2B477",
  },

  hero: {
    marginTop: 30,
    minHeight: 138,

    borderRadius: 22,

    padding: 20,

    flexDirection: "row",
    alignItems: "center",

    overflow: "hidden",

    backgroundColor: "#15110D",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.24)",
  },

  heroGlow: {
    position: "absolute",

    width: 170,
    height: 170,
    borderRadius: 85,

    right: -70,
    top: -65,

    backgroundColor: "rgba(178,146,89,0.12)",
  },

  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.16)",

    borderWidth: 1,
    borderColor: "rgba(210,180,119,0.22)",
  },

  heroText: {
    flex: 1,
    marginLeft: 16,
  },

  heroTitle: {
    fontSize: 18,
    lineHeight: 23,

    fontWeight: "600",

    color: CREAM,

    marginBottom: 6,
  },

  heroDescription: {
    fontSize: 12,
    lineHeight: 18,

    color: "rgba(234,227,192,0.55)",
  },

  sectionTitle: {
    marginTop: 32,
    marginBottom: 12,

    fontSize: 9,
    lineHeight: 13,

    letterSpacing: 2,

    fontWeight: "700",

    color: GOLD_LIGHT,
  },

  settings: {
    borderRadius: 20,

    paddingHorizontal: 16,

    backgroundColor: "#12100D",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.075)",
  },

  row: {
    minHeight: 91,

    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    height: 1,

    marginLeft: 62,

    backgroundColor: "rgba(255,255,255,0.065)",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",
  },

  iconContainerActive: {
    backgroundColor: "rgba(178,146,89,0.13)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.17)",
  },

  rowText: {
    flex: 1,

    marginLeft: 14,
    marginRight: 12,
  },

  rowTitle: {
    fontSize: 15,
    lineHeight: 20,

    fontWeight: "600",

    color: CREAM,

    marginBottom: 4,
  },

  rowDescription: {
    fontSize: 11,
    lineHeight: 16,

    color: "rgba(234,227,192,0.42)",
  },

  footerText: {
    marginTop: 18,

    fontSize: 11,
    lineHeight: 17,

    textAlign: "center",

    color: "rgba(234,227,192,0.28)",
  },
});
