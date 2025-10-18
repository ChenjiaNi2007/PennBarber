import { Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function Profile(props: any) {
    const profile = props.profile

    return (
        props.isEdit ? <>
            <TextInput
                label="Barber Name"
                defaultValue={profile.barberName}
                multiline={true}
                mode="outlined"
                onChangeText={() => {}}
            />
            <TextInput
                label="Profile"
                defaultValue={profile.profileText}
                multiline={true}
                mode="outlined"
                onChangeText={() => {}}
            />
            <TextInput
                label="Price"
                defaultValue={profile.price}
                multiline={true}
                mode="outlined"
                onChangeText={() => {}}
            />
        </> : <>
            <Text>This is my name: {profile.barberName}</Text>
            <Text>{profile.profileText}</Text>
            <Text>Price per cut: {profile.price}</Text>
        </>
    );
}