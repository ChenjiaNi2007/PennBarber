import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { BARBER_COLLECTION_ID, client, DATABASE_ID, tablesDB } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import Profile from "@/lib/profile";

export default function LoginScreen(){

    const [profiles, setProfiles] = useState<any>();
    const [loading, setLoading] = useState<Boolean>(true)
    
    const barberChannel = `databases.${DATABASE_ID}.collections.${BARBER_COLLECTION_ID}.documents`
    client.subscribe(barberChannel, () => {getProfiles()})
    
    const getProfiles = async () => {
        try {
            const result = await tablesDB.listRows({
                databaseId: DATABASE_ID!,
                tableId: BARBER_COLLECTION_ID!
            });
            console.log(result.rows)
            setProfiles(result.rows);
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {getProfiles()},[]);

    if(loading) {
        return <Text>Loading...</Text>
    }

    return (
        <ScrollView>
            <>    
                {profiles.map((profile: any) => {
                    return <Profile profile={profile}></Profile>
                })}
            </>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
});