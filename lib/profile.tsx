import { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { BARBER_COLLECTION_ID, DATABASE_ID, tablesDB } from "./appwrite";
import { useAuth } from "./auth-context";

export default function Profile(props: any) {
    const profile = props.profile
    const {user} = useAuth();
     
    const [barberName, setBarberName] = useState<string>(profile.barberName)
    const [profileText, setProfileText] = useState<string>(profile.profileText)
    const [price, setPrice] = useState<string>(profile.price)

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // 👈 skip first run
        }
        async function updateProfile() {
            if(!props.isEdit) {
                console.log("Initialized")
                try {
                    props.setLoading(true)
                    const result = await tablesDB.updateRow({
                        databaseId: DATABASE_ID!,
                        tableId: BARBER_COLLECTION_ID!,
                        rowId: user!.$id,
                        data: {
                            barberName: barberName,
                            profileText: profileText,
                            price: price
                        }
                    })
                    console.log(result)
                } catch (error) {
                    console.log("there was an error")
                } finally {
                    props.fetchProfile()
                }
            }
        }
        updateProfile();
    }, [props.isEdit])

    return (
        props.isEdit ? <>
            <View style={styles.container}>
                <TextInput
                    label="Barber Name"
                    value={barberName}
                    multiline
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setBarberName}
                />
                <TextInput
                    label="Profile"
                    value={profileText}
                    multiline
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setProfileText}
                />
                <TextInput
                    label="Price"
                    value={price}
                    multiline
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setPrice}
                />
            </View>
        </> : <View style={styles.container2}>
            <Text style={styles.nameText}>This is my name: {profile.barberName}</Text>
            <Text style={styles.profileText}>{profile.profileText}</Text>
            <Text style={styles.priceText}>Price per cut: {profile.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    input: {
        marginBottom: 16,
        backgroundColor: "white",
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 4,
        fontWeight: "500",
    },
    container2: {
        margin: 16,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 6,
    },
    profileText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
        lineHeight: 22,
    },
    priceText: {
        fontSize: 16,
        color: "#1e88e5",
        fontWeight: "600",
        marginTop: 6,
    }
});
