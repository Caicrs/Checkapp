import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../assets/styles/colors";

const LoadingComponent = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator color={colors.black} size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primaryColor
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingComponent;