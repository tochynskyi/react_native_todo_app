import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/colors";
import PriorityCircle from "../PriorityCircle";

const RowOptions = (title, number) => {
  return (
    <View style={styles.modalRow}>
      <PriorityCircle priority={number + 1} />
      <Text style={styles.optionTxt}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  optionTxt: {
    fontSize: 22,
    fontWeight: "400",
    color: Colors.black,
    marginLeft: 20,
  },
});

export default RowOptions;
