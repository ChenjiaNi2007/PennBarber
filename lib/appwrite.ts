import { Account, Client, TablesDB } from "react-native-appwrite"

export const client = new Client().setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT!).setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID
export const CALENDAR_COLLECTION_ID = process.env.EXPO_PUBLIC_CALENDAR_COLLECTION_ID
export const BARBER_COLLECTION_ID = process.env.EXPO_PUBLIC_BARBER_COLLECTION_ID