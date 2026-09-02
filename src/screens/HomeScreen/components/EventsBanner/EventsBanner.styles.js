import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 40;

export default StyleSheet.create({
  eventsSection: {
    width: "100%",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    marginBottom: 16,
  },

  sectionLabel: {
    color: "#B29259",

    fontSize: 8,
    fontWeight: "900",

    letterSpacing: 2.4,

    marginBottom: 5,
  },

  sectionTitle: {
    color: "#EAE3C0",

    fontSize: 21,
    fontWeight: "700",

    letterSpacing: -0.3,
  },

  allEventsButton: {
    flexDirection: "row",
    alignItems: "center",

    gap: 2,

    paddingBottom: 2,
  },

  allEventsText: {
    color: "#B29259",

    fontSize: 12,
    fontWeight: "700",
  },

  eventsWrapper: {
    marginHorizontal: -20,
  },

  eventsScroll: {
    paddingHorizontal: 20,
  },

  eventCard: {
    width: CARD_WIDTH,
    height: 205,

    marginRight: 12,

    overflow: "hidden",

    borderRadius: 22,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    backgroundColor: "#15120D",
  },

  eventPressed: {
    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  eventImage: {
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  eventOverlay: {
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  eventContent: {
    flex: 1,

    padding: 18,

    justifyContent: "space-between",
  },

  eventTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eventBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: "rgba(10,8,5,0.52)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.35)",
  },

  eventBadgeText: {
    color: "#D2B477",

    fontSize: 8,
    fontWeight: "900",

    letterSpacing: 1.6,
  },

  eventTime: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: "rgba(10,8,5,0.5)",
  },

  eventTimeText: {
    color: "#EAE3C0",

    fontSize: 10,
    fontWeight: "700",
  },

  eventTitle: {
    color: "#FFFFFF",

    fontSize: 24,
    fontWeight: "700",

    lineHeight: 28,

    letterSpacing: -0.4,

    maxWidth: "90%",

    textShadowColor: "rgba(0,0,0,0.55)",

    textShadowOffset: {
      width: 0,
      height: 2,
    },

    textShadowRadius: 8,
  },

  eventDate: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    marginTop: 10,
  },

  eventDateText: {
    color: "#D7D0B8",

    fontSize: 12,
    fontWeight: "600",
  },

  carouselControls: {
    height: 54,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 18,
  },

  arrowButton: {
    width: 36,
    height: 36,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",

    borderWidth: 1,
    borderColor: "rgba(234,227,192,0.1)",
  },

  arrowDisabled: {
    opacity: 0.25,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,
  },

  dot: {
    width: 5,
    height: 5,

    borderRadius: 3,

    backgroundColor: "rgba(234,227,192,0.22)",
  },

  dotActive: {
    width: 21,

    backgroundColor: "#B29259",
  },
});
