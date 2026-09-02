import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090806",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },

  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#09080655",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 58,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#090806",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingLogo: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingLogoImage: {
    width: 170,
    height: 70,
  },

  loadingIndicator: {
    marginTop: 22,
  },

  bottomSpace: {
    height: 30,
  },
});
