import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width - 40;

export default StyleSheet.create({
  /*
  |--------------------------------------------------------------------------
  | ROOT
  |--------------------------------------------------------------------------
  */

  container: {
    flex: 1,
    backgroundColor: "#090806",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },

  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#09080655",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 58,
    paddingHorizontal: 20,
  },

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  loadingScreen: {
    flex: 1,
    backgroundColor: "#090806",

    alignItems: "center",
    justifyContent: "center",
  },

  loadingLogo: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingLogoImage: {
    width: 170,
    height: 70,
  },

  loadingIndicator: {
    marginTop: 22,
  },

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",

    maxWidth: "78%",
  },

  avatarWrapper: {
    position: "relative",

    width: 48,
    height: 48,

    borderRadius: 24,

    borderWidth: 1,
    borderColor: "rgba(210,180,119,0.5)",

    padding: 2,

    backgroundColor: "rgba(255,255,255,0.04)",
  },

  avatar: {
    width: "100%",
    height: "100%",

    borderRadius: 22,
  },

  onlineDot: {
    position: "absolute",

    right: 0,
    bottom: 1,

    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#B29259",

    borderWidth: 2,
    borderColor: "#0D0B08",
  },

  userInfo: {
    marginLeft: 12,
  },

  welcome: {
    color: "rgba(234,227,192,0.42)",

    fontSize: 8,
    fontWeight: "800",

    letterSpacing: 1.7,

    marginBottom: 4,
  },

  userName: {
    color: "#EAE3C0",

    fontSize: 16,
    fontWeight: "700",

    letterSpacing: 0.1,

    maxWidth: width * 0.55,
  },

  notificationButton: {
    width: 46,
    height: 46,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",

    borderWidth: 1,
    borderColor: "rgba(234,227,192,0.1)",
  },

  notificationDot: {
    position: "absolute",

    top: 11,
    right: 11,

    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: "#B29259",

    borderWidth: 1,
    borderColor: "#17130D",
  },

  pressed: {
    opacity: 0.78,
  },

  notificationPressed: {
    transform: [
      {
        scale: 0.94,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | HERO
  |--------------------------------------------------------------------------
  */

  hero: {
    alignItems: "center",

    marginTop: 48,
    marginBottom: 42,
  },

  heroEyebrow: {
    width: "65%",

    flexDirection: "row",
    alignItems: "center",

    gap: 9,

    marginBottom: 18,
  },

  heroLine: {
    flex: 1,

    height: 1,

    backgroundColor: "rgba(178,146,89,0.4)",
  },

  heroEyebrowText: {
    color: "#B29259",

    fontSize: 9,
    fontWeight: "900",

    letterSpacing: 3.5,
  },

  heroTitle: {
    color: "#F0E9D0",

    fontSize: 31,
    fontWeight: "700",

    lineHeight: 36,

    letterSpacing: -0.6,

    textAlign: "center",
  },

  heroAccent: {
    color: "#B29259",
  },

  heroSubtitle: {
    color: "rgba(234,227,192,0.48)",

    fontSize: 12,

    marginTop: 12,

    letterSpacing: 0.2,

    textAlign: "center",
  },

  /*
  |--------------------------------------------------------------------------
  | SECTION HEADER
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | EVENT CARD
  |--------------------------------------------------------------------------
  */

  eventsWrapper: {
    marginHorizontal: -20,
  },

  eventsScroll: {
    paddingHorizontal: 20,
  },

  eventCard: {
    width: CARD_WIDTH,
    height: 280,

    marginRight: 20,

    overflow: "hidden",

    borderRadius: 24,

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

    padding: 20,

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

    fontSize: 25,
    fontWeight: "700",

    lineHeight: 29,

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

    marginTop: 12,
  },

  eventDateText: {
    color: "#D7D0B8",

    fontSize: 12,
    fontWeight: "600",
  },

  /*
  |--------------------------------------------------------------------------
  | CAROUSEL
  |--------------------------------------------------------------------------
  */

  carouselControls: {
    height: 60,

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

  /*
  |--------------------------------------------------------------------------
  | BOOKING
  |--------------------------------------------------------------------------
  */

  bookingSection: {
    marginTop: 32,

    padding: 20,

    borderRadius: 25,

    backgroundColor: "rgba(19,16,11,0.84)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.18)",

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15,
    },

    elevation: 8,
  },

  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  bookingIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.09)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  bookingHeaderText: {
    marginLeft: 12,
  },

  bookingEyebrow: {
    color: "#B29259",

    fontSize: 8,
    fontWeight: "900",

    letterSpacing: 2,

    marginBottom: 4,
  },

  bookingTitle: {
    color: "#EAE3C0",

    fontSize: 20,
    fontWeight: "700",

    letterSpacing: -0.2,
  },

  bookingDescription: {
    color: "rgba(234,227,192,0.44)",

    fontSize: 11,

    lineHeight: 17,

    marginTop: 13,
    marginBottom: 18,
  },

  bookingGrid: {
    gap: 9,
  },

  bookingOption: {
    minHeight: 62,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 13,

    borderRadius: 15,

    backgroundColor: "rgba(255,255,255,0.035)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  optionPressed: {
    backgroundColor: "rgba(178,146,89,0.07)",

    borderColor: "rgba(178,146,89,0.2)",
  },

  optionIcon: {
    width: 35,
    height: 35,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.08)",
  },

  optionContent: {
    flex: 1,

    marginLeft: 11,
  },

  optionLabel: {
    color: "rgba(234,227,192,0.35)",

    fontSize: 7,
    fontWeight: "900",

    letterSpacing: 1.6,

    marginBottom: 4,
  },

  optionValue: {
    color: "#EAE3C0",

    fontSize: 13,
    fontWeight: "600",
  },

  /*
  |--------------------------------------------------------------------------
  | BOOK BUTTON
  |--------------------------------------------------------------------------
  */

  bookButton: {
    height: 57,

    marginTop: 14,

    borderRadius: 16,

    overflow: "hidden",

    shadowColor: "#B29259",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 7,
  },

  bookButtonPressed: {
    transform: [
      {
        scale: 0.975,
      },
    ],

    opacity: 0.9,
  },

  bookGradient: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  bookText: {
    color: "#211A10",

    fontSize: 12,
    fontWeight: "900",

    letterSpacing: 1.8,
  },

  bottomSpace: {
    height: 45,
  },

  /*
  |--------------------------------------------------------------------------
  | PICKER MODAL
  |--------------------------------------------------------------------------
  */

  modalOverlay: {
    flex: 1,

    justifyContent: "flex-end",
  },

  modalBackdrop: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(0,0,0,0.7)",
  },

  pickerModal: {
    maxHeight: height * 0.7,

    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    backgroundColor: "#15120D",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  modalHandle: {
    alignSelf: "center",

    width: 40,
    height: 4,

    borderRadius: 2,

    backgroundColor: "rgba(234,227,192,0.18)",

    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 15,
  },

  modalTitle: {
    color: "#EAE3C0",

    fontSize: 20,
    fontWeight: "700",
  },

  modalClose: {
    width: 36,
    height: 36,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.05)",
  },

  optionsList: {
    gap: 8,

    paddingBottom: 10,
  },

  modalOption: {
    minHeight: 53,

    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 16,

    borderRadius: 14,

    backgroundColor: "rgba(255,255,255,0.035)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  modalOptionSelected: {
    backgroundColor: "rgba(178,146,89,0.1)",

    borderColor: "rgba(178,146,89,0.3)",
  },

  modalOptionText: {
    color: "rgba(234,227,192,0.65)",

    fontSize: 13,
    fontWeight: "600",
  },

  modalOptionTextSelected: {
    color: "#EAE3C0",
  },

  selectedMark: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#B29259",

    shadowColor: "#B29259",
    shadowOpacity: 0.8,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
