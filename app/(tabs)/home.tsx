import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import CholesterolChart from '../Cholesterol/CholesterolChart';  // Importing CholesterolChart component
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); // Ignore all log notifications

const HomeScreen = () => {
  const [username, setUsername] = useState('');  // State to hold username

  // Fetch username from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);  // Set username from AsyncStorage
        } else {
          Alert.alert('Error', 'Username not found!');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        Alert.alert('Error', 'Unable to fetch username.');
      }
    };

    fetchUsername();  // Call the function to fetch username
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Welcome back,</Text>
      {/* Display username or fallback to 'Loading...' */}
      <Text style={styles.usernameText}>{username || 'Loading...'}</Text>
      <Text style={styles.welcomeText}>Your Latest Data</Text>

      {/* Banner Section */}


      {/* Cholesterol Chart Section */}
      <CholesterolChart />  {/* Display the CholesterolChart component */}

      {/* Heart Rate Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Heart Rate Data</Text>
        <Image
          source={require('../../assets/images/heartratechart.png')}  // Path to the image
          style={styles.chartImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,  // Reduced padding for less space around the edges
    backgroundColor: '#f8f9fa',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,  // Reduced space below welcome text
  },
  usernameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#92A3FD',  // Using a color that stands out for the username
    marginBottom: 10,  // Slightly reduced vertical margin
  },
  banner: {
    width: '100%',
    height: 50,  // Reduced banner height
    marginBottom: 10,  // Reduced space after the banner
  },
  chartContainer: {
    marginTop: 10,  // Reduced space between the cholesterol chart and the heart rate chart
    alignItems: 'center',  // Centering the chart image
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,  // Reduced space between title and image
  },
  chartImage: {
    width: '100%',  // Make the image fill the width of the screen
    height: 200,  // Reduced height for the heart rate chart image
    resizeMode: 'contain',  // Ensure the image is scaled properly
  },
});

export default HomeScreen;
