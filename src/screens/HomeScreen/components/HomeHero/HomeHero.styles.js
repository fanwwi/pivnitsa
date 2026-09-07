import { StyleSheet } from "react-native";

export default StyleSheet.create({
  hero: {
    alignItems: "center",

    marginTop: 10,
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
});
