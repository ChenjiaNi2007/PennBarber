import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor:"coral"}}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />) }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({color}) => (<Feather name="user" size={24} color={color} />)}} />
    </Tabs>
  );
}
