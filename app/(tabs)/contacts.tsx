import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Christmas-themed icons
import { router } from 'expo-router';  // For navigation

export default function ContactsScreen() {
  // Sample contacts data
  const contacts = [
    { id: 1, name: 'Merry', lastName: 'Xmas', lastSeen: '2 hours ago' },
    { id: 2, name: 'Festive', lastName: 'Raindeer', lastSeen: '1 day ago' },
    { id: 3, name: 'Santa', lastName: 'Claus', lastSeen: 'Just now' },
    { id: 4, name: 'Elf', lastName: 'Helper', lastSeen: '20 days ago' },
];

  return (
    <View style={styles.container}>
      {/* Contacts Header */}
      <Text style={[styles.header, { fontFamily: 'Mountains-of-Christmas' }]}>Contacts</Text>

      {/* Contact List */}
      <ScrollView style={styles.contactList}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactItem}>
            <Ionicons name="person-circle" size={50} color="#e60000" style={styles.contactIcon} />
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{contact.name} {contact.lastName}</Text>
              <Text style={styles.lastSeen}>Last seen: {contact.lastSeen}</Text>
            </View>
            <TouchableOpacity style={styles.messageButton} onPress={() => console.log('Message clicked')}>
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Contact Icon */}
      <TouchableOpacity style={styles.addContactButton} onPress={() => console.log('Add contact clicked')}>
        <Ionicons name="add-circle" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
    padding: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e60000',  // Christmas red color for the title
    textAlign: 'center',
    marginBottom: 40,
  },
  contactList: {
    flex: 1,
    width: '100%',
  },
  contactItem: { //each contact item css class
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',  // Light background for each contact
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  contactIcon: {
    marginRight: 20,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lastSeen: {
    fontSize: 14,
    color: '#777',
  },
  messageButton: {
    backgroundColor: '#e60000',  // Red button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addContactButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#e60000',  // Red background
    padding: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',  // White border around the icon
    justifyContent: 'center',
    alignItems: 'center',
  },
});
