// app/_layout.tsx

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';

const firebaseConfig = {
  apiKey: "AIzaSyBpzM9ZdYAdXcaJyPZjeGAna_zBe0rkRXs",
  authDomain: "mobiledev1-de8e0.firebaseapp.com",
  projectId: "mobiledev1-de8e0",
  storageBucket: "mobiledev1-de8e0.appspot.com",
  messagingSenderId: "1067636635382",
  appId: "1:1067636635382:web:c9ee0ce5ce7bf65da99ed7"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ title: 'Welcome', headerShown: false }} />
      
      {/* Hide header for login and signup screens */}
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Other non-tab screens */}
      <Stack.Screen name="form" options={{ title: 'Contact Us' }} />
      
      {/* Not found screen */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
