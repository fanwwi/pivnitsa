import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0907",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0a09076b",
  },

  sideOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  keyboard: {
    flex: 1,
  },

  top: {
    position: "absolute",
    top: Platform?.OS === "ios" ? 72 : 52,
    left: 32,
    right: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  decorationLine: {
    height: 1,
    flex: 1,
    maxWidth: 90,
    backgroundColor: "rgba(210, 180, 119, 0.45)",
  },

  diamond: {
    width: 7,
    height: 7,
    backgroundColor: "#D2B477",
    transform: [{ rotate: "45deg" }],
    shadowColor: "#D2B477",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 40,
  },

  logo: {
    width: 180,
    height: 90,
    marginBottom: 34,
  },

  title: {
    color: "#F5F0DF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: 9,
  },

  subtitle: {
    color: "rgba(234, 227, 192, 0.62)",
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 0.2,
    marginBottom: 24,
  },

  /*
   * PHONE
   */

  inputWrapper: {
    width: "100%",
    maxWidth: 360,
    height: 62,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: "rgba(210, 180, 119, 0.30)",
    borderRadius: 16,

    backgroundColor: "rgba(20, 18, 14, 0.72)",
  },

  prefix: {
    color: "#D2B477",
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },

  phoneInput: {
    flex: 1,

    height: "100%",

    color: "#F5F0DF",
    fontSize: 18,
    letterSpacing: 1.2,
  },

  /*
   * PRIMARY BUTTON
   */

  primaryButton: {
    width: "100%",
    maxWidth: 360,
    height: 60,

    marginTop: 16,

    borderRadius: 16,
    overflow: "hidden",

    shadowColor: "#D2B477",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 5,
  },

  primaryGradient: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,
  },

  primaryText: {
    color: "#211A10",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.985 }],
  },

  /*
   * OTP
   */

  phone: {
    color: "#D2B477",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: -10,
    marginBottom: 25,
  },

  otpContainer: {
    width: "100%",
    maxWidth: 370,

    flexDirection: "row",
    justifyContent: "space-between",

    position: "relative",
  },

  otpBox: {
    width: (width - 56 - 50) / 6,
    maxWidth: 52,
    minWidth: 42,

    height: 58,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "rgba(234, 227, 192, 0.18)",

    backgroundColor: "rgba(20, 18, 14, 0.68)",
  },

  otpBoxActive: {
    borderColor: "#D2B477",

    backgroundColor: "rgba(210, 180, 119, 0.08)",

    shadowColor: "#D2B477",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 3,
  },

  otpBoxFilled: {
    borderColor: "rgba(210, 180, 119, 0.55)",
    backgroundColor: "rgba(210, 180, 119, 0.10)",
  },

  otpText: {
    color: "#F5F0DF",
    fontSize: 23,
    fontWeight: "600",
  },

  hiddenInput: {
    position: "absolute",

    width: 1,
    height: 1,

    opacity: 0,
  },

  hint: {
    marginTop: 18,

    color: "rgba(234, 227, 192, 0.42)",

    fontSize: 13,
    textAlign: "center",
  },

  loader: {
    marginTop: 18,
  },

  resend: {
    marginTop: 22,

    color: "#D2B477",

    fontSize: 13,
    fontWeight: "600",

    letterSpacing: 0.2,

    textDecorationLine: "underline",
  },

  resendDisabled: {
    color: "rgba(234, 227, 192, 0.32)",
    textDecorationLine: "none",
  },

  /*
   * ERROR
   */

  error: {
    width: "100%",
    maxWidth: 360,

    marginTop: 18,

    paddingHorizontal: 14,

    color: "#E5A5A5",

    fontSize: 13,
    lineHeight: 19,

    textAlign: "center",
  },
});
