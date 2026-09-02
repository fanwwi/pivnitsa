import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  modal: {
    maxHeight: "90%",
    minHeight: "65%",
    backgroundColor: "#0C0A07",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.20)",
  },

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178,146,89,0.10)",
  },

  eyebrow: {
    marginBottom: 4,
    color: "#B29259",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#EAE3C0",
    fontSize: 21,
    fontWeight: "700",
  },

  closeButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  pressed: {
    opacity: 0.6,
  },

  /*
  |--------------------------------------------------------------------------
  | CONTENT
  |--------------------------------------------------------------------------
  */

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    marginLeft: 2,
    color: "rgba(178,146,89,0.85)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  input: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.17)",
    color: "#EAE3C0",
    fontSize: 15,
    fontWeight: "500",
  },

  /*
  |--------------------------------------------------------------------------
  | PHONE
  |--------------------------------------------------------------------------
  */

  readOnlyInput: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#12100C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.10)",
  },

  phoneText: {
    flex: 1,
    marginLeft: 10,
    color: "rgba(234,227,192,0.65)",
    fontSize: 14,
    fontWeight: "500",
  },

  readOnly: {
    color: "rgba(234,227,192,0.25)",
    fontSize: 9,
    fontWeight: "600",
  },

  hint: {
    marginTop: 7,
    marginLeft: 2,
    color: "rgba(234,227,192,0.30)",
    fontSize: 10,
    lineHeight: 15,
  },

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  errorBox: {
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: "rgba(184,107,93,0.10)",
    borderWidth: 1,
    borderColor: "rgba(184,107,93,0.20)",
  },

  errorText: {
    color: "#C98577",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  saveButton: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    backgroundColor: "#B29259",
  },

  saveButtonPressed: {
    opacity: 0.75,
  },

  saveButtonDisabled: {
    opacity: 0.55,
  },

  saveText: {
    color: "#211A10",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  bottomSpace: {
    height: 20,
  },
});
