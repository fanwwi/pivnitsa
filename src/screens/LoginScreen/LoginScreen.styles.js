import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0B08",
  },

  background: {
    position: "absolute",
    width,
    height,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1d1b1ba9",
  },

  sideOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  keyboard: {
    flex: 1,
  },

  top: {
    position: "absolute",
    top: 65,
    left: 45,
    right: 45,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  decorationLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(178,146,89,0.5)",
  },

  diamond: {
    width: 7,
    height: 7,
    backgroundColor: "#B29259",
    transform: [{ rotate: "45deg" }],
    shadowColor: "#B29259",
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 40,
  },

  logo: {
    width: width * 0.58,
    height: width * 0.28,
    marginBottom: 35,
  },

  title: {
    color: "#EAE3C0",
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: 0.4,
    textAlign: "center",
    marginBottom: 9,
  },

  subtitle: {
    color: "rgba(234,227,192,0.62)",
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: "center",
  },

  phone: {
    color: "#B29259",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 7,
    letterSpacing: 1,
  },

  inputWrapper: {
    width: "100%",
    height: 62,
    marginTop: 28,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.45)",
    backgroundColor: "rgba(20,18,14,0.55)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  prefix: {
    color: "#B29259",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },

  phoneInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    color: "#EAE3C0",
    fontSize: 17,
    letterSpacing: 1.5,
  },

  primaryButton: {
    width: "100%",
    height: 60,
    marginTop: 15,
    borderRadius: 17,
    overflow: "hidden",
    shadowColor: "#B29259",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },

  primaryButtonDisabled: {
    opacity: 0.65,
  },

  primaryGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#EAE3C0",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2.2,
  },

  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.88,
  },

  /*
   * ACCOUNT NOT FOUND
   */

  accountError: {
    width: "100%",
    marginTop: 18,
    padding: 17,
    borderRadius: 16,

    backgroundColor: "rgba(170, 55, 45, 0.09)",

    borderWidth: 1,
    borderColor: "rgba(217, 154, 130, 0.24)",
  },

  accountErrorTitle: {
    color: "#E6B0A0",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.2,
  },

  accountErrorText: {
    marginTop: 7,

    color: "rgba(234,227,192,0.52)",

    fontSize: 11,
    lineHeight: 17,

    textAlign: "center",
  },

  registerButton: {
    height: 42,

    marginTop: 13,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.1)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.3)",
  },

  registerButtonText: {
    color: "#B29259",

    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 1.4,
  },

  /*
   * AUTH SWITCH
   */

  authSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 22,

    gap: 5,
  },

  authSwitchText: {
    color: "rgba(234,227,192,0.45)",

    fontSize: 12,
  },

  authSwitchLink: {
    color: "#B29259",

    fontSize: 12,
    fontWeight: "700",

    textDecorationLine: "underline",
  },

  /*
   * OTP
   */

  otpContainer: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpBox: {
    width: (width - 56 - 50) / 6,
    height: 58,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "rgba(234,227,192,0.2)",

    backgroundColor: "rgba(20,18,14,0.65)",

    alignItems: "center",
    justifyContent: "center",
  },

  otpBoxActive: {
    borderColor: "#B29259",

    shadowColor: "#B29259",
    shadowOpacity: 0.55,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 5,
  },

  otpBoxFilled: {
    borderColor: "rgba(178,146,89,0.7)",
  },

  otpText: {
    color: "#EAE3C0",
    fontSize: 22,
    fontWeight: "700",
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  hint: {
    color: "rgba(234,227,192,0.45)",
    fontSize: 12,
    marginTop: 16,
    letterSpacing: 0.2,
  },

  loader: {
    marginTop: 18,
  },

  resend: {
    color: "#B29259",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 24,
    letterSpacing: 0.3,
  },

  resendDisabled: {
    color: "rgba(234,227,192,0.35)",
  },

  changePhoneButton: {
    marginTop: 17,
    paddingVertical: 5,
  },

  changePhoneText: {
    color: "rgba(234,227,192,0.42)",
    fontSize: 11,
    fontWeight: "600",
  },

  /*
   * ERROR
   */

  error: {
    maxWidth: "90%",

    color: "#D99A82",

    fontSize: 12,

    textAlign: "center",

    lineHeight: 18,

    marginTop: 18,
  },

  /*
   * GLOW
   */

  glowWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -100,

    alignItems: "center",
  },

  glow: {
    width: width * 0.9,
    height: 180,

    borderRadius: 999,

    backgroundColor: "rgba(178,146,89,0.08)",

    shadowColor: "#B29259",
    shadowOpacity: 0.35,
    shadowRadius: 80,

    elevation: 10,
  },
});
