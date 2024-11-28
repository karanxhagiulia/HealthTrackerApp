import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      if (userCredential.user) {
        // Get username from the user object (if available)
        const username = userCredential.user.displayName || 'Default User'; // If there's no displayName, fallback to a default value
        
        // Store the username in AsyncStorage
        await AsyncStorage.setItem('username', username);

        // Navigate to the home screen
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      setError(err?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Back,</Text>
      <Text style={styles.title}>Log in to your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
        <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.linkText} onPress={() => router.push('/signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#777',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  buttonGradient: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    marginTop: 16,
  },
  linkText: {
    color: '#2575FC',
    fontWeight: 'bold',
  },
});
