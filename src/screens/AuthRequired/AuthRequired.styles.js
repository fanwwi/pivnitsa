import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0A07",
    paddingHorizontal: 22,
    paddingBottom: 20,
  },

  backButton: {
    position: "absolute",
    top: 54,
    left: 20,
    zIndex: 10,

    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 14,

    backgroundColor: "#17130E",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.14)",
  },

  pressed: {
    opacity: 0.6,
  },

  content: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 24,
  },

  iconWrapper: {
    width: 76,
    height: 76,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 24,

    backgroundColor: "rgba(178,146,89,0.09)",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",

    marginBottom: 24,
  },

  eyebrow: {
    color: "#B29259",

    fontSize: 10,
    fontWeight: "800",

    letterSpacing: 2.5,

    marginBottom: 8,
  },

  title: {
    color: "#EAE3C0",

    fontSize: 28,
    fontWeight: "700",

    textAlign: "center",

    marginBottom: 14,
  },

  description: {
    maxWidth: 340,

    color: "rgba(234,227,192,0.48)",

    fontSize: 14,
    lineHeight: 21,

    textAlign: "center",

    marginBottom: 28,
  },

  loginButton: {
    width: "100%",
    maxWidth: 340,

    height: 52,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    backgroundColor: "#B29259",

    marginBottom: 12,
  },

  loginButtonText: {
    color: "#211A10",

    fontSize: 12,
    fontWeight: "900",

    letterSpacing: 1.2,
  },

  homeButton: {
    width: "100%",
    maxWidth: 340,

    height: 50,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    backgroundColor: "#17130E",

    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  homeButtonText: {
    color: "#B29259",

    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 1,
  },

  buttonPressed: {
    opacity: 0.65,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 34,
  },

  footerBrand: {
    color: "rgba(178,146,89,0.45)",

    fontSize: 9,
    fontWeight: "900",

    letterSpacing: 3,
  },
});
