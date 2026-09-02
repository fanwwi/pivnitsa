import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0A07",
    paddingTop: 20,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  pressed: {
    opacity: 0.65,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerEyebrow: {
    marginBottom: 4,
    color: "#B29259",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.2,
  },

  headerTitle: {
    color: "#EAE3C0",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  headerIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  /* =========================
     INTRO
  ========================= */

  intro: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  introIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderRadius: 16,
    backgroundColor: "rgba(178, 146, 89, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.18)",
  },

  introText: {
    flex: 1,
  },

  introEyebrow: {
    marginBottom: 5,
    color: "#B29259",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  introTitle: {
    marginBottom: 5,
    color: "#EAE3C0",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  introDescription: {
    color: "rgba(234, 227, 192, 0.48)",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "500",
  },

  /* =========================
     SECTIONS
  ========================= */

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    marginBottom: 11,
    marginLeft: 4,
    color: "rgba(178, 146, 89, 0.82)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  /* =========================
     DETAILS
  ========================= */

  detailsCard: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.16)",
  },

  detailRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  detailPressed: {
    backgroundColor: "rgba(178, 146, 89, 0.06)",
  },

  detailIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    borderRadius: 13,
    backgroundColor: "#1D1811",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.13)",
  },

  detailContent: {
    flex: 1,
    justifyContent: "center",
  },

  detailLabel: {
    marginBottom: 4,
    color: "rgba(234, 227, 192, 0.38)",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  detailValue: {
    color: "#EAE3C0",
    fontSize: 14,
    fontWeight: "600",
  },

  editText: {
    marginLeft: 8,
    color: "#B29259",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  divider: {
    height: 1,
    marginLeft: 68,
    backgroundColor: "rgba(178, 146, 89, 0.09)",
  },

  /* =========================
     TABLE
  ========================= */

  tableCard: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.24)",
  },

  tableCardIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderRadius: 16,
    backgroundColor: "rgba(178, 146, 89, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.20)",
  },

  tableCardInfo: {
    flex: 1,
  },

  tableNumber: {
    marginBottom: 3,
    color: "#EAE3C0",
    fontSize: 16,
    fontWeight: "700",
  },

  tableType: {
    marginBottom: 7,
    color: "#B29259",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  tableMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  tableMetaText: {
    marginRight: 7,
    color: "rgba(234, 227, 192, 0.42)",
    fontSize: 9,
    fontWeight: "600",
  },

  selectedBadge: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 14,
    backgroundColor: "#B29259",
  },

  /* =========================
     SUMMARY
  ========================= */

  summaryCard: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178, 146, 89, 0.16)",
  },

  summaryRow: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178, 146, 89, 0.08)",
  },

  summaryRowLast: {
    borderBottomWidth: 0,
  },

  summaryLabel: {
    color: "rgba(234, 227, 192, 0.42)",
    fontSize: 11,
    fontWeight: "500",
  },

  summaryValue: {
    maxWidth: "60%",
    color: "#EAE3C0",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "right",
  },

  /* =========================
     CONFIRM BUTTON
  ========================= */

  confirmButton: {
    width: "100%",
    height: 60,
    overflow: "hidden",
    marginTop: 2,
    borderRadius: 18,
    shadowColor: "#B29259",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 5,
  },

  confirmGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  confirmIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "rgba(33, 26, 16, 0.10)",
  },

  confirmText: {
    color: "#211A10",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  confirmTextDisabled: {
    color: "rgba(234, 227, 192, 0.35)",
  },

  confirmPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.88,
  },

  confirmDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },

  warningText: {
    marginTop: 10,
    color: "rgba(234, 227, 192, 0.34)",
    fontSize: 9,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  /* =========================
     BOTTOM
  ========================= */

  bottomSpacing: {
    height: 12,
  },
});
