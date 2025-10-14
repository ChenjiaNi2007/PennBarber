import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";
import { useAuth } from "@/lib/auth-context";


export default function Index() {
  const {user, signOut} = useAuth();

  return (
    <View
      style={styles.view}
    >
      <Text>Hey {user!.name}! This is for Barbers</Text>
      <Button onPress={signOut}>Sign Out</Button>
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