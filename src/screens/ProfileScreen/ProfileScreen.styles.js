import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0A07",
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingTop: 58,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  pressed: {
    opacity: 0.65,
  },

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerEyebrow: {
    marginBottom: 4,
    color: "#B29259",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.2,
  },

  headerTitle: {
    color: "#EAE3C0",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.4,
  },

  settingsButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#17130E",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.18)",
  },

  /*
  |--------------------------------------------------------------------------
  | PROFILE CARD
  |--------------------------------------------------------------------------
  */

  profileCard: {
    minHeight: 122,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 17,
    marginBottom: 18,
    borderRadius: 22,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.20)",
  },

  avatarWrapper: {
    position: "relative",
    width: 68,
    height: 68,
    marginRight: 14,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#B29259",
  },

  avatarEdit: {
    position: "absolute",
    right: -2,
    bottom: -2,

    width: 25,
    height: 25,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 9,

    backgroundColor: "#B29259",
    borderWidth: 2,
    borderColor: "#15110C",
  },

  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },

  profileName: {
    marginBottom: 5,
    color: "#EAE3C0",
    fontSize: 17,
    fontWeight: "700",
  },

  profilePhone: {
    marginBottom: 9,
    color: "rgba(234,227,192,0.50)",
    fontSize: 11,
    fontWeight: "500",
  },

  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  editProfileText: {
    marginLeft: 5,
    color: "#B29259",
    fontSize: 10,
    fontWeight: "700",
  },

  profileArrow: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  stats: {
    height: 86,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.14)",
  },

  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statNumber: {
    marginBottom: 5,
    color: "#EAE3C0",
    fontSize: 22,
    fontWeight: "700",
  },

  statLabel: {
    color: "rgba(234,227,192,0.40)",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(178,146,89,0.12)",
  },

  /*
  |--------------------------------------------------------------------------
  | SECTION
  |--------------------------------------------------------------------------
  */

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    marginBottom: 11,
    marginLeft: 4,
    color: "rgba(178,146,89,0.82)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  /*
  |--------------------------------------------------------------------------
  | MENU
  |--------------------------------------------------------------------------
  */

  menu: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#15110C",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.16)",
  },

  menuItem: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  menuItemPressed: {
    backgroundColor: "rgba(178,146,89,0.06)",
  },

  menuIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    borderRadius: 14,
    backgroundColor: "#1D1811",
    borderWidth: 1,
    borderColor: "rgba(178,146,89,0.13)",
  },

  menuContent: {
    flex: 1,
    justifyContent: "center",
  },

  menuTitle: {
    marginBottom: 4,
    color: "#EAE3C0",
    fontSize: 14,
    fontWeight: "700",
  },

  menuDescription: {
    color: "rgba(234,227,192,0.40)",
    fontSize: 10,
    fontWeight: "500",
  },

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  logoutButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#15100D",
    borderWidth: 1,
    borderColor: "rgba(184,107,93,0.18)",
  },

  logoutPressed: {
    backgroundColor: "rgba(184,107,93,0.08)",
  },

  logoutIcon: {
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  logoutText: {
    color: "#B86B5D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | FOOTER
  |--------------------------------------------------------------------------
  */

  footer: {
    alignItems: "center",
    marginTop: 28,
  },

  footerBrand: {
    marginBottom: 5,
    color: "rgba(178,146,89,0.55)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.2,
  },

  footerVersion: {
    color: "rgba(234,227,192,0.22)",
    fontSize: 9,
    fontWeight: "500",
  },

  bottomSpace: {
    height: 20,
  },
});
