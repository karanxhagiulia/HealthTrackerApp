import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

export default function MailScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={[styles.header, { fontFamily: 'Mountains-of-Christmas' }]}>Your Mail</Text>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Image source={require('../../assets/icons/gift.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Image source={require('../../assets/icons/gingerbread.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Image source={require('../../assets/icons/stocking.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Received</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Image source={require('../../assets/icons/ornament.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Sent</Text>
        </TouchableOpacity>
      </View>

      {/* Mail Preview */}
      <ScrollView contentContainerStyle={styles.mailContainer}>
        <View style={styles.mailItem}>
          <View style={styles.mailHeader}>
            <Text style={styles.mailSender}>From: Ruben</Text>
            <Text style={styles.mailDate}>Received: 24 November 2024</Text>
          </View>
          <Image
            source={require('../../assets/Cards/card1.png')} 
            style={styles.mailImage}
          />
        </View>
        <View style={styles.mailItem}>
          <View style={styles.mailHeader}>
            <Text style={styles.mailSender}>From: Santa</Text>
            <Text style={styles.mailDate}>Received: 11 November 2024</Text>
          </View>
          <Image
            source={require('../../assets/Cards/card6.png')} 
            style={styles.mailImage}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e60000',  // Christmas red color for the title
    textAlign: 'center',
    marginBottom: 40,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryButton: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  mailContainer: {
    alignItems: 'center',
  },
  mailItem: {
    width: '90%',
    backgroundColor: '#e6f7f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  mailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mailSender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mailDate: {
    fontSize: 14,
    color: '#333',
  },
  mailImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
});
