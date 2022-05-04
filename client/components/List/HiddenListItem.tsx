import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/colors";

const HiddenListItem = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Swipe left for DELETE</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: Colors.red,
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
  },
});
export default HiddenListItem;
