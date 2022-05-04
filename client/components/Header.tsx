import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../http/userAPI";
import { userLogout } from "../store/userSlice";
import ModalDropdown from "react-native-modal-dropdown";
import { sortByDate, sortByPriority } from "../store/todoSlice";
import dayjs from "dayjs";
import { Colors } from "../styles/colors";

const sortOptions = ["Date", "Priority"];

export const Header = () => {
  const [sort, setSort] = useState<string>("");
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    logout();
    dispatch(userLogout());
  };

  useEffect(() => {
    if (sort === "Priority") {
      dispatch(sortByPriority());
      return;
    }
    if (sort === "Date") {
      dispatch(sortByDate());
      return;
    }
  }, [sort]);
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Today {dayjs().format("DD MMM")}</Text>
      </View>
      <ModalDropdown
        defaultValue="Sort by"
        renderButtonText={() => "Sort by"}
        textStyle={styles.dropdownTitle}
        options={sortOptions}
        onSelect={(idx, value) => setSort(value)}
        style={styles.sortModal}
        dropdownStyle={styles.dropdownList}
        dropdownTextStyle={styles.dropdownListTxt}
        dropdownTextHighlightStyle={styles.dropdownListSelectTxt}
      />
      <Pressable onPress={onLogout}>
        <Text style={styles.exitTxt}>Exit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 15,
    paddingBottom: 10,
    width: "100%",
    backgroundColor: Colors.primaryBg,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
  },
  sortModal: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.white,
    marginRight: 15,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
  },
  dropdownTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
  dropdownList: {
    flex: 1,
    width: "20%",
    height: "auto",
    marginTop: 5,
  },
  dropdownListTxt: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.black,
  },
  dropdownListSelectTxt: {
    backgroundColor: Colors.primaryBg,
    color: Colors.white,
  },
  exitTxt: {
    color: Colors.white,
    fontWeight: "500",
  },
});
