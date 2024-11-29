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

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index", // Set onboarding as the initial route
};

export default function RootLayout() {
  return (
    <Stack>
      {/* Initial Index Screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Tab navigation layout */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />

      {/* Other screens */}
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="form" options={{ title: 'Contact Us' }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="update/cholesterol" options={{ title: 'Your Cholesterol Data' }} />
      <Stack.Screen name="add-cholesterol-data" options={{ title: 'Add Data' }} />
      <Stack.Screen name="CholesterolChart"options={{ headerShown: false }} />
 
 
 
      {/* Fallback for undefined screens */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
