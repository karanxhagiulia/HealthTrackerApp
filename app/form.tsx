import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient button

export default function ContactUsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    Alert.alert('Success', 'Your message has been sent!');

    // Clear form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Have a problem? Or a suggestion?</Text>
      <Text style={styles.title}>Contact Us!</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <View style={styles.checkboxContainer}>
        <Text style={styles.termsText}>
          By submitting, you accept our{' '}
          <Text style={styles.linkText}>Privacy Policy</Text> and{' '}
          <Text style={styles.linkText}>Terms of Use</Text>
        </Text>
      </View>

      {/* Submit button with gradient background */}
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#6A11CB', '#2575FC']} // Gradient color
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Send Message</Text>
        </LinearGradient>
      </TouchableOpacity>


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
  textArea: {
    height: 120,
    textAlignVertical: 'top', // Align text at the top of the input
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
