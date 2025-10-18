import { Text } from "react-native";

export default function Profile(props: any) {
    const profile = props.profile

    return (
        <>
            <Text>This is my name: {profile.barberName}</Text>
            <Text>{profile.profileText}</Text>
            <Text>Price per cut: {profile.price}</Text>
        </>
    );
}