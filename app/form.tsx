import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Christmas icon used in the first try before updating with the Figma ones

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
      {/* Title with Christmas font */}
      <Text style={[styles.title, { fontFamily: 'Mountains-of-Christmas' }]}>Contact Us</Text>

      {/* Name input */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Message input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.buttonRed} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Message</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e60000',  // Red color to fit the Christmas theme
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc', // Light grey border for input fields
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',  // Align the text at the top of the TextInput
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
});
