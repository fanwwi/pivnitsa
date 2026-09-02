import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.78)",
  },

  modal: {
    width: "100%",
    maxWidth: 390,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#0C0A07",
    borderWidth: 1,
    borderColor: "rgba(184,107,93,0.20)",
  },

  iconWrapper: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 19,
    borderRadius: 16,
    backgroundColor: "rgba(184,107,93,0.08)",
  },

  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#17130E",
  },

  pressed: {
    opacity: 0.6,
  },

  eyebrow: {
    marginBottom: 6,
    color: "#B86B5D",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#EAE3C0",
    fontSize: 23,
    fontWeight: "700",
  },

  description: {
    marginTop: 10,
    color: "rgba(234,227,192,0.48)",
    fontSize: 13,
    lineHeight: 20,
  },

  confirmLabel: {
    marginTop: 22,
    marginBottom: 8,
    color: "rgba(234,227,192,0.65)",
    fontSize: 10,
    fontWeight: "700",
  },

  input: {
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(184,107,93,0.18)",
    color: "#EAE3C0",
    fontSize: 14,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  cancelText: {
    color: "#EAE3C0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  deleteButton: {
    flex: 1,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 15,
    backgroundColor: "#9C554A",
  },

  deleteButtonDisabled: {
    opacity: 0.35,
  },

  deletePressed: {
    opacity: 0.7,
  },

  deleteText: {
    color: "#EAE3C0",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
