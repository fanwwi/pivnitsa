import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0B08",
  },

  /* ============================= */
  /* BACKGROUND */
  /* ============================= */

  background: {
    position: "absolute",
    width: width,
    height: height,
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#1d1b1b7e",
  },

  sideOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  /* ============================= */
  /* GOLD GLOW */
  /* ============================= */

  glowWrapper: {
    position: "absolute",

    width: width * 0.95,
    height: width * 0.95,

    left: width * 0.025,
    top: height * 0.18,

    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    width: "100%",
    height: "100%",

    borderRadius: width,

    backgroundColor: "#B29259",

    opacity: 0.18,

    shadowColor: "#B29259",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 90,

    elevation: 30,
  },

  /* ============================= */
  /* TOP DECORATION */
  /* ============================= */

  topDecoration: {
    position: "absolute",

    top: 72,
    left: 45,
    right: 45,

    flexDirection: "row",
    alignItems: "center",

    gap: 14,
  },

  decorationLine: {
    flex: 1,
    height: 1,

    backgroundColor: "rgba(178, 146, 89, 0.55)",
  },

  decorationDiamond: {
    width: 7,
    height: 7,

    backgroundColor: "#B29259",

    transform: [
      {
        rotate: "45deg",
      },
    ],

    shadowColor: "#B29259",
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 5,
  },

  /* ============================= */
  /* LOGO */
  /* ============================= */

  logoWrapper: {
    position: "absolute",

    top: height * 0.32,

    left: 30,
    right: 30,

    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: width * 0.72,
    height: width * 0.38,
  },

  /* ============================= */
  /* BOTTOM */
  /* ============================= */

  bottom: {
    position: "absolute",

    left: 22,
    right: 22,
    bottom: 104,

    gap: 13,
  },

  /* ============================= */
  /* PRIMARY BUTTON */
  /* ============================= */

  primaryButton: {
    height: 62,

    borderRadius: 17,

    overflow: "hidden",

    shadowColor: "#B29259",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,

    elevation: 10,
  },

  primaryGradient: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  primaryGlow: {
    position: "absolute",

    width: width * 0.7,
    height: 100,

    borderRadius: 100,

    backgroundColor: "rgba(255,255,255,0.12)",

    top: -55,
    left: width * 0.15,
  },

  buttonContent: {
    width: "100%",

    paddingHorizontal: 24,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#211A10",

    fontSize: 15,
    fontWeight: "800",

    letterSpacing: 2.5,
  },

  arrow: {
    position: "absolute",

    right: 23,

    color: "#211A10",

    fontSize: 24,
    fontWeight: "300",

    marginTop: -2,
  },

  /* ============================= */
  /* SECONDARY BUTTON */
  /* ============================= */

  secondaryButton: {
    height: 58,

    borderRadius: 17,

    overflow: "hidden",

    borderWidth: 1,

    borderColor: "rgba(234, 227, 192, 0.32)",
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  secondaryGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  secondaryInner: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: "#EAE3C0",

    fontSize: 13,
    fontWeight: "700",

    letterSpacing: 2,
  },

  /* ============================= */
  /* PRESS */
  /* ============================= */

  buttonPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    opacity: 0.88,
  },

  skip: {
    color: "#ffff",
    textAlign: "center",
    margin: "auto"
  },
});
