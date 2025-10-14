import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button>Hi</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton:{
    backgroundColor: "coral"
  }
})