import { StyleSheet } from "react-native";

const GOLD = "#B29259";
const GOLD_LIGHT = "#D2B477";

const TEXT = "#EAE3C0";
const TEXT_PRIMARY = "#F1EBD6";
const TEXT_SECONDARY = "#A9A49C";
const TEXT_MUTED = "#77736B";

const CARD = "rgba(255,255,255,0.055)";

export default StyleSheet.create({
  /*
  |--------------------------------------------------------------------------
  | CONTAINER
  |--------------------------------------------------------------------------
  */

  container: {
    flex: 1,
    backgroundColor: "#080706",
    paddingTop: 30,
    paddingBottom: 40
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    flex: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

  header: {
    height: 76,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.055)",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.055)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  headerTitleWrapper: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 12,
  },

  headerEyebrow: {
    fontSize: 9,
    lineHeight: 12,

    letterSpacing: 2.4,
    fontWeight: "600",

    color: GOLD,

    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 22,

    fontWeight: "600",

    color: TEXT,
  },

  headerSpacer: {
    width: 42,
  },

  /*
  |--------------------------------------------------------------------------
  | CONTENT
  |--------------------------------------------------------------------------
  */

  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 145,
  },

  /*
  |--------------------------------------------------------------------------
  | INTRO
  |--------------------------------------------------------------------------
  */

  intro: {
    marginBottom: 24,
  },

  introTitle: {
    fontSize: 24,
    lineHeight: 30,

    fontWeight: "600",

    color: TEXT_PRIMARY,

    marginBottom: 7,
  },

  introText: {
    fontSize: 13,
    lineHeight: 20,

    color: TEXT_SECONDARY,

    maxWidth: 340,
  },

  /*
  |--------------------------------------------------------------------------
  | MAIN GUEST CARD
  |--------------------------------------------------------------------------
  */

  guestCard: {
    padding: 20,

    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.045)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.20)",
  },

  /*
  |--------------------------------------------------------------------------
  | CARD TOP
  |--------------------------------------------------------------------------
  */

  guestCardTop: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 28,
  },

  guestIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.10)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.18)",
  },

  guestCardTopText: {
    marginLeft: 12,
  },

  guestCardLabel: {
    fontSize: 9,
    lineHeight: 12,

    letterSpacing: 1.8,

    fontWeight: "600",

    color: GOLD,

    marginBottom: 4,
  },

  guestCardHint: {
    fontSize: 12,
    lineHeight: 17,

    color: TEXT_MUTED,
  },

  /*
  |--------------------------------------------------------------------------
  | COUNTER
  |--------------------------------------------------------------------------
  */

  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 4,
  },

  counterButton: {
    width: 54,
    height: 54,

    borderRadius: 27,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.055)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  counterButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.025)",

    borderColor: "rgba(255,255,255,0.035)",
  },

  counterButtonPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.7,
  },

  counterCenter: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 15,
  },

  counterNumber: {
    fontSize: 58,
    lineHeight: 64,

    fontWeight: "300",

    color: "#F1EBD6",

    letterSpacing: -2,
  },

  counterLabel: {
    fontSize: 11,
    lineHeight: 15,

    color: GOLD,

    letterSpacing: 0.6,

    marginTop: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | RANGE
  |--------------------------------------------------------------------------
  */

  range: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 26,

    gap: 4,
  },

  rangeItem: {
    flex: 1,

    height: 4,

    borderRadius: 2,

    backgroundColor: "#302D29",
  },

  rangeItemActive: {
    backgroundColor: GOLD,
  },

  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 7,
  },

  rangeLabel: {
    fontSize: 9,
    lineHeight: 12,

    color: "#5F5B54",
  },

  /*
  |--------------------------------------------------------------------------
  | QUICK SELECT
  |--------------------------------------------------------------------------
  */

  quickSection: {
    marginTop: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",

    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 14,
    lineHeight: 19,

    fontWeight: "600",

    color: "#E8E1CD",
  },

  sectionHint: {
    fontSize: 10,
    lineHeight: 14,

    color: TEXT_MUTED,
  },

  presets: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 9,
  },

  preset: {
    width: "22.8%",
    minHeight: 52,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.065)",

    position: "relative",
  },

  presetActive: {
    backgroundColor: "rgba(178,146,89,0.14)",

    borderColor: "rgba(210,180,119,0.55)",
  },

  presetPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },

  presetNumber: {
    fontSize: 16,
    lineHeight: 20,

    fontWeight: "500",

    color: "#C7C1B4",
  },

  presetNumberActive: {
    color: GOLD_LIGHT,

    fontWeight: "700",
  },

  presetCheck: {
    position: "absolute",

    top: 5,
    right: 5,

    width: 15,
    height: 15,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: GOLD_LIGHT,
  },

  /*
  |--------------------------------------------------------------------------
  | INFO
  |--------------------------------------------------------------------------
  */

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    marginTop: 24,

    padding: 14,

    borderRadius: 15,

    backgroundColor: "rgba(255,255,255,0.025)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.045)",
  },

  infoIcon: {
    width: 30,
    height: 30,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.08)",

    marginRight: 10,
  },

  infoText: {
    flex: 1,

    fontSize: 11,
    lineHeight: 17,

    color: "#77736B",
  },

  /*
  |--------------------------------------------------------------------------
  | BOTTOM
  |--------------------------------------------------------------------------
  */

  bottom: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,

    backgroundColor: "rgba(8,7,6,0.97)",

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  /*
  |--------------------------------------------------------------------------
  | CONFIRM
  |--------------------------------------------------------------------------
  */

  confirmButton: {
    width: "100%",
    height: 56,

    borderRadius: 16,

    overflow: "hidden",

    shadowColor: "#B29259",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 14,

    elevation: 5,
  },

  confirmPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.88,
  },

  confirmGradient: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },

  confirmText: {
    fontSize: 11,
    lineHeight: 16,

    letterSpacing: 1.25,

    fontWeight: "700",

    color: "#211A10",
  },
});
