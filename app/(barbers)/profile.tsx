import { Text, View } from "react-native";
import { Link } from "expo-router";
import Profile from "@/lib/profile";
import { useAuth } from "@/lib/auth-context";
import { BARBER_COLLECTION_ID, CALENDAR_COLLECTION_ID, DATABASE_ID, tablesDB } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";


export default function LoginScreen(){
    const {user} = useAuth();

    const [isEdit, setIsEdit] = useState<Boolean>(false)
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

    useEffect(() => {
        fetchProfile()
        console.log("Started")
    },[]);

    return (
        <View>
            <Text>Profile</Text>
            {loading ? (<Text>Loading...</Text>) : (<Profile profile={profile} isEdit={isEdit} fetchProfile={fetchProfile} setLoading={setLoading} isLoading={loading}></Profile>)}
            <Button onPress={() => {setIsEdit((prev) => !prev)}}>{isEdit ? "Finished Editing" : "Edit"}</Button>
        </View>
    );
}