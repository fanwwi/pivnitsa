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

  header: {
    height: 68,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  backButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: -5,
  },

  pressed: {
    opacity: 0.55,
  },

  headerTitle: {
    flex: 1,

    textAlign: "center",

    fontSize: 17,
    lineHeight: 22,

    fontWeight: "600",

    color: CREAM,
  },

  headerSpacer: {
    width: 42,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  },

  notification: {
    minHeight: 100,

    padding: 17,

    flexDirection: "row",
    alignItems: "flex-start",
  },

  notificationUnread: {
    backgroundColor: "rgba(178, 145, 89, 0.12)",
    borderRadius: 20,
  },

  notificationPressed: {
    opacity: 0.65,
  },

  icon: {
    width: 44,
    height: 44,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",
  },

  iconUnread: {
    backgroundColor: "rgba(178,146,89,0.12)",
  },

  notificationContent: {
    flex: 1,

    marginLeft: 14,

    paddingTop: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 5,
  },

  notificationTitle: {
    flex: 1,

    fontSize: 14,
    lineHeight: 19,

    fontWeight: "500",

    color: "#B7B1A5",
  },

  notificationTitleUnread: {
    color: CREAM,
    fontWeight: "600",
  },

  unreadDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginLeft: 8,

    backgroundColor: GOLD_LIGHT,
  },

  notificationText: {
    fontSize: 12,
    lineHeight: 18,

    color: "rgba(234,227,192,0.48)",

    paddingRight: 4,
  },

  notificationTime: {
    marginTop: 8,

    fontSize: 10,
    lineHeight: 14,

    color: "rgba(234,227,192,0.28)",
  },

  empty: {
    alignItems: "center",

    paddingHorizontal: 30,
    paddingTop: 110,
  },

  emptyIcon: {
    width: 64,
    height: 64,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.1)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.15)",

    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 18,
    lineHeight: 23,

    fontWeight: "600",

    color: CREAM,

    marginBottom: 8,
  },

  emptyText: {
    maxWidth: 300,

    fontSize: 12,
    lineHeight: 19,

    textAlign: "center",

    color: "rgba(234,227,192,0.4)",
  },
});
