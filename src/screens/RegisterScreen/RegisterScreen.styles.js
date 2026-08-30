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
    backgroundColor: "#1d1b1ba2",
  },

  keyboard: {
    flex: 1,
  },

  /* ========================= */
  /* TOP */
  /* ========================= */

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

  /* ========================= */
  /* CONTENT */
  /* ========================= */

  content: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 28,

    paddingTop: 40,
  },

  /* ========================= */
  /* LOGO */
  /* ========================= */

  logo: {
    width: width * 0.58,
    height: width * 0.28,

    marginBottom: 35,
  },

  /* ========================= */
  /* TEXT */
  /* ========================= */

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

  /* ========================= */
  /* PHONE INPUT */
  /* ========================= */

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

  /* ========================= */
  /* PRIMARY BUTTON */
  /* ========================= */

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
    transform: [
      {
        scale: 0.97,
      },
    ],

    opacity: 0.88,
  },

  /* ========================= */
  /* OTP */
  /* ========================= */

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

  otpTitle: {
    color: "#EAE3C0",
  },

  /* ========================= */
  /* RESEND */
  /* ========================= */

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

  /* ========================= */
  /* ERROR */
  /* ========================= */

  error: {
    maxWidth: "90%",

    color: "#D99A82",

    fontSize: 12,

    textAlign: "center",

    lineHeight: 18,

    marginTop: 18,
  },

  /* ========================= */
  /* SUCCESS */
  /* ========================= */

  success: {
    alignItems: "center",
  },

  successCircle: {
    width: 78,
    height: 78,

    borderRadius: 39,

    borderWidth: 1,

    borderColor: "#B29259",

    backgroundColor: "rgba(178,146,89,0.12)",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 25,

    shadowColor: "#B29259",

    shadowOpacity: 0.6,

    shadowRadius: 25,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 10,
  },

  successCheck: {
    color: "#B29259",

    fontSize: 35,

    fontWeight: "300",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  loginButton: {
    marginTop: 22,
    paddingVertical: 8,
  },

  loginText: {
    color: "rgba(234,227,192,0.55)",
    fontSize: 13,
    textAlign: "center",
  },

  loginAccent: {
    color: "#B29259",
    fontWeight: "700",
  },

  registeredButton: {
    width: "100%",
    height: 52,

    marginTop: 10,

    borderRadius: 15,

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.5)",

    backgroundColor: "rgba(178,146,89,0.08)",

    alignItems: "center",
    justifyContent: "center",
  },

  registeredButtonText: {
    color: "#D2B477",

    fontSize: 12,
    fontWeight: "800",

    letterSpacing: 1.8,
  },

  changePhone: {
    marginTop: 20,

    color: "rgba(234,227,192,0.4)",

    fontSize: 12,

    textDecorationLine: "underline",
  },

  errorLoginButton: {
    marginTop: 10,

    paddingVertical: 8,
  },

  errorLoginButtonText: {
    color: "#D2B477",

    fontSize: 13,
    fontWeight: "700",

    textAlign: "center",
  },
});
