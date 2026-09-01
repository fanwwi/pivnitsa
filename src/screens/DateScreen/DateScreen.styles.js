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

    paddingBottom: 85,
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
  | SELECTED DATE
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

    marginBottom: 24,
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
    fontSize: 17,
    lineHeight: 22,

    fontWeight: "500",

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
  | MONTH NAVIGATION
  |--------------------------------------------------------------------------
  */

  monthNavigation: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 14,

    paddingHorizontal: 2,
    marginTop: 20,
  },

  monthArrow: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.055)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  monthArrowDisabled: {
    backgroundColor: "rgba(255,255,255,0.025)",

    borderColor: "rgba(255,255,255,0.035)",
  },

  monthTitleWrapper: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 12,
  },

  monthTitle: {
    fontSize: 18,
    lineHeight: 23,

    fontWeight: "600",

    color: "#EEE7D2",

    textAlign: "center",
  },

  monthCounter: {
    marginTop: 3,
  },

  monthCounterText: {
    fontSize: 9,
    lineHeight: 12,

    letterSpacing: 1,

    color: "#77736B",
  },

  /*
  |--------------------------------------------------------------------------
  | CALENDAR
  |--------------------------------------------------------------------------
  */

  calendarWrapper: {
    width: "100%",

    overflow: "hidden",

    minHeight: 330,
  },

  calendar: {
    width: "100%",

    backgroundColor: "transparent",

    paddingTop: 0,
    paddingBottom: 0,
  },

  /*
  |--------------------------------------------------------------------------
  | CALENDAR INTERNAL OVERRIDES
  |--------------------------------------------------------------------------
  */

  /*
   * CalendarList сам рассчитывает 7 колонок.
   * Никаких width: 13.687% и ручных сеток здесь больше нет.
   */

  /*
  |--------------------------------------------------------------------------
  | MONTH DOTS
  |--------------------------------------------------------------------------
  */

  monthDots: {
    height: 24,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    marginTop: "-30",
    gap: 5,
  },

  monthDot: {
    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: "#403C37",
  },

  monthDotActive: {
    width: 17,

    backgroundColor: GOLD,
  },

  /*
  |--------------------------------------------------------------------------
  | LEGEND
  |--------------------------------------------------------------------------
  */

  legend: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 24,

    paddingVertical: 8,

    marginBottom: 30,
  },

  legendItem: {
    flexDirection: "row",

    alignItems: "center",
  },

  legendAvailable: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: GOLD,

    marginRight: 7,
  },

  legendUnavailable: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#4E4B46",

    marginRight: 7,
  },

  legendText: {
    fontSize: 10,

    lineHeight: 14,

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
