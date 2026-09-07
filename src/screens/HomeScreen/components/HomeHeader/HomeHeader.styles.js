import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-20",
    marginBottom: 30
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",

    maxWidth: "78%",
  },

  avatarWrapper: {
    position: "relative",

    width: 48,
    height: 48,

    borderRadius: 24,

    borderWidth: 1,
    borderColor: "rgba(210,180,119,0.5)",

    padding: 2,

    backgroundColor: "rgba(255,255,255,0.04)",
  },

  avatar: {
    width: "100%",
    height: "100%",

    borderRadius: 22,
  },

  onlineDot: {
    position: "absolute",

    right: 0,
    bottom: 1,

    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#B29259",

    borderWidth: 2,
    borderColor: "#0D0B08",
  },

  userInfo: {
    marginLeft: 12,
  },

  welcome: {
    color: "rgba(234,227,192,0.42)",

    fontSize: 8,
    fontWeight: "800",

    letterSpacing: 1.7,

    marginBottom: 4,
  },

  userName: {
    color: "#EAE3C0",

    fontSize: 16,
    fontWeight: "700",

    letterSpacing: 0.1,

    maxWidth: width * 0.55,
  },

  notificationButton: {
    width: 46,
    height: 46,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.045)",

    borderWidth: 1,
    borderColor: "rgba(234,227,192,0.1)",
  },

  notificationDot: {
    position: "absolute",

    top: 11,
    right: 11,

    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: "#B29259",

    borderWidth: 1,
    borderColor: "#17130D",
  },

  pressed: {
    opacity: 0.78,
  },

  notificationPressed: {
    transform: [
      {
        scale: 0.94,
      },
    ],
  },
});
