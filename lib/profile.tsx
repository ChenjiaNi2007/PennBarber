import { useEffect, useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import { BARBER_COLLECTION_ID, DATABASE_ID, tablesDB } from "./appwrite";
import { useAuth } from "./auth-context";

export default function Profile(props: any) {
    const profile = props.profile
    const {user} = useAuth();
     
    const [barberName, setBarberName] = useState<string>(profile.barberName)
    const [profileText, setProfileText] = useState<string>(profile.profileText)
    const [price, setPrice] = useState<string>(profile.price)

    useEffect(() => {
        async function updateProfile() {
            try {    
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
            }
        }
        updateProfile();
    }, [props.isEdit])

    return (
        props.isEdit ? <>
            <TextInput
                label="Barber Name"
                value={barberName}
                multiline={true}
                mode="outlined"
                onChangeText={setBarberName}
            />
            <TextInput
                label="Profile"
                value={profileText}
                multiline={true}
                mode="outlined"
                onChangeText={setProfileText}
            />
            <TextInput
                label="Price"
                value={price}
                multiline={true}
                mode="outlined"
                onChangeText={setPrice}
            />
        </> : <>
            <Text>This is my name: {profile.barberName}</Text>
            <Text>{profile.profileText}</Text>
            <Text>Price per cut: {profile.price}</Text>
        </>
    );
}