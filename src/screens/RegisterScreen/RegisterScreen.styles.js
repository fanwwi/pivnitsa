import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  /*
   * =========================
   * BASE
   * =========================
   */

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
    backgroundColor: "#0d0b08b3",
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

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 95,
    paddingBottom: 40,
  },

  /*
   * =========================
   * TOP DECORATION
   * =========================
   */

  top: {
    position: "absolute",
    top: 65,
    left: 45,
    right: 45,

    flexDirection: "row",
    alignItems: "center",

    gap: 14,

    zIndex: 10,
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

  /*
   * =========================
   * CONTENT
   * =========================
   */

  content: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: width * 0.58,
    height: width * 0.28,

    marginBottom: 35,
  },

  /*
   * =========================
   * PHONE
   * =========================
   */

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

  /*
   * =========================
   * PRIMARY BUTTON
   * =========================
   */

  primaryButton: {
    width: 320,
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

  profileButton: {
    marginTop: 22,
  },

  buttonDisabled: {
    opacity: 0.55,
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

    textAlign: "center",
  },

  buttonPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    opacity: 0.88,
  },

  /*
   * =========================
   * LOGIN
   * =========================
   */

  loginButton: {
    marginTop: 22,

    paddingVertical: 5,
  },

  loginText: {
    color: "rgba(234,227,192,0.45)",

    fontSize: 12,

    textAlign: "center",
  },

  loginAccent: {
    color: "#B29259",

    fontWeight: "700",

    textDecorationLine: "underline",
  },

  registeredButton: {
    width: "100%",
    height: 46,

    marginTop: 13,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(178,146,89,0.10)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.30)",
  },

  registeredButtonText: {
    color: "#B29259",

    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 1.4,
  },

  /*
   * =========================
   * OTP
   * =========================
   */

  otpContent: {
    width: "100%",

    alignItems: "center",
  },

  otpTitle: {
    color: "#EAE3C0",

    fontSize: 27,
    fontWeight: "700",

    letterSpacing: 0.4,

    textAlign: "center",
  },

  phone: {
    color: "#B29259",

    fontSize: 15,
    fontWeight: "600",

    marginTop: 7,

    letterSpacing: 1,
  },

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

    borderColor: "rgba(234,227,192,0.20)",

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
    borderColor: "rgba(178,146,89,0.70)",
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

    textAlign: "center",
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

    textAlign: "center",
  },

  resendDisabled: {
    color: "rgba(234,227,192,0.35)",
  },

  changePhone: {
    color: "rgba(234,227,192,0.42)",

    fontSize: 11,
    fontWeight: "600",

    marginTop: 17,

    textAlign: "center",
  },

  /*
   * =========================
   * PROFILE
   * =========================
   */

  profileWrapper: {
    width: "100%",

    alignItems: "center",
  },

  profileContent: {
    width: "100%",

    alignItems: "center",
  },

  profileTitle: {
    color: "#EAE3C0",

    fontSize: 27,
    fontWeight: "700",

    letterSpacing: 0.4,

    textAlign: "center",

    marginBottom: 9,
  },

  profileSubtitle: {
    color: "rgba(234,227,192,0.62)",

    fontSize: 14,
    lineHeight: 20,

    letterSpacing: 0.2,

    textAlign: "center",

    marginBottom: 25,
  },

 

  profileInput: {
    width: 320,
    height: 58,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.45)",
    backgroundColor: "rgba(20,18,14,0.55)",
    paddingHorizontal: 19,
    color: "#EAE3C0",
    fontSize: 16,
  },

  /*
   * =========================
   * LEGAL
   * =========================
   */

  legalSection: {
    width: "100%",

    marginTop: 4,
  },

  legalItem: {
    width: "100%",

    flexDirection: "row",
    alignItems: "flex-start",

    marginTop: 11,
  },

  checkboxRow: {
    width: 23,
    height: 23,

    marginRight: 9,

    alignItems: "center",
    justifyContent: "center",
  },

  checkbox: {
    width: 21,
    height: 21,

    borderRadius: 6,

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.55)",

    backgroundColor: "rgba(20,18,14,0.70)",

    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: "#B29259",

    borderColor: "#B29259",
  },

  checkboxMark: {
    color: "#211A10",

    fontSize: 15,
    fontWeight: "900",

    lineHeight: 18,
  },

  legalTextWrapper: {
    flex: 1,

    paddingTop: 1,
  },

  legalText: {
    color: "rgba(234,227,192,0.62)",

    fontSize: 11,
    lineHeight: 17,
  },

  legalAccent: {
    color: "#D2B477",

    fontWeight: "600",
  },

  /*
   * =========================
   * ERROR
   * =========================
   */

  error: {
    width: "100%",

    paddingHorizontal: 8,

    color: "#D99A82",

    fontSize: 12,
    lineHeight: 18,

    textAlign: "center",

    marginTop: 17,
  },

  errorLoginButton: {
    marginTop: 10,

    paddingVertical: 6,
  },

  errorLoginButtonText: {
    color: "#B29259",

    fontSize: 12,
    fontWeight: "600",

    textAlign: "center",

    textDecorationLine: "underline",
  },

  /*
   * =========================
   * GOLD GLOW
   * =========================
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
