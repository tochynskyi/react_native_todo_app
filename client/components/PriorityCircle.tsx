import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";

interface PriorityCircleProps {
  priority: number;
}
const PriorityCircle: FC<PriorityCircleProps> = ({ priority }) => {
  return (
    <View
      style={[
        priority === 1 && { borderColor: Colors.red },
        priority === 2 && { borderColor: Colors.yellow },
        priority === 3 && { borderColor: Colors.green },
        priority === 4 && { borderColor: Colors.blue },
        styles.priorityCircle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  priorityCircle: {
    overflow: "hidden",
    width: 15,
    height: 15,
    borderWidth: 3,
    borderRadius: 5.5,
  },
});

export default PriorityCircle;
