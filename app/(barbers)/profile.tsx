import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <Profile
                    profile={profile}
                    isEdit={isEdit}
                    fetchProfile={fetchProfile}
                    setLoading={setLoading}
                    isLoading={loading}
                />
            )}
            <TouchableOpacity
                style={[styles.button, isEdit && styles.buttonEditing]}
                onPress={() => setIsEdit((prev) => !prev)}
            >
                <Text style={styles.buttonText}>
                    {isEdit ? "Finished Editing" : "Edit"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#222",
        textAlign: "center",
    },
    button: {
        alignSelf: "center",
        marginTop: 24,
        backgroundColor: "#1e88e5",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        minWidth: 160,
    },
    buttonEditing: {
        backgroundColor: "#43a047", // green tone for “Finished Editing”
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});