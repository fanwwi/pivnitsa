import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
});
