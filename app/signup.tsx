import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient button
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for storing username

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
  
      if (userCredential.user) {
        // Save username in AsyncStorage
        await AsyncStorage.setItem('username', username);

        // Save onboarding status in AsyncStorage
        await AsyncStorage.setItem('hasCompletedOnboarding', 'false');
  
        // Navigate to onboarding screen
        router.replace('/onboarding');
      }
    } catch (err) {
      setError(err?.message || 'An error occurred');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hey there,</Text>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
        value={username}
      />
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

      <View style={styles.checkboxContainer}>
        <Text style={styles.termsText}>
          By continuing you accept our{' '}
          <Text style={styles.linkText}>Privacy Policy</Text> and{' '}
          <Text style={styles.linkText}>Term of Use</Text>
        </Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#6A11CB', '#2575FC']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.linkText} onPress={() => router.push('/login')}>
          Login
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
  checkboxContainer: {
    width: '100%',
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  linkText: {
    color: '#2575FC',
    fontWeight: 'bold',
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
});
