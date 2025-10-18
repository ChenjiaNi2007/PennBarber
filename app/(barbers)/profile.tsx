import { Text, View } from "react-native";
import { Link } from "expo-router";
import Profile from "@/lib/profile";
import { useAuth } from "@/lib/auth-context";
import { BARBER_COLLECTION_ID, CALENDAR_COLLECTION_ID, DATABASE_ID, tablesDB } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";


export default function LoginScreen(){
    const {user} = useAuth();

    const [profile, setProfile] = useState<any>()
    const [loading, setLoading] = useState<Boolean>(true)
    
    const getProfile = async () => {
        const result = await tablesDB.getRow({
            databaseId: DATABASE_ID!,
            tableId: BARBER_COLLECTION_ID!,
            rowId: user!.$id,
        });
        return result;
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data)
            } catch (error) {
                console.log("An error has occurred")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    },[]);

    if (loading) return <Text>Loading...</Text>;
    if (!profile) return <Text>No profile found.</Text>;

    return (
        <View>
            <Text>Hello this is the Login Page</Text>
            <Profile profile={profile}></Profile>
            <Button>Edit</Button>
        </View>
    );
}