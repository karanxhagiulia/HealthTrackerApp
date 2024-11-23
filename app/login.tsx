import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Import Firebase authentication
import { useState } from 'react';
import { router } from 'expo-router';  // For navigation
import Ionicons from 'react-native-vector-icons/Ionicons';  // Christmas icon

export default function LogIn() {
  const [email, setEmail] = useState<string>(''); // Email state
  const [password, setPassword] = useState<string>(''); // Password state
  const [error, setError] = useState<string>(''); // Error message state

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          console.log("User logged in successfully:", userCredential.user);
          router.replace('/(tabs)/create');
        }
      })
      .catch((err) => {
        setError(err.message || 'An error occurred');  // Handle login errors
      });
  };

  // Custom Back function to go to the index page
  const handleBackToIndex = () => {
    router.replace('/');  // Replace with the index page
  };

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToIndex}>
        <Ionicons name="arrow-back" size={24} color="#e60000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Christmas Icon */}
      <Ionicons name="gift" size={100} color="#e60000" style={styles.icon} />

      {/* Title with Christmas font */}
      <Text style={[styles.title, { fontFamily: 'Mountains-of-Christmas' }]}>
        Welcome Back! 🎅
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Log in to create your Christmas cards!
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {/* Display error message if any */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Log In Button with Christmas style */}
      <TouchableOpacity style={styles.buttonRed} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Link to Sign Up Option */}
      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',  // White background for a clean, light feel
  },
  backButton: {
    position: 'absolute',
    top: 40,  // Adjust for status bar height if needed
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#e60000',
    marginLeft: 8,
  },
  icon: {
    marginBottom: 40,  // Add spacing below the icon
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e60000',  // Christmas red for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',  // Dark grey for the subtitle
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRed: {
    backgroundColor: '#e60000',  // Red background for the button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',  // Make the button wide
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // White text inside the button
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#e60000',  // Red text for the link
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    fontSize: 14,
  },
});
