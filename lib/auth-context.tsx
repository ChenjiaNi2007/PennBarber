import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account, BARBER_COLLECTION_ID, DATABASE_ID, tablesDB } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    signUp: (email: string, password: string, name: string, value: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<string | null>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)

    // on page load
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const session = await account.get()
            setUser(session)
        } catch(error) {
            setUser(null)
        }
    }

    const signUp = async (email: string, password: string, name: string, value: string) => {
        try {
            const id = value + ID.unique();
            await account.create({userId: id, email: email, password: password, name: name})
            await tablesDB.createRow({
                databaseId: DATABASE_ID!,
                tableId: BARBER_COLLECTION_ID!,
                rowId: id,
                data: {
                    barberName: "",
                    profileText: "",
                    price: ""
                }
            })
            await signIn(email, password)
            await getUser();
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return "An error occurred during Sign Up"
        }
    }
    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession({email: email, password: password})
            await getUser();
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return "An error occurred during Sign In"
        }
    }
    const signOut = async () => {
        try {
            await account.deleteSession({sessionId: 'current'});
            setUser(null);
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return "An error occurred during Sign Out"
        }

    }
    return <AuthContext.Provider value={{user, signUp, signIn, signOut}}> {children} </AuthContext.Provider>
};

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("New Auth must be inside Auth Provider")
    }
    return context;
};