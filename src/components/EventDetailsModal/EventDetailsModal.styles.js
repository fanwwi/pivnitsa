import { StyleSheet } from "react-native";

const GOLD = "#B29259";
const GOLD_LIGHT = "#D2B477";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  modal: {
    height: "92%",
    backgroundColor: "#0B0907",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },

  header: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.055)",
  },

  headerTitle: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 2,
    fontWeight: "600",
    color: GOLD,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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

  content: {
    paddingBottom: 30,
  },

  imageWrapper: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#17130F",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  imageBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(10,8,6,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  imageBadgeText: {
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#EAE3C0",
  },

  info: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  title: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "600",
    color: "#F1EBD6",
    marginBottom: 18,
  },

  meta: {
    gap: 12,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#D7D0BC",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginVertical: 24,
  },

  descriptionTitle: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.8,
    fontWeight: "600",
    color: GOLD,
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    lineHeight: 23,
    color: "#A9A49C",
  },

  bottom: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "rgba(8,7,6,0.98)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  shareButton: {
    height: 54,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: GOLD_LIGHT,
    marginBottom: 20,
  },

  shareButtonDisabled: {
    opacity: 0.4,
  },

  sharePressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  shareText: {
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#211A10",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 14,
    fontSize: 13,
    color: "#A9A49C",
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  errorTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#F1EBD6",
    textAlign: "center",
  },

  errorText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#A9A49C",
    textAlign: "center",
  },

  errorButton: {
    marginTop: 24,
    height: 46,
    paddingHorizontal: 24,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD_LIGHT,
  },

  errorButtonText: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#211A10",
  },
});
