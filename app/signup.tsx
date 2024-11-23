import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { router } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          console.log("User signed up successfully:", userCredential.user);
          router.replace('/(tabs)/create');
        }
      })
      .catch((err) => {
        setError(err?.message || 'An error occurred');
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

      <Text style={[styles.title, { fontFamily: 'Mountains-of-Christmas' }]}>
        Sign Up for Christmas Fun!
      </Text>

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {/* Display error message if present */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Sign Up Button with Christmas style */}
      <TouchableOpacity style={styles.buttonRed} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Link to Log In Option */}
      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
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
    backgroundColor: '#fff',
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
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e60000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e60000',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    fontSize: 14,
  },
  buttonRed: {
    backgroundColor: '#e60000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#e60000',
    textDecorationLine: 'underline',
  },
});
