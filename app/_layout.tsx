import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {

  return (
    <AuthProvider>
      <AuthedStack />
    </AuthProvider>
  );
}

function AuthedStack() {
  const {user} = useAuth();
  return (
    <Stack>
        <Stack.Protected guard={!!user && user.$id[0] === "b"}>
          <Stack.Screen name="(barbers)" options={{ headerShown: false }} />
        </Stack.Protected>
        
        <Stack.Protected guard={!!user && user.$id[0] === "s"}>
          <Stack.Screen name="(students)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!user}>
          <Stack.Screen name="auth" options={{ title: "Authentication" }} />
        </Stack.Protected>
      </Stack>
  );
}