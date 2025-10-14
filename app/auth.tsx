import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import {
    Text,
    TextInput,
    Button,
    useTheme,
    SegmentedButtons,
} from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<Boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const theme = useTheme();
    const { signIn, signUp } = useAuth();

    const router = useRouter();

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    };

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if (password.length < 6) {
            setError("Passwords must be at least 6 characters long");
            return;
        }
        setError(null);

        if (isSignUp) {
            const error = await signUp(email, password, name, value);
            if (error) {
                setError(error);
                return;
            }
        } else {
            const error = await signIn(email, password);
            if (error) {
                setError(error);
                return;
            }
            //router.replace("/(barbers)")
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium">
                    {" "}
                    {isSignUp ? "Sign Up" : "Welcome Back"}
                </Text>
                <TextInput
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setEmail}
                />
                <TextInput
                    label="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setPassword}
                />
                {isSignUp ? (
                    <TextInput
                        label="Name"
                        autoCapitalize="none"
                        mode="outlined"
                        style={styles.input}
                        onChangeText={setName}
                    />
                ) : (
                    ""
                )}
                {isSignUp ? (
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                            {
                                value: "b",
                                label: "Barber",
                            },
                            {
                                value: "s",
                                label: "Student",
                            }
                        ]}
                    />) : null
                }
                <Text style={{ color: theme.colors.error }}>{error}</Text>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleAuth}
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                    mode="text"
                    onPress={handleSwitchMode}
                    style={styles.handleSwitchButton}
                >
                    {isSignUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    handleSwitchButton: {
        marginTop: 16,
    },
});
