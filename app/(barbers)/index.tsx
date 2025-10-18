import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { CALENDAR_COLLECTION_ID, DATABASE_ID, tablesDB } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";


export default function Index() {
  const {user, signOut} = useAuth();

  const addEvent = async () => {
    const result = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: CALENDAR_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        barberId: user!.$id,
        available: [false, false, false]
      }
    })
  }

  return (
    <View
      style={styles.view}
    >
      <Text>Hey {user!.name}! This is for Barbers</Text>
      <Button onPress={addEvent}>Testing</Button>
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