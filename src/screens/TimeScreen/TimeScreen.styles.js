import { StyleSheet } from "react-native";

const GOLD = "#B29259";
const GOLD_LIGHT = "#D2B477";

const TEXT = "#EAE3C0";
const TEXT_PRIMARY = "#F1EBD6";
const TEXT_SECONDARY = "#A9A49C";

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
    paddingBottom: 40,
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
    marginBottom: 20,
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
  | SELECTED TIME
  |--------------------------------------------------------------------------
  */

  selectedPreview: {
    minHeight: 76,

    paddingHorizontal: 17,
    paddingVertical: 14,

    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: CARD,

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.24)",

    marginBottom: 30,
  },

  selectedPreviewContent: {
    flex: 1,
  },

  selectedLabel: {
    fontSize: 9,
    lineHeight: 12,

    letterSpacing: 1.8,

    fontWeight: "600",

    color: GOLD,

    marginBottom: 5,
  },

  selectedValue: {
    fontSize: 20,
    lineHeight: 25,

    fontWeight: "600",

    color: "#F0E8D0",
  },

  selectedIcon: {
    width: 34,
    height: 34,

    borderRadius: 17,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: GOLD_LIGHT,

    marginLeft: 12,
  },

  /*
  |--------------------------------------------------------------------------
  | TIME SECTION
  |--------------------------------------------------------------------------
  */

  timeSection: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 14,
  },

  sectionTitle: {
    marginLeft: 8,

    fontSize: 9,
    lineHeight: 13,

    letterSpacing: 1.7,

    fontWeight: "600",

    color: "#77736B",
  },

  /*
  |--------------------------------------------------------------------------
  | TIME GRID
  |--------------------------------------------------------------------------
  */

  timeGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    rowGap: 10,
  },

  /*
  |--------------------------------------------------------------------------
  | TIME BUTTON
  |--------------------------------------------------------------------------
  */

  timeButton: {
    width: "31.5%",

    minHeight: 58,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: CARD,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.075)",

    position: "relative",
  },

  timeButtonSelected: {
    backgroundColor: GOLD_LIGHT,

    borderColor: GOLD_LIGHT,

    shadowColor: GOLD,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 8,

    elevation: 4,
  },

  timeButtonPressed: {
    transform: [{ scale: 0.96 }],

    opacity: 0.8,
  },

  timeText: {
    fontSize: 16,
    lineHeight: 21,

    fontWeight: "500",

    color: "#E6DFCB",
  },

  timeTextSelected: {
    color: "#211A10",

    fontWeight: "700",
  },

  /*
  |--------------------------------------------------------------------------
  | TIME CHECK
  |--------------------------------------------------------------------------
  */

  timeCheck: {
    position: "absolute",

    top: 6,
    right: 7,

    width: 17,
    height: 17,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.35)",
  },

  /*
  |--------------------------------------------------------------------------
  | INFO
  |--------------------------------------------------------------------------
  */

  infoCard: {
    minHeight: 48,

    paddingHorizontal: 14,

    borderRadius: 13,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.035)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  infoDot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: GOLD,

    marginRight: 9,
  },

  infoText: {
    flex: 1,

    fontSize: 11,
    lineHeight: 16,

    color: "#817C74",
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
    paddingBottom: 20,

    backgroundColor: "rgba(8,7,6,0.97)",

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  /*
  |--------------------------------------------------------------------------
  | CONFIRM BUTTON
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

  confirmButtonDisabled: {
    shadowOpacity: 0,

    elevation: 0,
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
    fontSize: 12,
    lineHeight: 16,

    letterSpacing: 1.5,

    fontWeight: "700",

    color: "#211A10",
  },

  confirmTextDisabled: {
    color: "#77736C",
  },
});
