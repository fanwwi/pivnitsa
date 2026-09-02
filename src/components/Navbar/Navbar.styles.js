import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",

    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,

    marginBottom: 10,
  },

  navbar: {
    height: 68,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  item: {
    flex: 1,
    height: "100%",

    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  itemPressed: {
    opacity: 0.65,
  },

  iconWrapper: {
    borderRadius: 12,
    width: 38,
    height: 32,

    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapperActive: {
    backgroundColor: "#B29259",
  },
});
